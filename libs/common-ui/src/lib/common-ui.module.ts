import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './tree/feature/tree';
import { ListComponent } from './list/feature/list';
import { ObjectComponent } from './object/object';
import {HttpClientModule} from '@angular/common/http';
import { PushModule } from '@ngrx/component';

@NgModule({
  imports: [CommonModule,HttpClientModule, PushModule],
  declarations:[TreeComponent, ListComponent, ObjectComponent],
  exports: [TreeComponent, ListComponent, ObjectComponent]
})
export class CommonUiModule {}
