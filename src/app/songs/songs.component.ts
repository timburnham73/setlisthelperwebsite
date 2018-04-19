import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import {FormControl} from '@angular/forms';
import {Song} from '../shared/model/song';
import {Tag} from '../shared/model/tag';
import {SongService} from '../shared/services/song.service';
import {AuthService} from '../shared/security/auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';





@Component({
  selector: 'app-songs',
  templateUrl: 'songs.component.html',
  styleUrls: ['songs.component.less']
})
export class SongsComponent implements OnInit {
  // @ViewChild('songEdit') songEdit: SongEditComponent;
  // @ViewChild('songLyric') songLyric: SongLyricComponent;
  // @ViewChild('songCatalogSelector') songCatalogSelctor:SongCatalogSelectorComponent;

  items: Observable<Song[]>;
  songs: Song[];
  searchString: string;
  term = new FormControl();
  orderByColumnName: string;
  accountId: string;
  artistId: string;
  artist: any;
  genreId: string;
  genre: any;
  tagId: string;
  tag: Tag;
  songCount: number;
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
      // `this.accountService.getAccount(this.accountId).subscribe(account => this.account = account);
      /*if (this.artistId) {
        this.artistService.getArtist(this.artistId.toLowerCase())
          .subscribe(artist => this.artist = artist);
      }*/
      /*if (this.genreId) {
        this.genreService.getGenre(this.genreId.toLowerCase())
          .subscribe(genre => this.genre = genre);
      }*/
      if (this.tagId) {

      }
      this.songService.getSongCount()
        .do(x => console.log(`Song count total ${x}`))
        .subscribe(count => {
          this.songCount = Number(count);
        });

      this.onSearch('');
    });
  }

  onSearch(termToSearch) {
    /*if (this.artistId) {
      this.artistService.getSongsForArtist(this.artistId.toLowerCase())
        .subscribe(songs => this.songs = songs);
    } else if (this.genreId) {
      this.genreService.getSongsForGenre(this.genreId.toLowerCase())
        .subscribe(songs => this.songs = songs);
    } else if (this.tagId) {
      this.tagService.getSongs(this.tagId)
        .subscribe(songs => this.songs = songs);
    } else {*/
      this.songService.findAllSongs(this.startingIndex, this.pageSize)
        .map((songs) => {
          return songs.filter(song => ((termToSearch === '')
            || (termToSearch && song.name.toLowerCase().includes(termToSearch.toLowerCase()))));
        })
        .do(songs => console.log(`Song count ${this.songs.length + songs.length}`))
        .subscribe(songs => this.songs = this.songs.concat(songs));
    // }
  }

  onScroll() {
    this.startingIndex = this.startingIndex + 50;
    this.onSearch('');
  }

  onPrint() {
    this.get('http://setlisthelperstage.com/api/Song6')
      .subscribe(function(result) {

      },
      error => {console.log(error); });
  }

  createAuthorizationHeader(headers: HttpHeaders) {
    headers.append('Authorization', 'Basic ' +
      btoa('sydneyburnham:simongibby'));
  }

  get(url) {
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.get<Song>(url, {
      headers: headers
    });
  }

  onRowClick(song) {
    // this.songLyric.open(song);
  }

  onEdit(song) {
    // this.songEdit.open(song);
  }


  addNew() {
    /*if (this.tagId) {
      this.songCatalogSelctor.open(this.tagId);
    } else {
      this.songEdit.open(new Song(null, this.accountId, '', '', '', 'A', 180, 120, false, '', ''));
    }*/
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
    this.onSearch(this.searchString);
  }

  onExport() {
    const username = 'sydneyburnham';
    const password = 'simongibby';
    // this.accountService.importSetlistHelperData(username, password, this.accountId, this.auth.id);
  }

}


