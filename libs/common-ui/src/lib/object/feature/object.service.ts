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
 referenceViewStmt = (iri: string): string => `select ?iri ?property ?label   
            {
            bind(${iri} as ?object) .
            ?iri ?property ?object .
            ?iri rdf:type ?class .
            optional {?iri rdfs:label ?label }
            }  `;

  constructor(public sparql: Sparql) {}
  queryObject(iri: string): Observable<IQueryTableResult> {
    return this.sparql.queryResultTable(this.defaultViewStmt(iri));
  }
  querySubjects(iri: string){
    return this.sparql.queryResultTable(this.referenceViewStmt(iri));
  }
}
