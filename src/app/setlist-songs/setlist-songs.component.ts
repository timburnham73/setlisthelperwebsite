import {Component, OnInit, ViewChild} from '@angular/core';


import {ActivatedRoute, Router} from '@angular/router';
import {DragulaService} from 'ng2-dragula/components/dragula.provider';
import {AuthService} from '../shared/security/auth.service';
import {SetlistService} from '../shared/services/setlist.service';
import {SongEditComponent} from '../song-edit';
import {Setlist} from '../shared/model/setlist';
import {Song} from '../shared/model/song';
import {SongLyricComponent} from '../song-lyric';
import {SetlistSong} from '../shared/model/setlist-song';
import {SongService} from '../shared/services/song.service';
import {FormControl} from '@angular/forms';



declare var _: any;
declare var $: any;

@Component({
  selector: 'app-setlist-songs',
  templateUrl: 'setlist-songs.component.html',
  styleUrls: ['setlist-songs.component.less'],
  providers: []
})
export class SetlistSongsComponent implements OnInit {
  @ViewChild('songEdit') songEdit: SongEditComponent;
  @ViewChild('songLyric') songLyric: SongLyricComponent;

  showSongs: Boolean;
  term = new FormControl();
  setlistSongs: any[]; // This is the setlist song objects with the song object as a child. Used to populate the songsInSetlist object for lyrics
  songsInSetlist: any[]; // This is the song objects only
  songCatalogSongs: Song[];
  setlist: Setlist;
  songCount = 0; // Used in the song catalog picker
  setlistSongCount = 0;
  songCountTotal: number;
  breakCount = 0;
  setlistId: number;
  private sub: any;
  private songToSearchFor;
  startingIndex: number;
  pageSize: number;
  songForEdit: any;
  orderByColumnName: string;
  orderByColumDirection: string;

  constructor(private route: ActivatedRoute,
              private auth: AuthService,
              private router: Router,
              private dragulaService: DragulaService,
              private setlistService: SetlistService,
              private songService: SongService) {
    this.auth = auth;
    this.startingIndex = 0;
    this.pageSize = 50;
    this.orderByColumnName = 'name';
    this.orderByColumDirection = 'asc';
    const bag: any = this.dragulaService.find('first-bag');
    if (bag !== undefined ) {
      this.dragulaService.destroy('first-bag');
    }
    this.dragulaService.setOptions('first-bag', {
      revertOnSpill: true
    });

    dragulaService.drop.subscribe((value) => {

      const newSongIds = Object.keys(value[2].children).map((key) => {
        return $(value[2].children[key]).find('.song-key').val();
      });

      const newOrderedSetlistSongs = newSongIds.map((songId) => {
        return this.setlistSongs.find((setlistSong) => setlistSong.SongSetListId === Number(songId));
      });
      this.reorderSetlistSongs(newOrderedSetlistSongs);
      this.updateAllSetlistSongs(newOrderedSetlistSongs);
    });

    this.term.valueChanges
      .debounceTime(400)
      .subscribe(term => this.onSearch(term));

  }

