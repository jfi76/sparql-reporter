import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ExportStmtExcel, IQueryResult } from '@sparql-reporter/services';
import { IQueryTableResult } from '@sparql-reporter/services';

@Component({
  selector: 'sparql-reporter-dynamic-table',
  templateUrl: './dynamic-table.html',
  styleUrls: ['./dynamic-table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DynamicTableComponent implements OnInit, OnChanges  {
@Input()
queryResult?: IQueryTableResult;
@Output()
emitObjectIri$= new EventEmitter();
@Input()
activeId='';
activeIndex=-1;
currentStmt?:string;
  constructor(private exportStmtExcel:ExportStmtExcel){}
  ngOnInit(): void {
      console.log('inited');      
  }
  handleColumn(obj:{iri:string,index:number}){
    console.log('table levele object ' + obj.iri + ' activeIndex:' + this.activeIndex);

    this.activeIndex=obj.index;
    this.emitObjectIri$.emit(obj.iri);
  }
  ngOnChanges({activeId,queryResult}: SimpleChanges): void {
      if (activeId){
        console.log('table active: ' + this.activeId);
      }
      if (queryResult){
        this.currentStmt=this.queryResult?.stmt;
        this.activeIndex=-1;
      }
  }
  exportBtn(){
     this.exportStmtExcel.execute(this.currentStmt);
  }  
}
