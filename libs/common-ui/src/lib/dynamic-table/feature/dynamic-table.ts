import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IQueryResult } from '@sparql-reporter/services';
import { IQueryTableResult } from '@sparql-reporter/services';

@Component({
  selector: 'sparql-reporter-dynamic-table',
  templateUrl: './dynamic-table.html',
  styleUrls: ['./dynamic-table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DynamicTableComponent implements OnInit  {
@Input()
queryResult?: IQueryTableResult;
@Output()
emitObjectIri$= new EventEmitter();
@Input()
activeId='';
  ngOnInit(): void {
      console.log('inited');      
  }
  handleColumn(iri:any){
    console.log('table levele object ' + iri);
    this.emitObjectIri$.emit(iri);
  }
  
}
