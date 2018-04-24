import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Song} from '../shared/model/song';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { BsModalComponent, BsModalService } from 'ng2-bs3-modal/ng2-bs3-modal';
import {SongService} from '../shared/services/song.service';

@Component({
  moduleId: module.id,
  selector: 'app-song-edit',
  templateUrl: 'song-edit.component.html',
  styleUrls: ['song-edit.component.less']
})


export class SongEditComponent implements OnInit {
  @ViewChild('songEditModal')
  modal: BsModalComponent;

  private sub: any;
  private isNew: boolean;
  public song: any;
  private accountId: string;
  private uid: string;
  public myForm: FormGroup; // our model driven form
  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              private songService: SongService) {
  }

  ngOnInit() {
    this.isNew = false;
    this.accountId = 'someguid';
    this.song = new Song('', this.accountId, '', '', '', '', 120, 300, false, '', '');
    // this.artists = this.af.database.list('/artists');

    this.myForm = this.fb.group({
      name: ['', [<any>Validators.required, <any>Validators.minLength(1)]],
      artist: ['', [<any>Validators.required, <any>Validators.minLength(1), <any>Validators.maxLength(255)]],
      genre: ['', [<any>Validators.minLength(1), <any>Validators.maxLength(255)]],
      songKey: ['', [<any>Validators.maxLength(5), <any>Validators.minLength(1)]],
      lengthMin: ['', []],
      lengthSec: ['', []],
      lyrics: ['', []],
      tempo: ['', []],
      notes: ['', [<any>Validators.minLength(1)]],
      other: ['', [<any>Validators.minLength(1)]]
    });
    this.sub = this.route.params.subscribe(params => {
      const id: string = params['songid'];
      this.song = {}; // this.af.database.object('/songs/' + id);
      this.isNew = id === 'new';
    });
  }

  loadSong(song) {

    this.myForm.reset();

    (<FormControl>this.myForm.controls['name'])
      .setValue(song.Name, {onlySelf: true});

    (<FormControl>this.myForm.controls['artist'])
      .setValue(song.Artist && song.Artist.Name ? song.Artist.Name : '', {onlySelf: true});

    (<FormControl>this.myForm.controls['genre'])
      .setValue(song.Genre && song.Genre ? song.Genre : '', {onlySelf: true});

    (<FormControl>this.myForm.controls['songKey'])
      .setValue(song.SongKey ? song.SongKey : '' , {onlySelf: true});

    if (song.Length) {
      const lengthMin = Math.floor(song.Length / 60);
      const lengthSec = song.Length % 60;
      (<FormControl>this.myForm.controls['lengthMin'])
        .setValue(lengthMin, {onlySelf: true});

      (<FormControl>this.myForm.controls['lengthSec'])
        .setValue(lengthSec, {onlySelf: true});
    } else {
      (<FormControl>this.myForm.controls['lengthMin'])
        .setValue(3, {onlySelf: true});

      (<FormControl>this.myForm.controls['lengthSec'])
        .setValue(0, {onlySelf: true});
    }

    (<FormControl>this.myForm.controls['tempo'])
      .setValue(song.Tempo ? song.Tempo : 120 , {onlySelf: true});

    (<FormControl>this.myForm.controls['lyrics'])
      .setValue(song.Lyrics ? song.Lyrics : '', {onlySelf: true});

    (<FormControl>this.myForm.controls['notes'])
      .setValue(song.Notes ? song.Notes : '', {onlySelf: true});

    (<FormControl>this.myForm.controls['other'])
      .setValue(song.Other ? song.Other : '', {onlySelf: true});


    this.isNew = song.SongId ? false : true;


  }

  save(name: string,
       length: string,
       key: string,
       tempo: string,
       artist: string,
       genre: string,
       lyrics: string,
       notes: string,
       other: string
  ) {
    if (this.isNew === true) {

      // this.artists.map( artists => artists.filter(artist => artist.name === artist.name));

      // let newItemKey = this.songs.push({name: name, length: length, key: key, tempo: tempo, lyrics: lyrics, uid: this.uid}).key;


    } else {

      this.getOrCreateArtist(artist).then(
        function(result) {
          let artistKey;
          if (result) {
            artistKey = result['$key'];
          } else {
            artistKey = this.artists.set({name: artist}).key;
          }

          /*const user = this.af.database.object(`users/${login}`);
          user.subscribe(data => {
            if(data.$value !== null) {
              console.log('User does not exist');
            } else {
              console.log('User does exist');
            }
          });*/

          // this.song.update({name: name, length: length, key: key, tempo: tempo, lyrics: lyrics, artistId: artistKey});
        }
      );

    }

    this.router.navigate(['/songs']);
  }

  getOrCreateArtist(name: string) {
    return new Promise((resolve, reject) => {

    });
  }

  isErrorVisible(field: string, error: string) {

    return this.myForm.controls[field].dirty
      && this.myForm.controls[field].errors &&
      this.myForm.controls[field].errors[error];
  }

  close() {
    this.modal.close();
  }

  open(song) {

    this.songService.getSong(String(song.SongId))
      .subscribe(songFromService => {
        this.song = song;
        this.loadSong(songFromService);
      });
    this.modal.open('sm');
  }

}
