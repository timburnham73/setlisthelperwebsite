/**
 * Created by tim_burnham on 9/25/16.
 */
import {ChordproEnum} from './ChordProEnum';

declare var _: any;

export class ChordProParser {
  private chordProString: string;
  private inTab: boolean;
  private showKey: boolean;
  private showTempo: boolean;
  private inHighlight; boolean;
  constructor(chordProString: string) {
    this.chordProString = chordProString;
    this.inTab = false;
    this.inHighlight = false;
    this.showKey = true;
    this.showTempo = true;
  }

  parseChordPro() {
    const lyricsSplit = this.chordProString.split('\n');
    let parsedSong = '';

    if (lyricsSplit.length === 0) {
      parsedSong += '<div><span>No Lyrics</span></div>';
      parsedSong += '</div>'; // Add div to match lyrics div
      return parsedSong;
    }

    let songKey = '';
    let songTempo = '';

    for (const index in lyricsSplit) {
      let lyricLine = lyricsSplit[index];


      const chordproEnum = this.testForSongPart(lyricLine);

      lyricLine = lyricLine.trim();

      switch (chordproEnum) {
        case ChordproEnum.songpart:
          parsedSong += this.getSongPartLyricLine(lyricLine, this.inHighlight);
          break;
        case ChordproEnum.title:
          lyricLine = lyricLine.slice(0, -1); //remove end
          let title = lyricLine.substring(0, 7) === '{title:' ? lyricLine.substring(7) : lyricLine; //Remove {title:
          title = title.substring(0, 3) ===  '{t:' ? title.substring(3) : title;
          if (_.size(title) > 0) {
            parsedSong += '<div class="lyricsHeader" id=\'anchor1\' class=\'anchor\'>' + title + '</div>\n';
          }
          break;
        case ChordproEnum.subtitle:
          lyricLine = lyricLine.slice(0, -1); //remove end
          let subtitle = lyricLine.substring(0, 10) === '{subtitle:' ? lyricLine.substring(10) : lyricLine; //Remove {title:
          subtitle = subtitle.substring(0, 4) ===  '{st:' ? subtitle.substring(4) : subtitle;
          if (_.size(subtitle) > 0) {
            parsedSong += '<div class="lyricsHeader" id=\'anchor1\' class=\'anchor\'>' + subtitle + '</div>\n';
          }
          break;
        case ChordproEnum.key:
          lyricLine = lyricLine.slice(0, -1); //remove end
          const key = lyricLine.substring(0, 5) === '{key:' ? lyricLine.substring(5) : lyricLine; //Remove {title:
          songKey = key;
          break;
        case ChordproEnum.tempo:
          lyricLine = lyricLine.slice(0, -1); //remove end
          const tempo = lyricLine.substring(0, 7) === '{tempo:' ? lyricLine.substring(7) : lyricLine; //Remove {title:
          songTempo = tempo;
          console.log(tempo);
          break;
        case ChordproEnum.startofchorus:
          parsedSong += '<div class=\'chorus\' style=\'margin: 15px;border-left: white 1px solid;\'>\n';
          parsedSong += '<span class="songPart">Chorus</span>\n';
          break;
        case ChordproEnum.endofchorus:
          parsedSong += '</div>';
          break;
        case ChordproEnum.startoftab:
          parsedSong += '<pre class="tab">';
          this.inTab = true;
          break;
        case ChordproEnum.endoftab: {
          parsedSong += '</pre>';
          this.inTab = false;
          break;
        }
        default:
          if (this.inTab === false) {
            if (_.size(lyricLine) === 0) {
              parsedSong += '<br/>';
            } else {
              parsedSong += this.getActualLyric(lyricLine, true, true);
            }
          } else {
            parsedSong += lyricLine;
            parsedSong += `<br>`;
          }
      }
    }
    //Add the song information to the upper right of the lyrics
    let songInfo = '<div style=\'position:absolute;top:0;right:25px\'>';
    if (_.size(songKey) > 0) {
      if (this.showKey === true) {
        const keyOf = 'Key of ';
        songInfo += `<div style='font-weight:bold'><span>${keyOf}${songKey}</div>`;
      }
    }
    if (_.size(songTempo) > 0) {
      if (this.showTempo === true) {
        songInfo += `<div style="font-weight:bold">${songTempo}</div>`;
      }
    }
    songInfo += `</div>`;

    parsedSong += songInfo;
    // Just in case it is all lyrics.
    if (_.size(parsedSong) > 0) {
      //parsedSong = this.GetLyricSegment(Lyrics, "", showChords, showLyrics ,printsettings));
    }

    return parsedSong;
  }

