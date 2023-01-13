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
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IBtnQuery, ObjectService } from './feature/object.service';

@Component({
  selector: 'sparql-reporter-object',
  templateUrl: './object.html',
  styleUrls: ['./object.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjectComponent implements OnInit, OnChanges {
  @Input()
  objecId = '';
  tableQueryResult = new Subject<IQueryResult>();
  @Output()
  emitObjectIri$ = new EventEmitter();
  parentName = 'Object for';
  defaultName = 'Individual';
  isParentBtnActive$ = new BehaviorSubject<boolean>(false);
  isIndividualBtnActive$ = new BehaviorSubject<boolean>(true);
  dynamicButtons$ =new Subject<IQueryResult['results']>();
  // dynamicButtons$ =new Subject<IBtnQuery[]>();
  constructor(private objectService: ObjectService) {}
  ngOnInit(): void {
    console.log('inited');
  }

  ngOnChanges({ objecId }: SimpleChanges) {
    if (objecId) {
      this.defaultBtn();
       this.objectService.queryBtns(this.objecId).subscribe(response=>{
        // const ress:IBtnQuery[]=response.results; 
        this.dynamicButtons$.next(response.results);
       });
    }
  }
  handleObjectClick(iri: any) {
    this.emitObjectIri$.emit(iri);
  }

  clickBtn(name: string) {
    console.log(name);

    if (name === this.parentName) {
      this.parentBtn();
    }
    if (name === this.defaultName) {
      this.defaultBtn();
    }
  }

  defaultBtn() {
    this.isParentBtnActive$.next(false);
    this.isIndividualBtnActive$.next(true);

    this.objectService.queryObject(this.objecId).subscribe((result) => {
      this.tableQueryResult.next(result);
    });
  }

  parentBtn() {

  this.isIndividualBtnActive$.next(false);  
  this.isParentBtnActive$.next(true);


  this.objectService.querySubjects(this.objecId).subscribe((result) => {

    this.tableQueryResult.next(result);
  });
  }
}
