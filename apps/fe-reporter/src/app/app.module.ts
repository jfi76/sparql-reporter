import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularSplitModule } from 'angular-split';
import {ExplorerComponent} from './ui/explorer'
import { AppRoutingModule } from './feature/app-routering.module';
import { HeaderComponent } from './ui/header';
import { ConnectionComponent } from './ui/connection';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, ExplorerComponent, HeaderComponent, ConnectionComponent],
  imports: [BrowserModule, NgbModule, AngularSplitModule,AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
  exports:[NxWelcomeComponent]
})
export class AppModule {


}
