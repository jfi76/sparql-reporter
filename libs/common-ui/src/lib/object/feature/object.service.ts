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
export interface IBtnQuery {
  hasButtonQuery: string;
  btnLabel: string;
  query: string;
  isActive:BehaviorSubject<boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class ObjectService {
  limitRows = 50;
  defaultViewStmt = (iri: string): string => `select ?property ?value  ?label 
            {
            bind(${iri} as ?iri)
            ?iri ?property ?value .
            optional {?value rdfs:label ?label} .
            }  `;
 referenceViewStmt = (iri: string): string => `select ?iri ?property ?label   
            {
            bind(${iri} as ?object) .
            ?iri ?property ?object .
            # ?iri rdf:type ?class .
            optional {?iri rdfs:label ?label }
            }  `;
 btnQueryStmt=(iri: string): string => `select ?hasButtonQuery ?btnLabel ?query {
    ${iri} rdf:type ?iri .
    ?iri report:hasButtonQuery ?hasButtonQuery . 
    ?hasButtonQuery rdfs:label ?btnLabel .
    ?hasButtonQuery report:hasQuery ?query .
  }`;

  constructor(public sparql: Sparql) {}
  queryObject(iri: string): Observable<IQueryTableResult> {
    return this.sparql.queryResultTable(this.defaultViewStmt(iri));
  }
  querySubjects(iri: string):Observable<IQueryTableResult>{
    return this.sparql.queryResultTable(this.referenceViewStmt(iri));
  }
  queryBtns(iri: string):Observable<IBtnQuery[]>{
    return this.sparql.query(this.btnQueryStmt(iri)).pipe(
      map(response=>{
      const btnArr:IBtnQuery[]=[];
      response.results.forEach((record)=>{
        btnArr.push({
          isActive:new BehaviorSubject(false),
          query:record['query'].value,
          hasButtonQuery:record['hasButtonQuery'].value,
          btnLabel:record['btnLabel'].value,
        });
        
      });
      return btnArr;
    }));
  }
 dynamicBtnResult(iri: string,stmt:string):Observable<IQueryTableResult>{
  return this.sparql.queryResultTable(stmt.replace('?param?',iri));
} 

}
