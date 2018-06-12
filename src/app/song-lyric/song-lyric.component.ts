import {Component, EventEmitter, Input, OnInit, Output, Pipe, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {ChordProParser} from './ChordProParser';
import {Song} from '../shared/model/song';
import {FormBuilder} from '@angular/forms';
import {SongService} from '../shared/services/song.service';
import {BsModalComponent} from 'ng2-bs3-modal';
import {DomSanitizer} from '@angular/platform-browser';
import {LyricDisplaySetting} from './LyricDisplaySetting';
import {DropDownValues, FontSizeValues, FontValues} from './lyricViewConstants';
declare var _: any;
declare var jQuery: any;

@Pipe({name: 'safe'})
export class Safe {
  constructor(private sanitizer: DomSanitizer) {}

  transform(style) {
    const sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(style);
    return sanitizedHtml;
  }
}

@Component({
  moduleId: module.id,
  selector: 'app-song-lyric',
  templateUrl: 'song-lyric.component.html',
  styleUrls: ['song-lyric.component.less']
})
export class SongLyricComponent implements OnInit {
  @Input() songList: Song[];
  @Output() closeModal = new EventEmitter();
  @ViewChild('songLyricsModal')

  modal: BsModalComponent;

  public song: Song;
  public parsedSong: string;
  public lyricsForEdit: string;
  public lyricStyle: string;
  public displaySettings: any;
  public defaultDisplaySettings: any;
  public dropdownValues: any;
  public fontSizeValues: any;
  public fontValues: any;
  public selectedFontValue: string;
  public selectedFontSizeValue: string;
  public selectedSongPart: string;
  public selectedDisplaySettingValue: string;
  public isEditing = false;
  private isLoading = false;
  private isSaving = false;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              private songService: SongService) {
    this.defaultDisplaySettings = {
      lyricsHeader: new LyricDisplaySetting('lyricsHeader', 'block', 'large', 'bold', 'normal', '', '', '', 'Sans Serif' ),
      chord: new LyricDisplaySetting('chord', 'block', 'large', 'bold', 'normal', '', '', '', 'Sans Serif' ),
      lyricText: new LyricDisplaySetting('lyricText', 'block', 'large', 'normal', 'normal', '', '', '', 'Sans Serif' ),
      songPart: new LyricDisplaySetting('songPart', 'block', 'x-large', 'bold', 'normal', '', '', '', 'Sans Serif' ),
      tab: new LyricDisplaySetting('tab', 'block', 'small', 'bold', 'normal', '', '', '', 'Monospace' ),
    };

    this.parsedSong = '';
    this.displaySettings = _.clone(this.defaultDisplaySettings, true);


    this.fontValues = FontValues;

    this.fontSizeValues = FontSizeValues;

    this.dropdownValues = DropDownValues;

    this.selectedDisplaySettingValue = 'lyricText';

    this.selectedSongPart = this.dropdownValues[0].name;
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      const id: number = params['songid'];

    });
  }

  close() {
    this.closeModal.emit();
    this.modal.close();
  }

  save(closeModal: boolean) {
    this.isSaving = true;
    this.song.Lyrics = this.lyricsForEdit;
    this.songService.updateSong(this.song.SongId, this.song)
      .subscribe(updatedSong => {
        this.isSaving = false;
        if (closeModal) {
          this.modal.dismiss();
        } else {
          this.isEditing = false;
          const parser =  new ChordProParser(this.lyricsForEdit);
          this.parsedSong = parser.parseChordPro();
        }
      });
  }

  edit() {
    this.isEditing = true;
  }

  open(song) {
    this.isEditing = false;
    this.loadSong(song);
    this.modal.open('lg');
  }

  loadSong(song) {
    if (song.SongId !== -1) {
      this.isLoading = true;
      this.songService.getSong(song.SongId)
        .subscribe(songFromService => {
          this.song = Song.fromJson(songFromService);
          this.lyricsForEdit = this.song.Lyrics;
          const parser =  new ChordProParser(this.song.Lyrics);
          this.parsedSong = parser.parseChordPro();
          this.isLoading = false;
        });
    }
  }

  onStyleChange(styleType, value) {
    const cssClass = jQuery('.' + this.displaySettings[this.selectedDisplaySettingValue].className);
    switch (styleType) {
      case 'fontWeight':
        this.displaySettings[this.selectedDisplaySettingValue][styleType] = this.displaySettings[this.selectedDisplaySettingValue][styleType] === 'normal' ? 'bold' : 'normal';
        cssClass.css('font-weight', this.displaySettings[this.selectedDisplaySettingValue][styleType]);
        break;
      case 'fontStyle':
        this.displaySettings[this.selectedDisplaySettingValue][styleType] = this.displaySettings[this.selectedDisplaySettingValue][styleType] === 'normal' ? 'italic' : 'normal';
        cssClass.css('font-style', this.displaySettings[this.selectedDisplaySettingValue][styleType]);
        break;
      case 'textDecoration':
        this.displaySettings[this.selectedDisplaySettingValue][styleType] = this.displaySettings[this.selectedDisplaySettingValue][styleType] === 'none' ? 'underline' : 'none';
        cssClass.css('text-decoration', this.displaySettings[this.selectedDisplaySettingValue][styleType]);
        break;
      case 'fontName':
        this.displaySettings[this.selectedDisplaySettingValue][styleType] = value;
        cssClass.css('font-family', this.displaySettings[this.selectedDisplaySettingValue][styleType]);
        break;
      case 'fontSize':
        this.displaySettings[this.selectedDisplaySettingValue][styleType] = value;
        cssClass.css('font-size', this.displaySettings[this.selectedDisplaySettingValue][styleType]);
        break;
      case 'fontColor':
        this.displaySettings[this.selectedDisplaySettingValue][styleType] = value;
        cssClass.css('color', this.displaySettings[this.selectedDisplaySettingValue][styleType]);
        break;
      case 'fontBackgroundColor':
        this.displaySettings[this.selectedDisplaySettingValue][styleType] = value;
        cssClass.css('background-color', this.displaySettings[this.selectedDisplaySettingValue][styleType]);
        break;
    }

    this.onSaveStyle();
  }

  onSaveStyle() {
    // this.selectedSongLyric.displaySettings = this.displaySettings;
    // this.songService.updateSongLyric(this.selectedSongLyric);
  }

  selectSongPart(value) {
    this.selectedDisplaySettingValue = value.value;
  }

  selectFontValue(fontValue) {
    this.onStyleChange('fontName', fontValue.value);
  }

  selectFontSize(fontSize) {
    this.onStyleChange('fontSize', fontSize.value);
  }

  selectFontColor(fontColor){
    this.onStyleChange('fontColor', fontColor);
  }
  selectFontBackgroundColor(fontBackgroundColor) {
    this.onStyleChange('fontBackgroundColor', fontBackgroundColor);
  }

  onPreviousSong() {
    if (this.songList !== null) {
      const indexOfSong = this.songList.findIndex(song => this.song.SongId === song.SongId);
      const previousIndex = indexOfSong - 1;
      if (previousIndex >= 0 ) {
        const previousSong = this.songList[previousIndex];
        this.loadSong(previousSong);
      }
    }
  }
  onNextSong() {
    if (this.songList !== null) {
      const indexOfSong = this.songList.findIndex(song => this.song.SongId === song.SongId);
      const nextIndex = indexOfSong + 1;
      if (nextIndex <= this.songList.length ) {
        const previousSong = this.songList[nextIndex];
        this.loadSong(previousSong);
      }
    }
  }
}
