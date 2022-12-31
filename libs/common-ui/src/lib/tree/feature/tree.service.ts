import { Sparql } from '@sparql-reporter/services';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TreeService {
  constructor(private sparql: Sparql){

  }
getUpperLevel(){
    console.log('get');
    this.sparql.query(`select *
    where {
     ?iri rdf:type owl:Class .
     ?iri rdfs:label ?label .
     optional{?iri rdfs:subClassOf ?parent .  }
     filter (coalesce(?parent,'')='')
    }
   `).subscribe((data)=>{
    console.log(data);
   }
   );

    }  
getChild(id:string){
    this.sparql.query(`select *
    where {
     ?iri rdf:type owl:Class .
     ?iri rdfs:label ?label .
     optional{?iri rdfs:subClassOf ?parent .  }
     filter (coalesce(?parent,'')='')
    }`);

    }
getNodeChildParents(id:string){
  console.log('recursive');
}
}