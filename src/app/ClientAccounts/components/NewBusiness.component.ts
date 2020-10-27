import {Component, OnInit, ViewChild} from '@angular/core';
import { Business } from '../../Model/Business';
import { BusinessAPIService } from '../services/BusinessesAPI.service';
import { NgForm, FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { DialogService } from 'src/app/Common/Dialog/DialogService.service';
import { isNullOrUndefined } from 'util';
import { PASS_LENGTH, COUNTRIES, EMAIL_PATTERN, MAX_TEXT_LENGTH } from '../../Common/enums';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
    selector: 'app-new-business-form',
    templateUrl: './NewBusiness.component.html'
  })
  export class NewBusinessComponent implements OnInit {
    @ViewChild('f', null) BusinessForm: NgForm;
    @ViewChild('country', null) country: FormControl;
    validationError: ValidationErrors;
    business: Business;
    passMinLength: number;
    countries: string[];
    filteredOptions: Observable<string[]>;
    emailPattern: string;
    maxLength: number;

    constructor(private businessService: BusinessAPIService, private dialogService: DialogService, private spinner: NgxSpinnerService) { }
    ngOnInit() {
        this.business =  {} as Business;
        this.passMinLength = PASS_LENGTH;
        this.countries = COUNTRIES;
        this.business.country = '';
        this.emailPattern = EMAIL_PATTERN;
        this.maxLength = MAX_TEXT_LENGTH;
        this.filteredOptions = this.country.valueChanges.pipe( // setting up autocomplete by country
            startWith(''),
            map(value => this._filter(value))
        );
    }
    validate() {
        return true;
    }
    onSubmit(form: NgForm) {
      this.BusinessForm.control.markAllAsTouched(); // in order to display mat-error on untouched fields
      this.BusinessForm.control.get('country').setValidators([this.validateCountry]); // running validation on the autocomplete
      this.BusinessForm.control.get('country').updateValueAndValidity();
      if (this.BusinessForm.valid === false) { return; }
      this.spinner.show();
      this.businessService.createBusiness(this.business).subscribe(res => {
        this.spinner.hide();
        console.log(res);
        if (isNullOrUndefined(res) === true || res.status !== 'OK') { // operation failed
            return;
        }
        this.dialogService.openSnackbar(this.business.name + ' has been added to your list');
        this.onClear();
    } );
    }
    onClear() {
      this.BusinessForm.reset();
      this.BusinessForm.resetForm();
    }
    private _filter(value: string): string[] {
        if (value === null) { return this.countries; }
        const filterValue = value.toLowerCase();
        return this.countries.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
      }
    validateCountry(c: FormControl) {
        const selection: any = c.value;
        if (isNullOrUndefined(selection) || selection.length === 0){
            return null;
        }
        if (!COUNTRIES.includes(selection)) {
            return { invalidCountry: true };
        }
        return null;
    }
  }
