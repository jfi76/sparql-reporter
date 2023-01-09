import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter, HostBinding } from '@angular/core';
import { IQueryField } from '@sparql-reporter/services';


@Component({
  selector: 'sparql-reporter-dynamic-table-column',
  templateUrl: './table-column.html',
  styleUrls: ['./table-column.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TableColumnComponent implements  OnChanges {
  @Input()
  colData?:IQueryField;
  
  @Output()
  emitIri$= new EventEmitter();
  
  @Input()
  activeId='';

  @HostBinding('class.isActive')
  isActive=false;

  @Input()
  index=-1;

  ngOnChanges({colData,activeId}: SimpleChanges): void {
      if (activeId){        
        if (this.colData?.value===this.activeId) {
          console.log('isActive' + this.colData?.value + ' ' + this.activeId);
          this.isActive=true;
        }                  
        else {this.isActive=false;}
      }
  }
  handleClick(iri?:string){
    this.emitIri$.emit({iri:iri,index:this.index});    
  }
  copyBuffer(text?:string){
    if (!navigator.clipboard) {
      return;
    }
    navigator.clipboard.writeText(text || '').catch((err)=>{
      console.error('Async: Could not copy text: ', err);
    });    
  }
}
