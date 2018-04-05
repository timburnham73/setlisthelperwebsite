
import {Pipe} from "@angular/core";

@Pipe({
  name: 'secondsToMinutes'
})
export class secondsToMinutesPipe{


  transform(totalSeconds){
    let time_string: string = '';
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return this.pad(minutes,2) + ':' + this.pad(seconds, 2) ;
  }

  pad(num, size) {
    var s = num+"";
    while (s.length < size){
      s = "0" + s;
    }
    return s;
  }
}