  testForSongPart(lyricLine) {

    let stringToTextTrimmed = lyricLine.trim();
    const startsWithBracket = stringToTextTrimmed.length > 0 && stringToTextTrimmed[0] === '[';
    const startsWithBrace = stringToTextTrimmed.length > 0 && stringToTextTrimmed[0] === '{';
    if (startsWithBracket === false && startsWithBrace === false) {
      return ChordproEnum.none;
    }

    stringToTextTrimmed = startsWithBracket || startsWithBrace ? stringToTextTrimmed.substring(1).toLowerCase() : stringToTextTrimmed;


    if (stringToTextTrimmed.startsWith('soc') === true) {
      return ChordproEnum.startofchorus;
    } else if (stringToTextTrimmed.startsWith('eoc') === true) {
      return ChordproEnum.endofchorus;
         } else if (stringToTextTrimmed.startsWith('start_of_chorus') === true) {
      return ChordproEnum.startofchorus;
         } else if (stringToTextTrimmed.startsWith('end_of_chorus') === true) {
      return ChordproEnum.endofchorus;
         } else if (stringToTextTrimmed.startsWith('soh') === true) {
      return ChordproEnum.startofhighlight;
         } else if (stringToTextTrimmed.startsWith('eoh') === true) {
      return ChordproEnum.endofhighlight;
         } else if (stringToTextTrimmed.startsWith('start_of_highlight') === true) {
      return ChordproEnum.startofhighlight;
         } else if (stringToTextTrimmed.startsWith('end_of_highlight') === true) {
      return ChordproEnum.endofhighlight;
         } else if (stringToTextTrimmed.startsWith('capo') === true) {
      return ChordproEnum.capo;
         } else if (stringToTextTrimmed.startsWith('document') === true) {
      return ChordproEnum.noprintcomment;
         } else if (stringToTextTrimmed.startsWith('audio') === true) {
      return ChordproEnum.noprintcomment;
         } else if (stringToTextTrimmed.startsWith('#') === true) {
      return ChordproEnum.noprintcomment;
         } else if (stringToTextTrimmed.startsWith('t:') === true) {
      return ChordproEnum.title;
         } else if (stringToTextTrimmed.startsWith('title:') === true) {
      return ChordproEnum.title;
         } else if (stringToTextTrimmed.startsWith('subtitle:') === true) {
      return ChordproEnum.subtitle;
         } else if (stringToTextTrimmed.startsWith('su:') === true) {
      return ChordproEnum.subtitle;
         } else if (stringToTextTrimmed.startsWith('define:') === true) {
      return ChordproEnum.chordgrid;
         } else if (stringToTextTrimmed.startsWith('st:') === true) {
      return ChordproEnum.subtitle;
         } else if (stringToTextTrimmed.startsWith('sot') === true) {
      return ChordproEnum.startoftab;
         } else if (stringToTextTrimmed.startsWith('eot') === true) {
      return ChordproEnum.endoftab;
         } else if (stringToTextTrimmed.startsWith('start_of_tab') === true) {
      return ChordproEnum.startoftab;
         } else if (stringToTextTrimmed.startsWith('end_of_tab') === true) {
      return ChordproEnum.endoftab;
         } else if (stringToTextTrimmed.startsWith('c:') === true) {
      return ChordproEnum.comment;
         } else if (stringToTextTrimmed.startsWith('comment:') === true) {
      return ChordproEnum.comment;
         } else if (stringToTextTrimmed.startsWith('key:') === true) {
      return ChordproEnum.key;
         } else if (stringToTextTrimmed.startsWith('tempo:') === true) {
      return ChordproEnum.tempo;
         } else if (stringToTextTrimmed.startsWith('chorus') === true) {
      return ChordproEnum.songpart;
         } else if (stringToTextTrimmed.startsWith('outro') === true) {
      return ChordproEnum.songpart;
         } else if (stringToTextTrimmed.startsWith('note') === true) {
      return ChordproEnum.note;
         } else if (stringToTextTrimmed.startsWith('prechorus') === true) {
      return ChordproEnum.songpart;
         } else if (stringToTextTrimmed.startsWith('verse') === true) {
      return ChordproEnum.songpart;
         } else if (stringToTextTrimmed.startsWith('repeat') === true) {
      return ChordproEnum.songpart;
         } else if (stringToTextTrimmed.startsWith('refrain') === true) {
      return ChordproEnum.songpart;
         } else if (stringToTextTrimmed.startsWith('pre-chorus') === true) {
      return ChordproEnum.songpart;
         } else if (stringToTextTrimmed.startsWith('bridge') === true) {
      return ChordproEnum.songpart;
         } else if (stringToTextTrimmed.startsWith('climb') === true) {
      return ChordproEnum.songpart;
         } else if (stringToTextTrimmed.startsWith('coda') === true) {
      return ChordproEnum.songpart;
         } else if (stringToTextTrimmed.startsWith('solo') === true) {
      return ChordproEnum.songpart;
         } else if (stringToTextTrimmed.startsWith('keyboard') === true) {
      return ChordproEnum.songpart;
         } else if (stringToTextTrimmed.startsWith('guitar') === true) {
      return ChordproEnum.songpart;
         } else if (stringToTextTrimmed.startsWith('bass') === true) {
      return ChordproEnum.songpart;
         } else if (stringToTextTrimmed.startsWith('horn') === true) {
      return ChordproEnum.songpart;
         } else if (stringToTextTrimmed.startsWith('Instrumental') === true) {
      return ChordproEnum.songpart;
         } else if (stringToTextTrimmed.startsWith('Interlude') === true) {
      return ChordproEnum.songpart;
         } else if (stringToTextTrimmed.startsWith('intro') === true) {
      return ChordproEnum.songpart;
         } else if (stringToTextTrimmed.startsWith('pause') === true) {
      return ChordproEnum.pause;
         } else if (stringToTextTrimmed.startsWith('steel') === true) {
      return ChordproEnum.songpart;
         } else {
      if (startsWithBracket === true) {// Could be a chord so you want to print [C]
        return ChordproEnum.none;
      } else {
        return ChordproEnum.noprintcomment;
      }
    }

  }


