import { IQueryResult, Sparql } from '@sparql-reporter/services';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, take, throwError, map, tap } from 'rxjs';
import { IQueryTableResult, IQueryField } from '@sparql-reporter/services';

  export enum IListMode{
  default= 'default', 
  class= 'default', 
  find='find'
  }

  @Injectable({
    providedIn: 'root',
  })

  export class ListService {
    limitRows = 50 ;
    defaultViewStmt=`select ?iri ?param ?label ?file 
            {
            bind(?param? as ?param)
            ?iri rdf:type ?param .
            ?iri rdfs:label ?label .
            ?iri etl:hasSourceFile ?file .  
            }  `;
    defaultQuery=(iri:string)=>`select ?hasDefaultQuery {${iri} report:hasDefaultQuery ?hasDefaultQuery. } `;
    
    constructor (public sparql: Sparql){
    }
    prepareQuery(iri:string, mode: IListMode,stmt:string):string{
        if (mode===IListMode.default)
        stmt = this.defaultViewStmt.replace('?param?',iri);
        if (mode===IListMode.class){
            stmt=stmt.replace('?param?',iri);
        }
        const lastIndex=stmt.lastIndexOf('}');
        stmt= stmt.substring(0,lastIndex+1) + ` limit ${this.limitRows} ` + stmt.substring(lastIndex+1,stmt.length);
        return stmt;
    }
    runQuery(iri:string, mode:IListMode,stmt:string): Observable<IQueryTableResult>{
        return this.sparql.queryResultTable(this.prepareQuery(iri, mode, stmt));
       // return this.queryView(this.prepareQuery(iri, mode, stmt));    
    }
    /*
    queryView(stmt: string): Observable<IQueryTableResult> {
        return this.sparql.queryResultTable(stmt);
      }*/    
    initView(iri:string, mode:IListMode,stmt:string){
        return this.runQuery(iri, mode, stmt);
    }
  }  