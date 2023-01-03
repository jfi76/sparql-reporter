import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './tree/feature/tree';
import { ListComponent } from './list/feature/list';
import { ObjectComponent } from './object/object';
import {HttpClientModule} from '@angular/common/http';
import { PushModule } from '@ngrx/component';
import { TreeNodeComponent } from './tree/ui/treeNode';
import { DynamicTableComponent } from './dynamic-table/feature/dynamic-table';
import { TableRowComponent } from './dynamic-table/ui/table-row';

@NgModule({
  imports: [CommonModule,HttpClientModule, PushModule],
  declarations:[TreeComponent, ListComponent, ObjectComponent, TreeNodeComponent, DynamicTableComponent, TableRowComponent],
  exports: [TreeComponent, ListComponent, ObjectComponent]
})
export class CommonUiModule {}
