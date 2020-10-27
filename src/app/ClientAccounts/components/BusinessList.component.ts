import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { BusinessAPIService } from '../services/BusinessesAPI.service';
import { Business } from 'src/app/Model/Business';
import { DEFAULT_LENGTH, DEFAULT_SORT_FIELD, DEFAULT_SORT_ORDER, SORT_VALUES } from '../../Common/enums';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Component({
    selector: 'app-business-list',
    templateUrl: './BusinessList.component.html',
  })
  export class BusinessListComponent implements OnInit {

    businesses: Business[];
    totalBusinesses: number;
    pageSize: number;
    pageNum: number;
    sortOrder: string;
    sortBy: string;
    pageSizeOptions: number[];
    sortOptions: any;
    searchStr: string;
    @ViewChild('searchField', { static: true }) searchField: ElementRef;
    constructor(private businessService: BusinessAPIService) {  }

    ngOnInit() {
        this.pageSizeOptions = [5, 10, 15, 20];
        this.pageSize = DEFAULT_LENGTH;
        this.pageNum = 1;
        this.sortOptions = SORT_VALUES;
        this.sortBy = DEFAULT_SORT_FIELD;
        this.sortOrder = DEFAULT_SORT_ORDER;
        this.searchStr = '';
        this.getBusinesses();
        // creating subscription for search event with debounce
        fromEvent(this.searchField.nativeElement, 'keyup').pipe(
            map((event: any) => {
              return event.target.value;
            }), debounceTime(1000)
            , distinctUntilChanged()).subscribe((text: string) => {
                this.getBusinesses();
          });
    }
    getBusinesses() {
        this.businessService.getBusinesses(this.pageNum, this.pageSize, this.sortBy, this.sortOrder, this.searchStr).subscribe(res => {
            console.log(res);
            if (res === null){
                this.totalBusinesses = -1; // don't want to display the message about having no accounts, as it's inaccurate
                return;
            }
            this.businesses = res.data.businesses;
            this.totalBusinesses = res.data.total;
        } );
    }
    // event handling functions
    onSortOrder(value: string) {
        this.sortOrder = value;
        this.getBusinesses();
    }
    onSort() {
        this.getBusinesses();
    }
    onDelete(id) {
        this.businesses = this.businesses.filter(business => business.id !== id);
    }
    onPageChange(pageEvent: PageEvent) {
        this.pageNum = pageEvent.pageIndex + 1;
        this.pageSize = pageEvent.pageSize;
        this.getBusinesses();
    }
  }
