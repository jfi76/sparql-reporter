import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { IQueryField } from '@sparql-reporter/services';


@Component({
  selector: 'sparql-reporter-copy-value',
  templateUrl: './copy-value.html',
  styleUrls: ['./copy-value.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CopyValueComponent implements OnInit , OnChanges {
  @Input()
  data?:string;
  ngOnInit(): void {
      console.log('inited');
  }
  ngOnChanges({data}: SimpleChanges): void {
      if (data){
        // console.log(this.colData);
      }
  }
  copyBuffer(event:any){
   console.log(event); 
  }
}
