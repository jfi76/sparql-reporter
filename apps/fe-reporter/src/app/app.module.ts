import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './feature/app.component';
import { NxWelcomeComponent } from './trash/nx-welcome.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularSplitModule } from 'angular-split';
import {ExplorerComponent} from './ui/explorer'
import { AppRoutingModule } from './feature/app-routering.module';
import { HeaderComponent } from './ui/header';
import { ConnectionComponent } from './ui/connection';
import {CommonUiModule} from '@sparql-reporter/common-ui';
@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, ExplorerComponent, HeaderComponent, ConnectionComponent],
  imports: [BrowserModule, NgbModule, AngularSplitModule,AppRoutingModule, CommonUiModule],
  providers: [],
  bootstrap: [AppComponent],
  exports:[NxWelcomeComponent]
})

export class AppModule {


}
