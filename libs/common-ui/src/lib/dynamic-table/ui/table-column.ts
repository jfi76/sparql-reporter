import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter, HostBinding } from '@angular/core';
import { IQueryField } from '@sparql-reporter/services';


@Component({
  selector: 'sparql-reporter-dynamic-table-column',
  templateUrl: './table-column.html',
  styleUrls: ['./table-column.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TableColumnComponent implements OnInit , OnChanges {
  @Input()
  colData?:IQueryField;
  @Output()
  emitIri$= new EventEmitter();
  @Input()
  activeId='';
  @HostBinding('class.isActive')
  isActive=false;
  ngOnInit(): void {
      console.log('inited');
  }
  ngOnChanges({colData}: SimpleChanges): void {
      if (colData){        
        console.log('test' + this.colData?.value + ' vs ' + this.activeId);
        if (this.colData?.value===this.activeId) {
          console.log('isActive' + this.colData?.value + ' ' + this.activeId);
          this.isActive=true;
        }                  
      }
  }
  handleClick(iri?:string){
    this.emitIri$.emit(iri);
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
