import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './tree/feature/tree';

@NgModule({
  imports: [CommonModule],
  declarations:[TreeComponent],
  exports: [TreeComponent]
})
export class CommonUiModule {}
