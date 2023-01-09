import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IQueryResult } from '@sparql-reporter/services';
import { result } from 'lodash';
import { Observable, Subject, tap } from 'rxjs';
import { IListMode, ListService } from './list.service';

@Component({
  selector: 'sparql-reporter-list',
  templateUrl: './list.html',
  styleUrls: ['./list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit, OnChanges {
  @Input()
  treeId = '';
  @Input()
  listId = '';

  tableQueryResult = new Subject<IQueryResult>();
  @Output()
  emitObjectIri$ = new EventEmitter();
  mode?: IListMode;
  constructor(private listService: ListService) {}
  ngOnInit(): void {
    console.log('list inited');
  }
  ngOnChanges({ treeId }: SimpleChanges): void {
    if (treeId) {
      this.listService.sparql
        .query(this.listService.defaultQuery(this.treeId))
        .subscribe((response) => {
          console.log('subscribe:' + response.results.length);
          this.mode = IListMode.default;
          if (response.results.length === 0)
            this.listService
              .initView(this.treeId, this.mode, '')
              .subscribe((result) => {
                this.tableQueryResult.next(result);
              });
            else {
              this.mode=IListMode.class;
              this.listService
              .initView(this.treeId, this.mode, response?.results[0]['hasDefaultQuery'].value)
              .subscribe((result) => {
                this.tableQueryResult.next(result);
              });

            }  
          /*
        if (response.results.length>0) {
          this.mode=IListMode.class;
          this.tableQueryResult=this.listService.initView(this.treeId, this.mode, response?.results[0]['hasDefaultQuery'].value);     
        }            
        else {
          this.mode=IListMode.default;
          this.tableQueryResult=this.listService.initView(this.treeId, this.mode, '');          
        }                                      */
        });
    }
  }
  handleObjectClick(iri: any) {
    console.log('list level obj ' + iri);
    this.emitObjectIri$.emit(iri);
  }
}
