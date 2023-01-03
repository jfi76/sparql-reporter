import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IQueryResult } from '@sparql-reporter/services';

@Component({
  selector: 'sparql-reporter-dynamic-table',
  templateUrl: './dynamic-table.html',
  styleUrls: ['./dynamic-table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DynamicTableComponent implements OnInit  {
@Input()
queryResult?: IQueryResult;

  ngOnInit(): void {
      console.log('inited');
      

  }
  
  
}