  getActualLyric(lyricLine: string, showChords: boolean, showLyrics: boolean) {
    let inHighlight = false;
    let lyricLines = '';
    // Create a table
    lyricLines += '<table cellspacing=\'0\' cellpadding=\'0\'>';
    if (lyricLine.length === 0) {// If the lyrics is just a crlf then add a
      // lyric segment with just a space.
      //lyricLines += GetLyricSegment("&nbsp;", "", showChords, showLyrics);
    } else {
      // Parse out the chords from the lyrics and separate them into divs
      const arrLyrics = lyricLine.split('[');
      // Test to see if a chord is in the lyric

      // Create the table row and cell for chords and lyrics
      let chordRow = '<tr>';
      let lyricRow = '<tr>';
      // Loop through

      for (let n = 0; n < arrLyrics.length; n++) {
        const segment = arrLyrics[n];
        if (segment.length === 0) {
          continue;
        }
        //Contains the html for the line of chords
        let chord = '';
        let chordSpacesAfter = '';
        //let chordSpacesBefore = "";
        // Remove the chord from the lyrics. Add spaces after the chord if they are there.
        // For example" [G]    [B]   [C]
        // Keep the spaces in the above example.
        const rightBracket = segment.indexOf(']');
        if (rightBracket !== -1) {
          chord = segment.substring(0, rightBracket);
          const chordSplit = segment.split(']');
          //After the chord is split there may be spaces after it. Add ; for every space.
          if (chordSplit.length === 2) {
            for (let i = 0; i < chordSplit[1].length; i++) {
              chordSpacesAfter += '&nbsp;';
            }
          }
        }

        //Contains the lyrics for the line of chords.
        let lyric = segment.substring(rightBracket + 1);

        // Iterate backwards and replace the spaces with the html space
        // &nbsp;
        lyric = lyric.trim();
        for (let v = segment.length - 1; v > 0; v--) {
          if (segment.charAt(v) === ' ') {
            lyric += ' ';
          } else {
            break;
          }
        }

        chordRow += '<td>';
        if (chord.length !== 0) {
          // Chord
          chordRow += `<span style='display: inline' class='chord'>` + chord + `</span>${chordSpacesAfter}`;

        }
        /*if(chordSplit.length == 2){
          chordRow += "<span>" + chordSplit[1] + "</span>";
        }*/
        chordRow += '</td>';

        //Perform highlights
        if (inHighlight === true) {
          lyric = '<span style=\'background-color:yellow;\'>' + lyric;
        }

        if (lyric.indexOf('{soh')) {
          inHighlight = true;
          lyric = lyric.replace('{soh}', '<span style=\'background-color:yellow;color:black\'>');
        }

        if (lyric.indexOf('{eoh')) {
          inHighlight = false;
          lyric = lyric.replace('{eoh}', '</span>');
        } else if (inHighlight === true) {
          lyric += '</span>';
        }
        const formattedLyricText = '<td><div class="lyricText">' + lyric + '</div></td>';

        lyricRow += formattedLyricText;

        // End Lyricline

      }
      chordRow += '</tr>';
      lyricRow += '</tr>';

      lyricLines += chordRow;
      lyricLines += lyricRow;
    }

    lyricLines += '</table>';

    return lyricLines;
  }

