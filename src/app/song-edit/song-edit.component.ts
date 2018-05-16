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
    const songLength = 180;
    const songLengthMinSec = Song.getSongLengthMinSec(songLength);
    this.song = new Song('',
      '',
      '',
      '',
      'A',
      songLength,
      120,
      false,
      false,
      '',
      '',
      new Date().toISOString(),
      0,
      '',
      4,
      4,
      0,
      '',
      '',
      '',
      '',
      '',
      songLengthMinSec.minutes,
      songLengthMinSec.seconds
      );
    // this.artists = this.af.database.list('/artists');

    this.myForm = this.fb.group({
      name: ['', [<any>Validators.required, <any>Validators.minLength(1)]],
      artistName: ['', [<any>Validators.required, <any>Validators.minLength(1), <any>Validators.maxLength(255)]],
      genreName: ['', [<any>Validators.minLength(1), <any>Validators.maxLength(255)]],
      key: ['', [<any>Validators.maxLength(5), <any>Validators.minLength(1)]],
      lengthMin: ['', []],
      lengthSec: ['', []],
      lyrics: ['', []],
      tempo: ['', []],
      notes: ['', [<any>Validators.minLength(1)]],
      other: ['', [<any>Validators.minLength(1)]],
      songLocation: ['', []],
      createdByUserId: ['', []],
      blob: ['', []],
      documentLocation: ['', []],
      songId: ['', []],
      songType: ['', []]
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
      .setValue(song.name, {onlySelf: true});

    (<FormControl>this.myForm.controls['artistName'])
      .setValue(song.artistName && song.artistName ? song.artistName : '', {onlySelf: true});

    (<FormControl>this.myForm.controls['genreName'])
      .setValue(song.genreName && song.genreName ? song.genreName : '', {onlySelf: true});

    (<FormControl>this.myForm.controls['key'])
      .setValue(song.key ? song.key : '' , {onlySelf: true});

    if (song.songLength) {
      const lengthMin = Math.floor(song.songLength / 60);
      const lengthSec = song.songLength % 60;
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
      .setValue(song.tempo ? song.tempo : 120 , {onlySelf: true});

    (<FormControl>this.myForm.controls['lyrics'])
      .setValue(song.lyrics ? song.lyrics : '', {onlySelf: true});

    (<FormControl>this.myForm.controls['notes'])
      .setValue(song.notes ? song.notes : '', {onlySelf: true});

    (<FormControl>this.myForm.controls['other'])
      .setValue(song.other ? song.other : '', {onlySelf: true});



    (<FormControl>this.myForm.controls['songLocation'])
      .setValue(song.SongLocation ? song.SongLocation : '', {onlySelf: true});

    (<FormControl>this.myForm.controls['createdByUserId'])
      .setValue(song.CreatedByUserId ? song.CreatedByUserId : '', {onlySelf: true});

    (<FormControl>this.myForm.controls['blob'])
      .setValue(song.Blob ? song.Blob : '', {onlySelf: true});

    (<FormControl>this.myForm.controls['documentLocation'])
      .setValue(song.other ? song.other : '', {onlySelf: true});

    (<FormControl>this.myForm.controls['songId'])
      .setValue(song.songId ? song.songId : '', {onlySelf: true});

    (<FormControl>this.myForm.controls['songType'])
      .setValue(song.songType === null ? song.songType : 0, {onlySelf: true});

    this.isNew = !song.songId;


  }

  save(model, isValid: boolean) {

    model.LengthMin = model.LengthMin * 60;
    model.LengthMin += model.LengthMin;
    delete model.LengthMin;
    delete model.LengthSec;

    if (this.isNew === true) {
      // model.createDate = new Date();
      // this.songId = this.songService.createSong(model);
    } else {
      // const songForUpdate: Song = Song.fromJson(model);
      this.songService.updateSong(model.songId, model)
        .do(updatedSong => console.log(`update song ${updatedSong}`))
        .subscribe(updatedSong => {});
    }
    this.modal.close();
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
        this.song = Song.fromJson(songFromService);
        this.loadSong(this.song);
      });
    this.modal.open('sm');
  }

}
