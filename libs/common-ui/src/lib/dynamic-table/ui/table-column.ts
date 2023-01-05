import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
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
  ngOnInit(): void {
      console.log('inited');
  }
  ngOnChanges({colData}: SimpleChanges): void {
      if (colData){
        // console.log(this.colData);
      }
  }
  handleClick(iri?:string){
    this.emitIri$.emit(iri);
  }
}
