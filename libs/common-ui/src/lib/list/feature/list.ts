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
import { FormControl } from '@angular/forms';
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
  classButtonDisabled$=new Subject<boolean>;
  defaultClassQuery='';
  searchWord = new FormControl();
  constructor(private listService: ListService) {}
  ngOnInit(): void {
    console.log('list inited');
    this.classButtonDisabled$.next(true);
  }
  ngOnChanges({ treeId }: SimpleChanges): void {
    if (treeId) {
      this.listService.sparql
        .query(this.listService.defaultQuery(this.treeId))
        .subscribe((response) => {
          console.log('subscribe:' + response.results.length);
          this.mode = IListMode.default;
          this.defaultClassQuery=''
          this.classButtonDisabled$.next(true);          
          if (response.results.length === 0)
            this.listService
              .initView(this.treeId, this.mode, '')
              .subscribe((result) => {
                this.tableQueryResult.next(result);
              });
            else {
              this.classButtonDisabled$.next(false);              
              this.mode=IListMode.class;
              this.defaultClassQuery=response?.results[0]['hasDefaultQuery'].value;
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
  defaultBtn(){
    this.mode=IListMode.default;
    this.listService
    .initView(this.treeId, IListMode.default, '')
    .subscribe((result) => {
      this.tableQueryResult.next(result);
    });    
  }

  classBtn(){
    this.mode=IListMode.class;
    this.listService
    .initView(this.treeId, IListMode.class, this.defaultClassQuery)
    .subscribe((result) => {
      this.tableQueryResult.next(result);
    });
  }
 search() {
  this.listService
  .searchView(this.treeId, this.mode ,this.defaultClassQuery , this.searchWord.value)
  .subscribe((result) => {
    this.tableQueryResult.next(result);
  });  
 }
}
