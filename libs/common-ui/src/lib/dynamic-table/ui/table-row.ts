import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IQueryField } from '@sparql-reporter/services';

@Component({
  selector: 'sparql-reporter-dynamic-table-row',
  templateUrl: './table-row.html',
  styleUrls: ['./table-row.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TableRowComponent implements OnInit , OnChanges {
  @Input()
  rowData?:{[key:string]:IQueryField};
  ngOnInit(): void {
      console.log('inited');
  }
  ngOnChanges({rowData}: SimpleChanges): void {
      if (rowData){
        console.log(this.rowData);
      }
  }
}
