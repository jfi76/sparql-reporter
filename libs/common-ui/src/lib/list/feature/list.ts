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
import { Observable, Subject, tap, BehaviorSubject } from 'rxjs';
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
  // defaulltButtonActive$=new Subject<boolean>;
  defaultClassQuery='';
  searchWord = new FormControl();
  isClassBtnActive$ = new BehaviorSubject<boolean>(false);
  isClassBtnDisabled$ = new BehaviorSubject<boolean>(true);
  defaultName = 'Default View';
  className = 'Class View';
  constructor(private listService: ListService) {}
  ngOnInit(): void {
    // this.defaulltButtonActive$.next(true);
    console.log('init list');
  }
  ngOnChanges({ treeId }: SimpleChanges): void {
    if (treeId) {
      this.listService.sparql
        .query(this.listService.defaultQuery(this.treeId))
        .subscribe((response) => {
          console.log('subscribe:' + response.results.length);
          this.mode = IListMode.default;    
          this.isClassBtnActive$.next(false);      
          this.isClassBtnDisabled$.next(true);
          this.defaultClassQuery=''
       //   this.defaulltButtonActive$.next(true);          
          if (response.results.length === 0)
            this.listService
              .initView(this.treeId, this.mode, '')
              .subscribe((result) => {
                this.tableQueryResult.next(result);
              });
            else {
         //     this.defaulltButtonActive$.next(false);              
              this.mode=IListMode.class;
              this.isClassBtnActive$.next(true);
              this.isClassBtnDisabled$.next(false);
              this.defaultClassQuery=response?.results[0]['hasDefaultQuery'].value;
              this.listService
              .initView(this.treeId, this.mode, response?.results[0]['hasDefaultQuery'].value)
              .subscribe((result) => {
                this.tableQueryResult.next(result);
              });

            }  
        });
    }
  }
  handleObjectClick(iri: any) {
    console.log('list level obj ' + iri);
    this.emitObjectIri$.emit(iri);
  }
  defaultBtn(){
    this.mode=IListMode.default;
    this.isClassBtnActive$.next(false);
    this.listService
    .initView(this.treeId, IListMode.default, '')
    .subscribe((result) => {
      this.tableQueryResult.next(result);
    });    
  }

  classBtn(){
    this.mode=IListMode.class;
    this.isClassBtnActive$.next(true);
    this.listService
    .initView(this.treeId, IListMode.class, this.defaultClassQuery)
    .subscribe((result) => {
      this.tableQueryResult.next(result);
    });
  }
  clickBtn(name:string){
    
    if (name===this.className){
      this.classBtn();
    }
    if (name===this.defaultName){
      this.defaultBtn();
    }

  } 
 search() {
  this.listService
  .searchView(this.treeId, this.mode ,this.defaultClassQuery , this.searchWord.value)
  .subscribe((result) => {
    this.tableQueryResult.next(result);
  });  
 }
}
