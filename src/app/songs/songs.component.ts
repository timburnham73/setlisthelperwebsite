import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import {FormControl} from '@angular/forms';
import {Song} from '../shared/model/song';
import {Tag} from '../shared/model/tag';
import {SongService} from '../shared/services/song.service';
import {AuthService} from '../shared/security/auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SongEditComponent} from '../song-edit';
import {SongLyricComponent} from '../song-lyric';





@Component({
  selector: 'app-songs',
  templateUrl: 'songs.component.html',
  styleUrls: ['songs.component.less']
})
export class SongsComponent implements OnInit {
  @ViewChild('songEdit') songEdit: SongEditComponent;
  @ViewChild('songLyric') songLyric: SongLyricComponent;
  // @ViewChild('songLyric') songLyric: SongLyricComponent;
  // @ViewChild('songCatalogSelector') songCatalogSelctor:SongCatalogSelectorComponent;

  items: Observable<Song[]>;
  songs: Song[];
  songForEdit: Song;
  searchString: string;
  term = new FormControl();
  orderByColumnName: string;
  orderByColumDirection: string;
  accountId: string;
  artistId: string;
  artist: any;
  genreId: string;
  genre: any;
  tagId: string;
  tag: Tag;
  songCount: number;
    songCountTotal: number;
  startingIndex: number;
  pageSize: number;

  public account: Account;

  // Shows songs for the tags view only
  showSongs: Boolean = false;


  constructor(private songService: SongService,
              public auth: AuthService,
              protected http: HttpClient,
              private route: ActivatedRoute

  ) {
    // Used to setup paging when retrieving songs
    this.songs = [];
    this.startingIndex = 0;
    this.pageSize = 50;
    this.searchString = '';
    this.orderByColumnName = 'name';
    this.orderByColumDirection = "asc";
    this.term.valueChanges
      .debounceTime(400)
      .subscribe(term => this.onSearch(term));
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.accountId = params['accountid'];
      this.artistId = params['artistId'];
      this.genreId = params['genreId'];
      this.tagId = params['tagId'];
      this.songCount = 0;
      if (this.tagId) {

      }
      this.songService.getSongCount()
        // .do(x => console.log(`Song count total ${x}`))
        .subscribe(count => {
          this.songCount = Number(count);
          this.songCountTotal = Number(count);
        });

      this.onSearch('');
    });
  }

  onSearch(termToSearch) {
    this.searchString = termToSearch;
    // Call new service
    if (termToSearch === '') {
      this.songService.findAllSongs(this.startingIndex, this.pageSize, this.orderByColumnName, this.orderByColumDirection)
      .map((songs) => {
        return songs;
      })
      .subscribe(songs => {
        if(this.startingIndex >= 1){
          this.songs = this.songs.concat(songs);  
        }
        else{
          this.songs = songs;
        }
        
        this.songCount = this.songCountTotal;
      });
    } else{
      this.songService.searchSongs(termToSearch,this.orderByColumnName, this.orderByColumDirection)
      .map((songs) => {
        return songs;
      })
      .subscribe(songs => {
        this.songs = songs;
        this.songCount = songs.length;
      });
    }
  }

  onScroll() {
    this.startingIndex = this.startingIndex + 50;
    this.onSearch(this.searchString);
  }

  onPrint() {
    /*this.get('http://setlisthelper.com/api/Song6')
      .subscribe(function(result) {

      },
      error => {console.log(error); });*/
  }

  onRowClick(song) {
    this.songForEdit = song;
    this.songLyric.open(song);
  }

  onEdit(song) {
    this.songForEdit = song;
    this.songEdit.open(song);
  }

  onSongEditClose(updatedSong) {
    if (this.songForEdit != null) {
      if (this.songForEdit['ArtistId'] && this.songForEdit['ArtistId'] === -1) {
        this.songForEdit.Artist = {
          Name: updatedSong.ArtistName
        };
      } else if (this.songForEdit['Artist']) {
        this.songForEdit.Artist['Name'] = updatedSong.ArtistName;
      }

      if (this.songForEdit['GenreId'] && this.songForEdit['GenreId'] === -1) {
        this.songForEdit.Genre = {
          Name: updatedSong.GenreName
        };
      } else if (this.songForEdit['Genre']) {
        this.songForEdit.Genre['Name'] = updatedSong.GenreName;
      }

      Object.keys(updatedSong).map(((songAttribute, idx) => {
          this.songForEdit[songAttribute] = updatedSong[songAttribute];
      }), this);
    } else {
      // Adding a new song
      const newSong: Song = Song.createNewSong();
      Object.keys(updatedSong).map(((songAttribute, idx) => {
        newSong[songAttribute] = updatedSong[songAttribute];
      }), this);
      this.songs.unshift(newSong);
    }
  }

  onSongLyricClose(updatedSong) {
    /*if (this.songForEdit != null) {
      if (this.songForEdit['ArtistId'] && this.songForEdit['ArtistId'] === -1) {
        this.songForEdit.Artist = {
          Name: updatedSong.ArtistName
        };
      } else if (this.songForEdit['Artist']) {
        this.songForEdit.Artist['Name'] = updatedSong.ArtistName;
      }

      if (this.songForEdit['GenreId'] && this.songForEdit['GenreId'] === -1) {
        this.songForEdit.Genre = {
          Name: updatedSong.GenreName
        };
      } else if (this.songForEdit['Genre']) {
        this.songForEdit.Genre['Name'] = updatedSong.GenreName;
      }

      Object.keys(updatedSong).map(((songAttribute, idx) => {
        this.songForEdit[songAttribute] = updatedSong[songAttribute];
      }), this);
    }*/
  }


  addNew() {
    if (this.tagId) {
      // this.songCatalogSelctor.open(this.tagId);
    } else {
      this.songForEdit = null;
      this.songEdit.open(Song.createNewSong());
    }
  }

  deleteItem(song: Song) {
    /*if (this.tagId) {
      this.tagService.removeSongFromTag(this.tagId, song.$key);
    } else {
      this.songService.removeSong(song);
    }*/
  }

  setSortOrder(columnName) {
    this.orderByColumnName = columnName;
    if(this.orderByColumDirection === 'asc'){
      this.orderByColumDirection = 'desc';
    }
    else{
      this.orderByColumDirection = 'asc';
    }
    this.onSearch(this.searchString);
  }

  onExport() {
    const username = 'sydneyburnham';
    const password = 'simongibby';
    // this.accountService.importSetlistHelperData(username, password, this.accountId, this.auth.id);
  }

}


