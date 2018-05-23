import {Component, OnInit, Inject, ViewChild, Output, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Song} from '../shared/model/song';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { BsModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {SongService} from '../shared/services/song.service';

@Component({
  moduleId: module.id,
  selector: 'app-song-edit',
  templateUrl: 'song-edit.component.html',
  styleUrls: ['song-edit.component.less']
})


export class SongEditComponent implements OnInit {
  @Output() closeModal = new EventEmitter();
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
    const SongLength = 180;
    const songLengthMinSec = Song.getSongLengthMinSec(SongLength);
    this.song = Song.createNewSong();

    this.myForm = this.fb.group({
      Name: ['', [<any>Validators.required, <any>Validators.minLength(1)]],
      ArtistName: ['', [<any>Validators.maxLength(255)]],
      GenreName: ['', [<any>Validators.minLength(1), <any>Validators.maxLength(255)]],
      Key: ['', [<any>Validators.maxLength(5), <any>Validators.minLength(1)]],
      LengthMin: ['', []],
      LengthSec: ['', []],
      Lyrics: ['', []],
      Tempo: ['', []],
      Notes: ['', [<any>Validators.minLength(1)]],
      Other: ['', [<any>Validators.minLength(1)]],
      SongLocation: ['', []],
      CreatedByUserId: ['', []],
      Blob: ['', []],
      DocumentLocation: ['', []],
      SongId: ['', []],
      SongType: ['', []]
    });
    this.sub = this.route.params.subscribe(params => {
      const id: string = params['songid'];
      this.song = {}; // this.af.database.object('/songs/' + id);
      this.isNew = id === 'new';
    });
  }

  loadSong(song) {

    this.myForm.reset();

    (<FormControl>this.myForm.controls['Name'])
      .setValue(song.Name, {onlySelf: true});

    (<FormControl>this.myForm.controls['ArtistName'])
      .setValue(song.ArtistName && song.ArtistName ? song.ArtistName : '', {onlySelf: true});

    (<FormControl>this.myForm.controls['GenreName'])
      .setValue(song.GenreName && song.GenreName ? song.GenreName : '', {onlySelf: true});

    (<FormControl>this.myForm.controls['Key'])
      .setValue(song.Key ? song.Key : '' , {onlySelf: true});

    if (song.SongLength) {
      const lengthMin = Math.floor(song.SongLength / 60);
      const lengthSec = song.SongLength % 60;
      (<FormControl>this.myForm.controls['LengthMin'])
        .setValue(lengthMin, {onlySelf: true});

      (<FormControl>this.myForm.controls['LengthSec'])
        .setValue(lengthSec, {onlySelf: true});
    } else {
      (<FormControl>this.myForm.controls['LengthMin'])
        .setValue(3, {onlySelf: true});

      (<FormControl>this.myForm.controls['LengthSec'])
        .setValue(0, {onlySelf: true});
    }

    (<FormControl>this.myForm.controls['Tempo'])
      .setValue(song.Tempo ? song.Tempo : 120 , {onlySelf: true});

    (<FormControl>this.myForm.controls['Lyrics'])
      .setValue(song.Lyrics ? song.Lyrics : '', {onlySelf: true});

    (<FormControl>this.myForm.controls['Notes'])
      .setValue(song.Notes ? song.Notes : '', {onlySelf: true});

    (<FormControl>this.myForm.controls['Other'])
      .setValue(song.Other ? song.Other : '', {onlySelf: true});



    (<FormControl>this.myForm.controls['SongLocation'])
      .setValue(song.SongLocation ? song.SongLocation : '', {onlySelf: true});

    (<FormControl>this.myForm.controls['CreatedByUserId'])
      .setValue(song.CreatedByUserId ? song.CreatedByUserId : '', {onlySelf: true});

    (<FormControl>this.myForm.controls['Blob'])
      .setValue(song.Blob !== null ? song.Blob : '', {onlySelf: true});

    (<FormControl>this.myForm.controls['DocumentLocation'])
      .setValue(song.DocumentLocation ? song.DocumentLocation : '', {onlySelf: true});

    (<FormControl>this.myForm.controls['SongId'])
      .setValue(song.SongId !== null ? song.SongId : '', {onlySelf: true});

    (<FormControl>this.myForm.controls['SongType'])
      .setValue(song.SongType !== null ? song.SongType : 0, {onlySelf: true});

    this.isNew = !song.SongId;


  }

  save(model, isValid: boolean) {

    model.SongLength = model.LengthMin * 60;
    model.SongLength += model.LengthSec;
    delete model.LengthMin;
    delete model.LengthSec;

    if (this.isNew === true) {
      model.createDate = new Date();
      this.songService.createSong(model).do(updatedSong => console.log(`update song ${updatedSong}`))
        .subscribe(updatedSong => {
          const returnSong: Song = Song.fromJson(updatedSong.song);
          this.closeModal.emit(returnSong);
          this.modal.close();
        });
    } else {
      // const songForUpdate: Song = Song.fromJson(model);
      this.songService.updateSong(model.SongId, model)
        .do(updatedSong => console.log(`update song ${updatedSong}`))
        .subscribe(updatedSong => {
          const returnSong: Song = Song.fromJson(updatedSong);
          this.closeModal.emit(returnSong);
          this.modal.close();
        });
    }
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
    this.closeModal.emit();
    this.modal.close();
  }

  open(song) {
    if (song.SongId !== -1) {
      this.songService.getSong(String(song.SongId))
        .subscribe(songFromService => {
          this.song = Song.fromJson(songFromService);
          this.loadSong(this.song);
        });
    } else {
      this.loadSong(this.song);
    }
    this.modal.open('sm');
  }

}
