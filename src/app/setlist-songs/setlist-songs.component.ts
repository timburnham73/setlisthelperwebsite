import {Component, OnInit, ViewChild} from '@angular/core';


import {ActivatedRoute, Router} from '@angular/router';
import {DragulaService} from 'ng2-dragula/components/dragula.provider';
import {AuthService} from '../shared/security/auth.service';
import {SetlistService} from '../shared/services/setlist.service';
import {SongEditComponent} from '../song-edit';
import {Setlist} from '../shared/model/setlist';
import {Account} from '../shared/model/account';
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
  setlistId: string;
  private sub: any;
  private songToSearchFor;
  startingIndex: number;
  pageSize: number;
  songForEdit: any;

  constructor(private route: ActivatedRoute,
              private auth: AuthService,
              private router: Router,
              private dragulaService: DragulaService,
              private setlistService: SetlistService,
              private songService: SongService) {
    this.auth = auth;
    this.startingIndex = 0;
    this.pageSize = 50;
    const bag: any = this.dragulaService.find('first-bag');
    if (bag !== undefined ) {
      this.dragulaService.destroy('first-bag');
    }
    this.dragulaService.setOptions('first-bag', {
      revertOnSpill: true
    });

    dragulaService.drop.subscribe((value) => {

      const songKeyToMove = $(value[1]).find('input.song-key').val();
      const songKeyToStartAt = $(value[4]).find('input.song-key').val();
      //If the song is moved from the same table.
      if ($(value[2]).attr('id') === $(value[3]).attr('id')) {
        this.moveSetlistSong(songKeyToMove, songKeyToStartAt);
      } else {
        //Add the song from the setlist songs.
        this.addSongToSetlistAtKey(songKeyToMove, songKeyToStartAt);
      }
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
      this.songService.findAllSongs(this.startingIndex, this.pageSize)
        .map((songs) => {
          return songs;
        })
        .subscribe(songs => {
          this.songCatalogSongs = this.songCatalogSongs.concat(songs);
          this.songCount = this.songCountTotal;
        });
    } else{
      this.songService.searchSongs(termToSearch)
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
      sequenceNumber = lastSetlistSong.sequenceNumber + 1;

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
    const newSetlistSong: SetlistSong = new SetlistSong(-1,
      sequenceNumbers.sequenceNumber,
      sequenceNumbers.displaySequenceNumber,
      song.$key);

    //this.setlistService.addSongToSetlist(this.SetListId, newSetlistSong);

  }

  addBreak() {
    const sequenceNumbers = this.getLastSequenceNumbers();
    //this.setlistService.addSongBreak(this.SetListId, sequenceNumbers.sequenceNumber, sequenceNumbers.displaySequenceNumber);
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
      setlistSong.sequenceNumber = sequenceNumber++;
    }
    return setlistSongs;
  }

  updateAllSetlistSongs(setlistSongs: SetlistSong[]) {
    for (let i = 0; i < setlistSongs.length; i++) {
      //this.setlistService.updateSetlistSong(this.SetListId, setlistSongs[i]);
    }
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

  removeSetlistSong(setlistSong) {
    //this.setlistService.removeSetlistSong(this.SetListId, setlistSong);
    //reorder the songs.
    const setlistSongs: SetlistSong[] = this.reorderSetlistSongs(this.setlistSongs);
    this.updateAllSetlistSongs(setlistSongs);
  }

  moveSetlistSong(setlistSongKeyToMove, setlistSongKeyToStartAt) {
    //Do a deep copy of the setlist songs so firebase doesn't update the array while it is in use.
    const setlistSongs = _.clone(_.sortBy(this.setlistSongs, 'sequenceNumber'), true);
    //Create a new setlist songs array to batch update at the end of the function.
    const newSetlistSongs = [];

    let sequenceNumber = 1;
    const setlistSongsLength = this.setlistSongs.length;
    let seqNumOfStartToStartAt = -1;
    let setlistSongToMove: SetlistSong = null;
    for (let i = 0; i < setlistSongsLength; i++) {
      const setlistSong: SetlistSong = setlistSongs[i];
      if (setlistSongKeyToStartAt === setlistSong.setlistSongId ) {

        //The song was moved up
        if (_.isNull(setlistSongToMove) === true) {
          seqNumOfStartToStartAt = setlistSong.sequenceNumber;
          sequenceNumber += 1; //Increment the seq num to make room for the new song.
        } else {
          seqNumOfStartToStartAt = setlistSong.sequenceNumber - 1;
          //The song was moved down
          sequenceNumber += 1; //Increment the seq num to make room for the new song.
        }
      }

      if (setlistSongKeyToMove !== setlistSong.setlistSongId) {//Don't change the song you are moving until the end
        setlistSong.displaySequenceNumber = sequenceNumber;
        setlistSong.sequenceNumber = sequenceNumber;
        newSetlistSongs.push(setlistSong);

        sequenceNumber++;
      } else {
        setlistSongToMove = setlistSong;
      }
    }

    //If the song is the last song then give it the last sequence number.
    if (seqNumOfStartToStartAt === -1) {
      seqNumOfStartToStartAt = sequenceNumber;
    }

    if (_.isNull(setlistSongToMove) === false) {
      //Reset the song to move now the we figured out the sequence number.
      setlistSongToMove.displaySequenceNumber = seqNumOfStartToStartAt;
      setlistSongToMove.sequenceNumber = seqNumOfStartToStartAt;
      newSetlistSongs.push(setlistSongToMove);
    }

    const reorderedSetlistSongs: SetlistSong[] = this.reorderSetlistSongs(newSetlistSongs);
    this.updateAllSetlistSongs(reorderedSetlistSongs);

  }
}
