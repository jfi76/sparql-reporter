import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Sparql {
  queryUrl='http://localhost:3030/migr_mssql_pqsql/sparql';
  updateUrl='localhost:3030/migr_mssql_pqsql/update';
  headers={'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'};
  prefix=`PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX mig: <http://example.org/MIGRATION#>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX js: <http://www.example.com/JSON#>
  PREFIX etl:<http://www.example.com/ETL#>
  
  `;
  prefixReplace=[
    {str:'http://www.w3.org/1999/02/22-rdf-syntax-ns#', replace:'rdf'},
    {str:'http://www.w3.org/2000/01/rdf-schema#', replcase:'rdfs'},
    {str:'http://example.org/MIGRATION#', replcase:'mig'},
    {str:'http://www.w3.org/2002/07/owl#', replcase:'owl'},
    {str:'http://www.example.com/JSON#', replcase:'js'},
    {str:'http://www.example.com/ETL#', replcase:'etl'},
]
  constructor(private http: HttpClient){

  }
  query(stmt:string, infer=''){
    const initStmt=stmt;
    return this.http.post(this.queryUrl,`query=${encodeURIComponent(this.prefix + stmt)}${infer!=='' ? '&infer='+infer: '' }`,{headers:this.headers}).pipe(
        catchError((err:ErrorEvent)=>{
            console.log(initStmt);
            console.log(err);
            return throwError(err);
        })
    );            
  }

}