import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {SetlistEditComponent} from '../setlist-edit/setlist-edit.component';
import {Setlist} from '../shared/model/setlist';
import {SetlistService} from '../shared/services/setlist.service';
import {Song} from '../shared/model/song';
declare var _:any;

@Component({
  selector: 'app-setlist',
  templateUrl: 'setlist.component.html',
  styleUrls: ['setlist.component.less']
})
export class SetlistComponent implements OnInit {
  @ViewChild('setlistEdit') setlistEdit: SetlistEditComponent;
  setlists: Setlist[];
  setlistForEdit: Setlist;
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

  onSetlistEditClose(updatedSetlist) {
    if (this.setlistForEdit != null) {
      Object.keys(updatedSetlist).map(((setlistAttribute, idx) => {
        this.setlistForEdit[setlistAttribute] = updatedSetlist[setlistAttribute];
      }), this);
    } else {
      // Adding a new song
      const newSetlist: Setlist = Setlist.createNewSetlist();
      Object.keys(updatedSetlist).map(((songAttribute, idx) => {
        newSetlist[songAttribute] = updatedSetlist[songAttribute];
      }), this);
      this.setlists.unshift(newSetlist);
    }
  }

  addNew() {
    this.setlistEdit.open(Setlist.createNewSetlist());
  }

  onRowClick(setlist) {
    this.router.navigate(['/setlists/setlist', setlist.SetListId]);
  }

  onEdit(setlist) {
    this.setlistForEdit = setlist;
    this.setlistEdit.open(setlist);
  }

  deleteSetlist(setlist: Setlist) {
    this.setlistService.deleteSetlist(setlist);
  }

  duplicateSetlist(setlist: Setlist) {
    this.setlistService.duplicateSetlist(setlist);
  }
}
