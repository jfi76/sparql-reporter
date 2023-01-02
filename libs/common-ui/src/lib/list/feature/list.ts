import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'sparql-reporter-list',
  templateUrl: './list.html',
  styleUrls: ['./list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListComponent implements OnInit, OnChanges {
  @Input()
  treeId=''
  ngOnInit(): void {
      console.log('list inited');
  }
 ngOnChanges({treeId}: SimpleChanges): void {
     if (treeId){
      console.log('list id : '+treeId.currentValue);
     }
 }
  
}
