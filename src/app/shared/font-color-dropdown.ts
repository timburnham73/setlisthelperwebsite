import {Input, Output, Component, EventEmitter} from '@angular/core';

declare var jQuery:any;

export class FontColorValue {
  backgroundColor: string;
  foregroundcolor: string;

  constructor(backgroundColor: string, foregroundcolor:string) {
    this.backgroundColor = backgroundColor;
    this.foregroundcolor = foregroundcolor;
  }
}

@Component({
  selector: 'fontcolordropdown',
  template: `
      <div class="note-btn-group btn-group note-color">
                    <div class="note-btn-group btn-group note-color">
                      <button type="button" class="note-btn btn btn-default btn-sm note-current-color-button"
                              tabindex="-1" title="" data-original-title="Recent Color" data-backcolor="#FFFF00">
                        <i class="fa fa-font icon-font" [style.color]="selectedFontColorValue" [style.background-color]="selectedBackgroundColorValue" ></i>
                      </button>
                      <button type="button" class="note-btn btn btn-default btn-sm dropdown-toggle" tabindex="-1"
                              data-toggle="dropdown" title="" data-original-title="More Color">
                        <span class="caret"></span>
                      </button>
                      <div class="dropdown-menu">
                        <li>
                          <div class="btn-group">
                            <div class="note-palette-title">Background Color</div>
                            <div>
                              <button type="button" class="note-color-reset btn btn-default" data-event="backColor"
                                      data-value="inherit" (click)="setBackgroundColor('transparent')">Transparent
                              </button>
                            </div>
                            <div class="note-holder" data-event="backColor">
                              <div class="note-color-palette">
                                <div class="note-color-row">
                                  <button type="button" class="note-color-btn" style="background-color:#000000"
                                          data-event="backColor" data-value="#000000" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#000000')" data-original-title="#000000"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#424242"
                                          data-event="backColor" data-value="#424242" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#424242')" data-original-title="#424242"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#636363"
                                          data-event="backColor" data-value="#636363" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#636363')" data-original-title="#636363"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#9C9C94"
                                          data-event="backColor" data-value="#9C9C94" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#9C9C94')" data-original-title="#9C9C94"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#CEC6CE"
                                          data-event="backColor" data-value="#CEC6CE" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#CEC6CE')" data-original-title="#CEC6CE"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#EFEFEF"
                                          data-event="backColor" data-value="#EFEFEF" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#EFEFEF')" data-original-title="#EFEFEF"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#F7F7F7"
                                          data-event="backColor" data-value="#F7F7F7" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#F7F7F7')" data-original-title="#F7F7F7"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#FFFFFF"
                                          data-event="backColor" data-value="#FFFFFF" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#FFFFFF')" data-original-title="#FFFFFF"></button>
                                </div>
                                <div class="note-color-row">
                                  <button type="button" class="note-color-btn" style="background-color:#FF0000"
                                          data-event="backColor" data-value="#FF0000" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#FF0000')" data-original-title="#FF0000"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#FF9C00"
                                          data-event="backColor" data-value="#FF9C00" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#FF9C00')" data-original-title="#FF9C00"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#FFFF00"
                                          data-event="backColor" data-value="#FFFF00" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#FFFF00')" data-original-title="#FFFF00"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#00FF00"
                                          data-event="backColor" data-value="#00FF00" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#00FF00')" data-original-title="#00FF00"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#00FFFF"
                                          data-event="backColor" data-value="#00FFFF" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#00FFFF')" data-original-title="#00FFFF"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#0000FF"
                                          data-event="backColor" data-value="#0000FF" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#0000FF')" data-original-title="#0000FF"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#9C00FF"
                                          data-event="backColor" data-value="#9C00FF" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#9C00FF')" data-original-title="#9C00FF"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#FF00FF"
                                          data-event="backColor" data-value="#FF00FF" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#FF00FF')" data-original-title="#FF00FF"></button>
                                </div>
                                <div class="note-color-row">
                                  <button type="button" class="note-color-btn" style="background-color:#F7C6CE"
                                          data-event="backColor" data-value="#F7C6CE" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#F7C6CE')" data-original-title="#F7C6CE"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#FFE7CE"
                                          data-event="backColor" data-value="#FFE7CE" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#FFE7CE')" data-original-title="#FFE7CE"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#FFEFC6"
                                          data-event="backColor" data-value="#FFEFC6" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#FFEFC6')" data-original-title="#FFEFC6"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#D6EFD6"
                                          data-event="backColor" data-value="#D6EFD6" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#D6EFD6')" data-original-title="#D6EFD6"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#CEDEE7"
                                          data-event="backColor" data-value="#CEDEE7" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#CEDEE7')" data-original-title="#CEDEE7"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#CEE7F7"
                                          data-event="backColor" data-value="#CEE7F7" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#CEE7F7')" data-original-title="#CEE7F7"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#D6D6E7"
                                          data-event="backColor" data-value="#D6D6E7" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#D6D6E7')" data-original-title="#D6D6E7"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#E7D6DE"
                                          data-event="backColor" data-value="#E7D6DE" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#E7D6DE')" data-original-title="#E7D6DE"></button>
                                </div>
                                <div class="note-color-row">
                                  <button type="button" class="note-color-btn" style="background-color:#E79C9C"
                                          data-event="backColor" data-value="#E79C9C" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#E79C9C')" data-original-title="#E79C9C"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#FFC69C"
                                          data-event="backColor" data-value="#FFC69C" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#FFC69C')" data-original-title="#FFC69C"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#FFE79C"
                                          data-event="backColor" data-value="#FFE79C" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#FFE79C')" data-original-title="#FFE79C"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#B5D6A5"
                                          data-event="backColor" data-value="#B5D6A5" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#B5D6A5')" data-original-title="#B5D6A5"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#A5C6CE"
                                          data-event="backColor" data-value="#A5C6CE" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#A5C6CE')" data-original-title="#A5C6CE"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#9CC6EF"
                                          data-event="backColor" data-value="#9CC6EF" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#9CC6EF')" data-original-title="#9CC6EF"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#B5A5D6"
                                          data-event="backColor" data-value="#B5A5D6" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#B5A5D6')" data-original-title="#B5A5D6"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#D6A5BD"
                                          data-event="backColor" data-value="#D6A5BD" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#D6A5BD')" data-original-title="#D6A5BD"></button>
                                </div>
                                <div class="note-color-row">
                                  <button type="button" class="note-color-btn" style="background-color:#E76363"
                                          data-event="backColor" data-value="#E76363" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#E76363')" data-original-title="#E76363"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#F7AD6B"
                                          data-event="backColor" data-value="#F7AD6B" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#F7AD6B')" data-original-title="#F7AD6B"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#FFD663"
                                          data-event="backColor" data-value="#FFD663" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#FFD663')" data-original-title="#FFD663"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#94BD7B"
                                          data-event="backColor" data-value="#94BD7B" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#94BD7B')" data-original-title="#94BD7B"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#73A5AD"
                                          data-event="backColor" data-value="#73A5AD" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#73A5AD')" data-original-title="#73A5AD"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#6BADDE"
                                          data-event="backColor" data-value="#6BADDE" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#6BADDE')" data-original-title="#6BADDE"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#8C7BC6"
                                          data-event="backColor" data-value="#8C7BC6" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#8C7BC6')" data-original-title="#8C7BC6"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#C67BA5"
                                          data-event="backColor" data-value="#C67BA5" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#C67BA5')" data-original-title="#C67BA5"></button>
                                </div>
                                <div class="note-color-row">
                                  <button type="button" class="note-color-btn" style="background-color:#CE0000"
                                          data-event="backColor" data-value="#CE0000" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#CE0000')" data-original-title="#CE0000"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#E79439"
                                          data-event="backColor" data-value="#E79439" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#E79439')" data-original-title="#E79439"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#EFC631"
                                          data-event="backColor" data-value="#EFC631" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#000000')" data-original-title="#EFC631"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#6BA54A"
                                          data-event="backColor" data-value="#6BA54A" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#6BA54A')" data-original-title="#6BA54A"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#4A7B8C"
                                          data-event="backColor" data-value="#4A7B8C" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#4A7B8C')" data-original-title="#4A7B8C"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#3984C6"
                                          data-event="backColor" data-value="#3984C6" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#3984C6')" data-original-title="#3984C6"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#634AA5"
                                          data-event="backColor" data-value="#634AA5" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#634AA5')" data-original-title="#634AA5"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#A54A7B"
                                          data-event="backColor" data-value="#A54A7B" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#A54A7B')" data-original-title="#A54A7B"></button>
                                </div>
                                <div class="note-color-row">
                                  <button type="button" class="note-color-btn" style="background-color:#9C0000"
                                          data-event="backColor" data-value="#9C0000" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#9C0000')" data-original-title="#9C0000"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#B56308"
                                          data-event="backColor" data-value="#B56308" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#B56308')" data-original-title="#B56308"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#BD9400"
                                          data-event="backColor" data-value="#BD9400" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#BD9400')" data-original-title="#BD9400"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#397B21"
                                          data-event="backColor" data-value="#397B21" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#397B21')" data-original-title="#397B21"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#104A5A"
                                          data-event="backColor" data-value="#104A5A" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#104A5A')" data-original-title="#104A5A"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#085294"
                                          data-event="backColor" data-value="#085294" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#085294')" data-original-title="#085294"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#311873"
                                          data-event="backColor" data-value="#311873" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#311873')" data-original-title="#311873"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#731842"
                                          data-event="backColor" data-value="#731842" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#731842')" data-original-title="#731842"></button>
                                </div>
                                <div class="note-color-row">
                                  <button type="button" class="note-color-btn" style="background-color:#630000"
                                          data-event="backColor" data-value="#630000" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#630000')" data-original-title="#630000"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#7B3900"
                                          data-event="backColor" data-value="#7B3900" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#7B3900')" data-original-title="#7B3900"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#846300"
                                          data-event="backColor" data-value="#846300" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#846300')" data-original-title="#846300"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#295218"
                                          data-event="backColor" data-value="#295218" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#295218')" data-original-title="#295218"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#083139"
                                          data-event="backColor" data-value="#083139" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#083139')" data-original-title="#083139"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#003163"
                                          data-event="backColor" data-value="#003163" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#003163')" data-original-title="#003163"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#21104A"
                                          data-event="backColor" data-value="#21104A" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#21104A')" data-original-title="#21104A"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#4A1031"
                                          data-event="backColor" data-value="#4A1031" title="" data-toggle="button"
                                          tabindex="-1" (click)="setBackgroundColor('#4A1031')" data-original-title="#4A1031"></button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="btn-group">
                            <div class="note-palette-title">Font Color</div>
                            <div>
                              <button type="button" class="note-color-reset btn btn-default" data-event="removeFormat"
                                      data-value="foreColor" (click)="setFontColor('')">Reset to default
                              </button>
                            </div>
                            <div class="note-holder" data-event="foreColor">
                              <div class="note-color-palette">
                                <div class="note-color-row">
                                  <button type="button" class="note-color-btn" style="background-color:#000000"
                                          data-event="foreColor" data-value="#000000" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#000000')" data-original-title="#000000"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#424242"
                                          data-event="foreColor" data-value="#424242" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#424242')" data-original-title="#424242"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#636363"
                                          data-event="foreColor" data-value="#636363" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#636363')" data-original-title="#636363"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#9C9C94"
                                          data-event="foreColor" data-value="#9C9C94" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#9C9C94')" data-original-title="#9C9C94"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#CEC6CE"
                                          data-event="foreColor" data-value="#CEC6CE" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#CEC6CE')" data-original-title="#CEC6CE"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#EFEFEF"
                                          data-event="foreColor" data-value="#EFEFEF" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#EFEFEF')" data-original-title="#EFEFEF"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#F7F7F7"
                                          data-event="foreColor" data-value="#F7F7F7" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#F7F7F7')" data-original-title="#F7F7F7"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#FFFFFF"
                                          data-event="foreColor" data-value="#FFFFFF" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#FFFFFF')" data-original-title="#FFFFFF"></button>
                                </div>
                                <div class="note-color-row">
                                  <button type="button" class="note-color-btn" style="background-color:#FF0000"
                                          data-event="foreColor" data-value="#FF0000" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#FF0000')" data-original-title="#FF0000"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#FF9C00"
                                          data-event="foreColor" data-value="#FF9C00" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#FF9C00')" data-original-title="#FF9C00"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#FFFF00"
                                          data-event="foreColor" data-value="#FFFF00" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#FFFF00')" data-original-title="#FFFF00"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#00FF00"
                                          data-event="foreColor" data-value="#00FF00" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#00FF00')" data-original-title="#00FF00"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#00FFFF"
                                          data-event="foreColor" data-value="#00FFFF" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#00FFFF')" data-original-title="#00FFFF"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#0000FF"
                                          data-event="foreColor" data-value="#0000FF" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#0000FF')" data-original-title="#0000FF"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#9C00FF"
                                          data-event="foreColor" data-value="#9C00FF" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#9C00FF')" data-original-title="#9C00FF"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#FF00FF"
                                          data-event="foreColor" data-value="#FF00FF" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#FF00FF')" data-original-title="#FF00FF"></button>
                                </div>

                                <div class="note-color-row">
                                  <button type="button" class="note-color-btn" style="background-color:#F7C6CE"
                                          data-event="foreColor" data-value="#F7C6CE" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#F7C6CE')" data-original-title="#F7C6CE"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#FFE7CE"
                                          data-event="foreColor" data-value="#FFE7CE" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#FFE7CE')" data-original-title="#FFE7CE"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#FFEFC6"
                                          data-event="foreColor" data-value="#FFEFC6" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#FFEFC6')" data-original-title="#FFEFC6"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#D6EFD6"
                                          data-event="foreColor" data-value="#D6EFD6" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#D6EFD6')" data-original-title="#D6EFD6"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#CEDEE7"
                                          data-event="foreColor" data-value="#CEDEE7" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#CEDEE7')" data-original-title="#CEDEE7"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#CEE7F7"
                                          data-event="foreColor" data-value="#CEE7F7" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#CEE7F7')" data-original-title="#CEE7F7"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#D6D6E7"
                                          data-event="foreColor" data-value="#D6D6E7" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#D6D6E7')" data-original-title="#D6D6E7"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#E7D6DE"
                                          data-event="foreColor" data-value="#E7D6DE" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#E7D6DE')" data-original-title="#E7D6DE"></button>
                                </div>
                                <div class="note-color-row">
                                  <button type="button" class="note-color-btn" style="background-color:#E79C9C"
                                          data-event="foreColor" data-value="#E79C9C" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#E79C9C')" data-original-title="#E79C9C"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#FFC69C"
                                          data-event="foreColor" data-value="#FFC69C" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#FFC69C')" data-original-title="#FFC69C"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#FFE79C"
                                          data-event="foreColor" data-value="#FFE79C" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#FFE79C')" data-original-title="#FFE79C"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#B5D6A5"
                                          data-event="foreColor" data-value="#B5D6A5" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#B5D6A5')" data-original-title="#B5D6A5"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#A5C6CE"
                                          data-event="foreColor" data-value="#A5C6CE" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#A5C6CE')" data-original-title="#A5C6CE"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#9CC6EF"
                                          data-event="foreColor" data-value="#9CC6EF" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#9CC6EF')" data-original-title="#9CC6EF"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#B5A5D6"
                                          data-event="foreColor" data-value="#B5A5D6" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#B5A5D6')" data-original-title="#B5A5D6"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#D6A5BD"
                                          data-event="foreColor" data-value="#D6A5BD" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#D6A5BD')" data-original-title="#D6A5BD"></button>
                                </div>
                                <div class="note-color-row">
                                  <button type="button" class="note-color-btn" style="background-color:#E76363"
                                          data-event="foreColor" data-value="#E76363" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#E76363')" data-original-title="#E76363"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#F7AD6B"
                                          data-event="foreColor" data-value="#F7AD6B" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#F7AD6B')" data-original-title="#F7AD6B"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#FFD663"
                                          data-event="foreColor" data-value="#FFD663" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#FFD663')" data-original-title="#FFD663"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#94BD7B"
                                          data-event="foreColor" data-value="#94BD7B" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#94BD7B')" data-original-title="#94BD7B"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#73A5AD"
                                          data-event="foreColor" data-value="#73A5AD" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#73A5AD')" data-original-title="#73A5AD"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#6BADDE"
                                          data-event="foreColor" data-value="#6BADDE" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#6BADDE')" data-original-title="#6BADDE"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#8C7BC6"
                                          data-event="foreColor" data-value="#8C7BC6" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#8C7BC6')" data-original-title="#8C7BC6"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#C67BA5"
                                          data-event="foreColor" data-value="#C67BA5" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#C67BA5')" data-original-title="#C67BA5"></button>
                                </div>
                                <div class="note-color-row">
                                  <button type="button" class="note-color-btn" style="background-color:#CE0000"
                                          data-event="foreColor" data-value="#CE0000" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#CE0000')" data-original-title="#CE0000"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#E79439"
                                          data-event="foreColor" data-value="#E79439" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#E79439')" data-original-title="#E79439"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#EFC631"
                                          data-event="foreColor" data-value="#EFC631" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#EFC631')" data-original-title="#EFC631"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#6BA54A"
                                          data-event="foreColor" data-value="#6BA54A" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#6BA54A')" data-original-title="#6BA54A"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#4A7B8C"
                                          data-event="foreColor" data-value="#4A7B8C" title="" data-toggle="button"
                                          tabindex="-1" data-original-title="#4A7B8C"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#3984C6"
                                          data-event="foreColor" data-value="#3984C6" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#3984C6')" data-original-title="#3984C6"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#634AA5"
                                          data-event="foreColor" data-value="#634AA5" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#634AA5')" data-original-title="#634AA5"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#A54A7B"
                                          data-event="foreColor" data-value="#A54A7B" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#A54A7B')" data-original-title="#A54A7B"></button>
                                </div>
                                <div class="note-color-row">
                                  <button type="button" class="note-color-btn" style="background-color:#9C0000"
                                          data-event="foreColor" data-value="#9C0000" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#9C0000')" data-original-title="#9C0000"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#B56308"
                                          data-event="foreColor" data-value="#B56308" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#B56308')" data-original-title="#B56308"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#BD9400"
                                          data-event="foreColor" data-value="#BD9400" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#BD9400')" data-original-title="#BD9400"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#397B21"
                                          data-event="foreColor" data-value="#397B21" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#397B21')" data-original-title="#397B21"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#104A5A"
                                          data-event="foreColor" data-value="#104A5A" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#104A5A')" data-original-title="#104A5A"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#085294"
                                          data-event="foreColor" data-value="#085294" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#085294')" data-original-title="#085294"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#311873"
                                          data-event="foreColor" data-value="#311873" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#311873')" data-original-title="#311873"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#731842"
                                          data-event="foreColor" data-value="#731842" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#731842')" data-original-title="#731842"></button>
                                </div>
                                <div class="note-color-row">
                                  <button type="button" class="note-color-btn" style="background-color:#630000"
                                          data-event="foreColor" data-value="#630000" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#630000')" data-original-title="#630000"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#7B3900"
                                          data-event="foreColor" data-value="#7B3900" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#7B3900')" data-original-title="#7B3900"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#846300"
                                          data-event="foreColor" data-value="#846300" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#846300')" data-original-title="#846300"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#295218"
                                          data-event="foreColor" data-value="#295218" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#295218')" data-original-title="#295218"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#083139"
                                          data-event="foreColor" data-value="#083139" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#083139')" data-original-title="#083139"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#003163"
                                          data-event="foreColor" data-value="#003163" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#003163')" data-original-title="#003163"></button>

                                  <button type="button" class="note-color-btn" style="background-color:#21104A"
                                          data-event="foreColor" data-value="#21104A" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#21104A')" data-original-title="#21104A"></button>
                                  <button type="button" class="note-color-btn" style="background-color:#4A1031"
                                          data-event="foreColor" data-value="#4A1031" title="" data-toggle="button"
                                          tabindex="-1" (click)="setFontColor('#4A1031')" data-original-title="#4A1031"></button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </div>
                    </div>
                  </div>
  `
})
export class FontColorDropdownComponent {

  @Input()
  selectedBackgroundColorValue: string;

  @Input()
  selectedFontColorValue: string;

  @Output()
  selectFontColor: EventEmitter<any> = new EventEmitter();

  @Output()
  selectFontBackgroundColor: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.selectFontColor = new EventEmitter();
    this.selectFontBackgroundColor = new EventEmitter();

  }

  setFontColor(fontColorValue) {
    this.selectedFontColorValue = fontColorValue;
    this.selectFontColor.emit(fontColorValue);
  }

  setBackgroundColor(fontBackgroundColorValue) {
    this.selectedBackgroundColorValue = fontBackgroundColorValue;
    this.selectFontBackgroundColor.emit(fontBackgroundColorValue);
  }
}
