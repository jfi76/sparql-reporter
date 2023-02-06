import {  Sparql } from '@sparql-reporter/services';
import { Injectable } from '@angular/core';
import {
  Observable,
} from 'rxjs';
import { IQueryTableResult, IQueryField } from '@sparql-reporter/services';
import { OWLTHING } from '../../tree/feature/tree.service';

export enum IListMode {
  default = 'default',
  class = 'class',
  find = 'find',
}

@Injectable({
  providedIn: 'root',
})
export class ListService {
  limitRows = 50;
  defaultViewStmt = `select ?iri ?param ?label ?file 
            {
            bind(?param? as ?param)
            ?iri rdf:type ?param .
            optional{?iri rdfs:label ?label } .
            optional {?iri etl:hasSourceFile ?file} .  
            }  `;
  defaultQuery = (iri: string) =>
    `select ?hasDefaultQuery {${iri} report:hasDefaultQuery ?hasDefaultQuery. } `;

  constructor(public sparql: Sparql) {}
  prepareQuery(iri: string, mode: IListMode, stmt: string): string {
    if (mode === IListMode.default){      
      if (iri===OWLTHING) stmt = this.defaultViewStmt.replace('bind(?param? as ?param)', '');
      else stmt = this.defaultViewStmt.replace('?param?', iri);
    }
    if (mode === IListMode.class) {
      console.log(IListMode.class);
      stmt = stmt.replace('?param?', iri);
    }
    /*
    const lastIndex = stmt.lastIndexOf('}');
    stmt =
      stmt.substring(0, lastIndex + 1) +
      ` limit ${this.limitRows} ` +
      stmt.substring(lastIndex + 1, stmt.length);
      */
       
    return stmt+` limit ${this.limitRows} `;
  }
  runQuery(
    iri: string,
    mode: IListMode,
    stmt: string
  ): Observable<IQueryTableResult> {
    return this.sparql.queryResultTable(this.prepareQuery(iri, mode, stmt));
  }
  initView(
    iri: string,
    mode: IListMode,
    stmt: string
  ): Observable<IQueryTableResult> {
    console.log('mode:' + mode);
    return this.runQuery(iri, mode, stmt);
  }
  searchView(
    iri: string,
    mode?: IListMode,
    defaultClassQuery?: string,
    searchWord?: string
  ): Observable<IQueryTableResult> {
    const stmt = this.prepareQuery(
      iri,
      mode || IListMode.default,
      defaultClassQuery || ''
    );
    let newStmt = '';
    const lastIndex = stmt.lastIndexOf('}');
    const firstPart = stmt.substring(0, lastIndex);
    const secondPart = stmt.substring(lastIndex);

    newStmt = firstPart;
    let filterBind = '';
    const filterLabelBind = ` 
        optional {?iri rdfs:label ?searchLabel_xxx }.        
        `;
    const filterFileBind = ` 
        ?iri etl:hasSourceFile ?searchFile_xxx .                
        `;
    if (searchWord?.includes(':')) {
      newStmt =
        newStmt +
        `
        filter (?iri = ${searchWord})
        ` +
        secondPart;
    } else {
      if (stmt.includes('rdfs:label')) filterBind += filterLabelBind;
      if (stmt.includes('etl:hasSourceFile')) filterBind += filterFileBind;

      if (filterBind !== '') {
        newStmt =
          newStmt +
          `
        ` +
          filterBind +
          `
        bind ('${searchWord}' as ?searchWord_xxx) .
        filter (${
          stmt.includes('rdfs:label')
            ? `((coalesce(?searchWord_xxx,'')!='' &&  regex(?searchLabel_xxx, ?searchWord_xxx ,'i' )) || coalesce(?searchWord_xxx,'')='')`
            : ''
        } 
        ${
          stmt.includes('etl:hasSourceFile') && stmt.includes('rdfs:label')
            ? ' || '
            : ''
        }  
        ${
          stmt.includes('etl:hasSourceFile')
            ? `regex(?searchFile_xxx, ?searchWord_xxx ,'i' )`
            : ''
        } 
        )
        ` +
          secondPart;
      } else newStmt = newStmt + secondPart;
    }
    console.log(newStmt);
    return this.sparql.queryResultTable(newStmt);
  }
}
