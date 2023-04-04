import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './feature/app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularSplitModule } from 'angular-split';
import {ExplorerComponent} from './ui/explorer'
import { AppRoutingModule } from './feature/app-routering.module';
import { HeaderComponent } from './ui/header';
import { ConnectionComponent } from './ui/connection';
import {CommonUiModule} from '@sparql-reporter/common-ui';
import { PushModule } from '@ngrx/component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
@NgModule({
  declarations: [AppComponent,  ExplorerComponent, HeaderComponent, ConnectionComponent],
  imports: [BrowserModule, NgbModule, AngularSplitModule,AppRoutingModule, CommonUiModule,  PushModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],

})

export class AppModule {


}
