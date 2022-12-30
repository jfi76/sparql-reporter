import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
// import { Sparql } from './sparql/sparql';
@NgModule({
  imports: [CommonModule, HttpClientModule],
  // providers:[Sparql]
})
export class ServicesModule {}
