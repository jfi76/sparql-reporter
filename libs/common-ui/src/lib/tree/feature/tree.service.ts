import { Sparql } from '@sparql-reporter/services';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';

export enum ITreeState{
open='open',
notOpen='notOpen'
}

export interface ITree{
    level:number;
    hasChildren:boolean;
    state:ITreeState;
    label:string;
    hasParentId:string;
    icon:string; 
}

@Injectable({
  providedIn: 'root',
})
export class TreeService {
    iconState={
        notOpen:'>',
        open:'>', 
     }
    
  content:ITree[]=[{
    level:0,
    hasChildren: false,
    state:ITreeState.open,
    label:'Classes',
    hasParentId:'',
    icon: this.iconState.open,   
  }];  
  
  constructor(public sparql: Sparql){

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
     bind(${id} as ?parent ) .   
     ?iri rdf:type owl:Class .
     ?iri rdfs:label ?label .
     ?iri rdfs:subClassOf ?parent .  
     
    }`).subscribe((data)=>{
        console.log(data);
       }
       );

    }
getNodeChildParents(id:string){
    this.sparql.query(`select *
    where {
     bind(${id} as ?parent ) .   
     ?iri rdf:type owl:Class .
     ?iri rdfs:label ?label .
     ?iri rdfs:subClassOf ?parent .  
     
    }`).subscribe((data)=>{
        console.log(data);
       }
       );
}
}