  ngOnInit() {
    this.songToSearchFor = '';
    this.showSongs = false;

    this.sub = this.route.params.subscribe(params => {
      this.setlistId = params['setlistid'];
      this.songCatalogSongs = [];
      this.songsInSetlist = [];
      this.setlistService.getSetlist(this.setlistId)
        .subscribe(setlist => {
          this.setlist = setlist;
          this.setlistSongs = setlist.setlistSongs;
          this.setlistSongCount = 0;
          this.breakCount = 0;
          this.setlistSongs = this.setlistSongs.sort((song1, song2) => {
            if (song1.Sequence > song2.Sequence) {
              return 1;
            }

            if (song1.Sequence < song2.Sequence) {
              return -1;
            }

            return 0;
          });
          let displaySequenceNumber = 1;
          for (let i = 0; i < this.setlistSongs.length; i++) {
            const setlistSong = this.setlistSongs[i];
            if (setlistSong.song.SongType === 1) {
              setlistSong.isBreak = true;
              setlistSong.displaySequenceNumber = -1;
              this.breakCount++;
            } else {
              setlistSong.isBreak = false;
              setlistSong.displaySequenceNumber = displaySequenceNumber++;
              this.setlistSongCount++;
            }
            this.songsInSetlist.push(setlistSong.song);
          }
      });
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
    // Call new service
    if (termToSearch === '') {
      this.songService.findAllSongs(this.startingIndex, this.pageSize, this.orderByColumnName, this.orderByColumDirection)
        .map((songs) => {
          return songs;
        })
        .subscribe(songs => {
          this.songCatalogSongs = this.songCatalogSongs.concat(songs);
          this.songCount = this.songCountTotal;
        });
    } else{
      this.songService.searchSongs(termToSearch, this.orderByColumnName, this.orderByColumDirection)
        .map((songs) => {
          return songs;
        })
        .subscribe(songs => {
          this.songCatalogSongs = songs;
          this.songCount = songs.length;
        });
    }
  }

  onScroll() {
    this.startingIndex = this.startingIndex + 50;
    this.onSearch('');
  }

  getLastSequenceNumbers() {
    let sequenceNumber = 1;
    let displaySequenceNumber = 1;
    if (this.setlistSongs && this.setlistSongs.length > 0) {
      let currentSetlistSongIndex = this.setlistSongs.length - 1;
      let lastSetlistSong: SetlistSong = this.setlistSongs[currentSetlistSongIndex--];
      sequenceNumber = lastSetlistSong.Sequence + 1;

      //Get the display sequence numbers until they are not -1. -1 is a break.
      displaySequenceNumber = lastSetlistSong.displaySequenceNumber;
      while (displaySequenceNumber === -1) {
        if (currentSetlistSongIndex > 0) {
          lastSetlistSong = this.setlistSongs[currentSetlistSongIndex--];
          displaySequenceNumber = lastSetlistSong.displaySequenceNumber;
        }
      }

      displaySequenceNumber = lastSetlistSong.displaySequenceNumber + 1;
    }
    return {
      sequenceNumber: sequenceNumber,
      displaySequenceNumber: displaySequenceNumber
    };
  }

  addSongToSetlist(song) {

    const sequenceNumbers = this.getLastSequenceNumbers();
    const newSetlistSong = new SetlistSong(-1,
      sequenceNumbers.sequenceNumber,
      sequenceNumbers.displaySequenceNumber,
      this.setlistId,
      song.SongId,
      false,
      song);
    this.setlistSongs.push(newSetlistSong);

    this.updateAllSetlistSongs(this.setlistSongs);

  }

  addBreak() {
    const sequenceNumbers = this.getLastSequenceNumbers();

    const newSong: Song = Song.createNewSong();
    newSong.SongType = 1;
    newSong.Name = 'Break';
    this.songService.createSong(newSong).do(updatedSong => console.log(`update song ${updatedSong}`))
      .subscribe(updatedSong => {
        //this.isSaving = false;
        const returnSong: Song = Song.fromJson(updatedSong.song);
        //this.closeModal.emit(returnSong);
        //this.modal.close();
        const newSetlistSong = new SetlistSong(-1,
        sequenceNumbers.sequenceNumber,
        sequenceNumbers.displaySequenceNumber,
        this.setlistId,
        returnSong.SongId,
        true,
        returnSong);
        this.setlistSongs.push(newSetlistSong);
        this.updateAllSetlistSongs(this.setlistSongs);
      });
  }

  addSongToSetlistAtKey(keyOfSongToAdd, keyOfSongToInsertAt) {

    this.setlistSongs = _.sortBy(this.setlistSongs, 'sequenceNumber');

    let sequenceNumber = 1;
    const setlistSongsLength = this.setlistSongs.length;
    let startReorder = false;
    for (let i = 0; i < setlistSongsLength; i++) {

      //Add the new item
      if (this.setlistSongs[i].songId === keyOfSongToInsertAt) {
        /*this.af.database
          .list(`/setlists/` + this.SetListId + `/songs` )
          .push({
            displaySequenceNumber: sequenceNumber,
            sequenceNumber: sequenceNumber,
            songId: keyOfSongToAdd
          });*/
        startReorder = true;
        sequenceNumber++;
      }
      //Only reorder when you find the item to insert at.
      if (startReorder === true) {
        //Increment the new items
        /*this.af.database
          .object('/setlists/' + this.SetListId + '/songs/' + this.setlistSongs[i].$key)
          .update(
            {
              displaySequenceNumber: sequenceNumber,
              sequenceNumber: sequenceNumber
            });*/
      }
      sequenceNumber++;
    }
    //Added as the last song so just add it and be done.
    if (startReorder === false) {
      /*this.af.database
        .list(`/setlists/` + this.SetListId + `/songs` )
        .push({
          displaySequenceNumber: sequenceNumber,
          sequenceNumber: sequenceNumber,
          songId: keyOfSongToAdd
        });*/
    }
  }

  reorderSetlistSongs(setlistSongsToReorder: SetlistSong[]): SetlistSong[] {

    const setlistSongs = _.clone(_.sortBy(setlistSongsToReorder, 'sequenceNumber'), true);

    let sequenceNumber = 1;
    let displaySequenceNumber = 1;
    const setlistSongsLength = setlistSongs.length;
    for (let i = 0; i < setlistSongsLength; i++) {
      const setlistSong: SetlistSong = setlistSongs[i];
      if (setlistSong.isBreak === true) {
        setlistSong.displaySequenceNumber = -1;
      } else {
        setlistSong.displaySequenceNumber = displaySequenceNumber++;
      }
      setlistSong.Sequence = sequenceNumber++;
    }
    return setlistSongs;
  }

  updateAllSetlistSongs(setlistSongs: SetlistSong[]) {
    this.setlistService.updateSetlistSongs(this.setlistId, setlistSongs)
      .subscribe(result => console.log(result));
  }

  onRowClick(setlistSong) {
    this.songLyric.open(setlistSong);
  }

  onEdit(setlistSong) {
    this.songForEdit = setlistSong.song;
    this.songEdit.open(setlistSong.song);
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
    }
  }

  removeSetlistSong(setlistSongToRemove) {
    const filteredSetlistSongs = this.setlistSongs.filter((setlistSong) => setlistSong.SongSetListId !== setlistSongToRemove.SongSetListId);
    //reorder the songs.
    this.setlistSongs = this.reorderSetlistSongs(filteredSetlistSongs);
    this.updateAllSetlistSongs(this.setlistSongs);
  }
}
