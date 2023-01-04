import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IQueryResult } from '@sparql-reporter/services';
import { Observable } from 'rxjs';
import { ListService } from './list.service';

@Component({
  selector: 'sparql-reporter-list',
  templateUrl: './list.html',
  styleUrls: ['./list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListComponent implements OnInit, OnChanges {
  @Input()
  treeId='';
  tableQueryResult = new Observable<IQueryResult>;

  constructor(private listService: ListService){

  }
  ngOnInit(): void {
      console.log('list inited');
  }
 ngOnChanges({treeId}: SimpleChanges): void {
     if (treeId){

      this.tableQueryResult=this.listService.initView(this.treeId);
      this.tableQueryResult.subscribe(data=>{console.log(data)});
     }
 }
  
}
