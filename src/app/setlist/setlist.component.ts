import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {SetlistEditComponent} from '../setlist-edit/setlist-edit.component';
import {Setlist} from '../shared/model/setlist';
import {SetlistService} from '../shared/services/setlist.service';
declare var _:any;

@Component({
  selector: 'app-setlist',
  templateUrl: 'setlist.component.html',
  styleUrls: ['setlist.component.less']
})
export class SetlistComponent implements OnInit {
  @ViewChild('setlistEdit') setlistEdit: SetlistEditComponent;
  setlists: Setlist[];
  constructor(private router: Router,
              private route: ActivatedRoute,
              private setlistService: SetlistService
  ) {

  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.setlistService.findAllSetlists()
        .map(setlists => _.sortBy(setlists, (setlist) => setlist.createDate).reverse())
        .subscribe(setlists => this.setlists = setlists);
    });
  }

  addNew() {
    this.setlistEdit.open(new Setlist(-1, '', '', new Date().toString(), new Date().toString()));
  }

  onRowClick(setlist) {
    this.router.navigate(['/setlists/setlist', setlist.SetListId]);
  }

  onEdit(setlist) {
    this.setlistEdit.open(setlist);
  }

  deleteSetlist(setlist: Setlist) {
    this.setlistService.deleteSetlist(setlist);
  }

  duplicateSetlist(setlist: Setlist) {
    this.setlistService.duplicateSetlist(setlist);
  }
}
