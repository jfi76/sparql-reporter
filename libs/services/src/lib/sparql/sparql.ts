import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map,  Observable,  take,  throwError } from 'rxjs';
import { IQueryField } from './interfaces';

export interface IQueryResult{
    head:{vars:any[]},
    results:{[key:string]:IQueryField}[],
    stmt?:string,
    start?:Date,
    end?:Date,
}
export interface IQueryTableResult{
    head:{vars:any[]},
    results:any[],
    stmt?:string,
    start?:Date,
    end?:Date,

}

@Injectable({
  providedIn: 'root',
})
export class Sparql {
  dbName= localStorage.getItem("dataset") && localStorage.getItem("dataset")!==null && localStorage.getItem("dataset")!=='' ? localStorage.getItem("dataset") : 'migration_rdf'; 
  serveUrl= localStorage.getItem("serveUrl")!==null && localStorage.getItem("serveUrl") && localStorage.getItem("serveUrl")!=='' ? localStorage.getItem("serveUrl") : 'http://localhost:3030'; 
  queryUrl=`${this.serveUrl}/${this.dbName}/sparql`;
  updateUrl=`${this.serveUrl}/${this.dbName}/update`;
  headers={'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'};
  prefix=`PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX mig: <http://www.example.com/MIGRATION#>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX js: <http://www.example.com/JSON#>
  PREFIX etl:<http://www.example.com/ETL#>
  PREFIX report:<http://www.example.com/report#>
  PREFIX  etl_at: <http://www.example.com/JSON#@>
  PREFIX  js_at: <http://www.example.com/JSON#@>
  PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
  `;
  prefixReplace=[
    {str:'http://www.w3.org/1999/02/22-rdf-syntax-ns#', replace:'rdf:'},
    {str:'http://www.w3.org/2000/01/rdf-schema#', replace:'rdfs:'},
    {str:'http://www.example.com/MIGRATION#', replace:'mig:'},
    {str:'http://www.w3.org/2002/07/owl#', replace:'owl:'},
    {str:'http://www.example.com/JSON#', replace:'js:'},
    {str:'http://www.example.com/ETL#', replace:'etl:'},
    {str:'http://www.example.com/report#', replace:'report:'},    
    {str:'http://www.example.com/JSON#@', replace:'etl_at:'},    
    {str:'http://www.example.com/JSON#@', replace:'js_at:'},        
    {str:'http://www.w3.org/2001/XMLSchema#', replace:'xsd:'},            
]
  constructor(private http: HttpClient){

  }
  query(stmt:string, infer=''):Observable<IQueryResult>{
    return this.http.post(this.queryUrl,`query=${encodeURIComponent(this.prefix + stmt)}${infer!=='' ? '&infer='+infer: '' }`,{headers:this.headers}).pipe(
        take(1),        
        map((response:any)=>{
            response.results=response.results.bindings;
            // console.log(response);
            response.results.stmt=stmt;
            this.replacePrefixes(response.results);
            response.stmt=stmt;
            return response;
        }),
        catchError((err:ErrorEvent)=>{
            console.log(stmt);
            console.log(err);
            return throwError(err);
        })               
    );            
  }

queryResultTable(stmt:string, infer=''):Observable<IQueryTableResult>{
    return this.query(stmt, infer).pipe(
        map(response=>{
            response.results=this.makeTable(response.results, response.head);
            return response;
        })
    );
}
makeTable(resultInit:IQueryResult['results'],head:IQueryResult['head']):IQueryTableResult['results']{

    const result:IQueryTableResult['results']=[];


    for (let i=0; i< resultInit.length; i++){
        result[i]=[];
        head?.vars.forEach((name,index)=>{    
            result[i].push(JSON.parse(JSON?.stringify( resultInit[i][name] ? resultInit[i][name] : '' )));
        });
    }

    return result;
}

replacePrefixes(result:IQueryResult['results']):IQueryResult['results']{    
    for (let i=0; i< result.length; i++){
        for(const name in result[i]){
            if (result[i][name].type==='uri'){
                let foundPrefix=false;
                for (let a=0; a<this.prefixReplace.length; a++){
                    if (result[i][name].value.startsWith(this.prefixReplace[a].str) 
                    && !result[i][name].value.includes('/',this.prefixReplace[a].str.length) 
                    && !result[i][name].value.includes('#',this.prefixReplace[a].str.length) 
                    ){

                        result[i][name].value=result[i][name].value.replace(this.prefixReplace[a].str,this.prefixReplace[a].replace);
                        foundPrefix=true;
                        break;
                    }

                }
                if (!foundPrefix){
                    result[i][name].value= `<${result[i][name].value}>`;
                    break;
                }                
            }
        }
    }
    return result;
}

}