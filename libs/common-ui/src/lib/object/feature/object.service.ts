import { IQueryResult, Sparql } from '@sparql-reporter/services';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  take,
  throwError,
  map,
  tap,
} from 'rxjs';
import { IQueryTableResult, IQueryField } from '@sparql-reporter/services';

@Injectable({
  providedIn: 'root',
})
export class ObjectService {
  limitRows = 50;
  defaultViewStmt = (iri: string): string => `select ?property ?value  
            {
            bind(${iri} as ?iri)
            ?iri ?property ?value .
            }  `;

  constructor(public sparql: Sparql) {}
  queryObject(iri: string): Observable<IQueryTableResult> {
    return this.sparql.queryResultTable(this.defaultViewStmt(iri));
  }
}
