import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AvatarModule } from 'ngx-avatar';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

import { BusinessListComponent } from '../app/ClientAccounts/components/BusinessList.component';
import { BusinessItemComponent } from '../app/ClientAccounts/components/BusinessItem.component';
import { NewBusinessComponent } from '../app/ClientAccounts/components/NewBusiness.component';
import {BusinessAPIService} from '../app/ClientAccounts/services/BusinessesAPI.service';

import {MenuComponent} from '../app/Menu/components/Menu.component';
import {HeaderComponent} from '../app/Menu/components/Header.component';

import {EmailPipe} from '../app/Common/Pipes/EmailPipe.pipe';
import { DialogService } from '../app/Common/Dialog/DialogService.service';
import { DialogComponent } from '../app/Common/Dialog/Dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    BusinessListComponent, BusinessItemComponent, NewBusinessComponent,
    MenuComponent, HeaderComponent,
    EmailPipe, DialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule, MatButtonModule, MatIconModule, MatMenuModule, MatPaginatorModule, MatTableModule, MatDialogModule, MatSnackBarModule,
    MatSelectModule, MatInputModule, MatAutocompleteModule,
    HttpClientModule,
    FlexLayoutModule,
    AvatarModule, NgxSpinnerModule,
  ],
  providers: [BusinessAPIService, FlexLayoutModule, DialogService, MatSnackBarModule, NgxSpinnerService,],
  entryComponents: [DialogComponent, BusinessListComponent, NewBusinessComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
