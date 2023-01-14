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

export interface IBreadCrumb {
  iri: string;
  label?: string;
}

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
  @Input()
  renewBreadcrumbs? = false;
  breadCrumbs: IBreadCrumb[] = [];
  breadCrumbs$ = new Subject<IBreadCrumb[]>();
  parentName = 'Object for';
  defaultName = 'Individual';
  isParentBtnActive$ = new BehaviorSubject<boolean>(false);
  isIndividualBtnActive$ = new BehaviorSubject<boolean>(true);
  dynamicButtons$ = new Subject<IBtnQuery[]>();
  dynamicButtons: IBtnQuery[] = [];
  dynamicButtonsActive$ = new Subject<{ [key: string]: boolean }>();

  constructor(private objectService: ObjectService) {}
  ngOnInit(): void {
    console.log('inited');
  }

  ngOnChanges({ objecId, renewBreadcrumbs }: SimpleChanges) {
    if (objecId) {
      this.isParentBtnActive$.next(false);
      this.handleDynamicButtons('');
      this.isIndividualBtnActive$.next(true);
      this.objectService.queryObject(this.objecId).subscribe((result) => {
        const newBrc: IBreadCrumb[] = [];
        let label = '';

        if (result.results.length > 0) {
          result.results.forEach((row, index) => {
            if (row[0].value === 'label') label = row[1].value;
          });
        }

        if (this.renewBreadcrumbs) {
          this.breadCrumbs = [{ iri: this.objecId, label: label }];
          this.breadCrumbs$.next(this.breadCrumbs);
        } else {
          let stopBrc = false;
          this.breadCrumbs.forEach((obj) => {
            if (!stopBrc) newBrc.push(obj);            
            if (obj.iri === this.objecId) {
              stopBrc = true;
              return;
            }

          });
          if (!stopBrc) {
            this.breadCrumbs.push({ iri: this.objecId, label: label });
            this.breadCrumbs$.next(this.breadCrumbs);
          } else {
            this.breadCrumbs = [...newBrc];
            this.breadCrumbs$.next(this.breadCrumbs);
          }
        }
        this.tableQueryResult.next(result);
      });

      this.objectService.queryBtns(this.objecId).subscribe((response) => {
        this.dynamicButtons = response;
        this.dynamicButtons$.next(response);
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
      return;
    }
    if (name === this.defaultName) {
      this.defaultBtn();
      return;
    }
    this.handleDynamicButtons(name);
  }

  handleDynamicButtons(activeName: string) {
    this.dynamicButtons.forEach((btn) => btn.isActive.next(false));
    this.isParentBtnActive$.next(false);
    this.isIndividualBtnActive$.next(false);

    this.dynamicButtons.forEach((btn) => {
      if (activeName === btn.btnLabel) {
        btn.isActive.next(true);
        this.objectService
          .dynamicBtnResult(this.objecId, btn.query)
          .subscribe((response) => {
            this.tableQueryResult.next(response);
          });
      }
    });
  }

  defaultBtn() {
    this.isParentBtnActive$.next(false);
    this.handleDynamicButtons('');
    this.isIndividualBtnActive$.next(true);
    this.objectService.queryObject(this.objecId).subscribe((result) => {
      this.tableQueryResult.next(result);
    });
  }

  parentBtn() {
    this.handleDynamicButtons('');
    this.isIndividualBtnActive$.next(false);
    this.isParentBtnActive$.next(true);

    this.objectService.querySubjects(this.objecId).subscribe((result) => {
      this.tableQueryResult.next(result);
    });
  }
}
