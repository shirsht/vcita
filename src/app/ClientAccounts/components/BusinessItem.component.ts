import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BusinessAPIService } from '../services/BusinessesAPI.service';
import { Business } from 'src/app/Model/Business';
import { DialogService } from 'src/app/Common/Dialog/DialogService.service';

@Component({
    selector: '[app-business-item]',
    templateUrl: './BusinessItem.component.html',
  })
  export class BusinessItemComponent implements OnInit {

    @Input() business: Business;
    @Output() deleteEvent = new EventEmitter<number>();
    constructor(private businessService: BusinessAPIService, private dialogService: DialogService) {  }
    ngOnInit() {

    }
    remove(){
        this.businessService.removeBusinesses(this.business.uid).subscribe(res => {
            console.log(res);
            if (res !== null){ // operation failed
                return;
            }
            this.dialogService.openSnackbar(this.business.name + ' has been deleted');
            this.deleteEvent.emit(this.business.id);
        } );
    }
  }