  buildCSSString(displaySettings: any) {

    let styleString = '<style>';

    styleString += this.getClassString(`lyricsHeader`, displaySettings.lyricsHeader);
    styleString += this.getClassString(`chord`, displaySettings.chord);
    styleString += this.getClassString(`lyricText`, displaySettings.lyricText);
    styleString += this.getClassString(`songPart`, displaySettings.songPart);
    styleString += this.getClassString(`tab`, displaySettings.tab);

    styleString += '</style>';
    return styleString;
  }

  getClassString(className, displaySetting) {
    let cssString = `.${className}{`;
    cssString += `display:${displaySetting.visibility};`;
    cssString += `font-size:${displaySetting.fontSize };`;
    cssString += `font-weight:${displaySetting.fontWeight };`;
    cssString += `font-style:${displaySetting.fontStyle };`;
    if (displaySetting.textDecoration) {
      cssString += `text-decoration:${displaySetting.textDecoration };`;
    }
    if (displaySetting.fontColor) {
      cssString += `color:${displaySetting.fontColor };`;
    }
    if (displaySetting.fontBackgroundColor) {
      cssString += `background-color:${displaySetting.fontBackgroundColor};`;
    }
    if (displaySetting.fontName) {
      cssString += `font-family:${displaySetting.fontName };`;
    }
    cssString += `}`;
    return cssString;
  }

  //Gets the lyric line for song part such as Chorus, Version, ...
  getSongPartLyricLine(lyricLine: string, inHighlight: boolean) {
    lyricLine = lyricLine.trim();
    lyricLine = lyricLine.substring(1); //remove start
    lyricLine = lyricLine.slice(0, -1); //remove end
    const returnLine = '<span class="songPart">' + lyricLine + '</span>\n';
    return returnLine;
  }

}
