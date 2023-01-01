import { Sparql } from '@sparql-reporter/services';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, take, throwError, map, tap } from 'rxjs';
import { IQueryField } from '@sparql-reporter/services';

export enum ITreeState {
  open = 'open',
  notOpen = 'notOpen',
}
export interface ITreeNodeQuery {
  iri: IQueryField;
  label: IQueryField;
  parent: IQueryField;
}
export interface ITreeNode {
  iri: string;
  level?: number;
  hasChildren: boolean;
  state: ITreeState;
  label: string | IQueryField['value'];
  hasParentId: string | IQueryField['value'];
  space: string;
  iconRightEnabled: boolean;
  isActive: boolean;
}
export const OWLTHING = 'owl:Thing';
@Injectable({
  providedIn: 'root',
})
export class TreeService {
  shift = '     ';
  content: ITreeNode[] = [
    {
      iri: OWLTHING,
      level: 0,
      hasChildren: false,
      state: ITreeState.notOpen,
      label: 'Classes',
      hasParentId: '',
      space: '',
      iconRightEnabled: true,
      isActive: true,
    },
  ];
  content$ = new BehaviorSubject<ITreeNode[]>([...this.content]);

  constructor(public sparql: Sparql) {}
  getUpperLevelStmt = `select ?iri (coalesce(?parentStr,'') as ?parent) ?label
  where {
   ?iri rdf:type owl:Class .
   ?iri rdfs:label ?label .
   optional{?iri rdfs:subClassOf ?parentStr .  }
   filter (coalesce(?parentStr,'')='')
  }
 `;
  getChildStmt = (id: string) => `select ?iri ?parent ?label
where {
 bind(${id} as ?parent ) .   
 ?iri rdf:type owl:Class .
 ?iri rdfs:label ?label .
 ?iri rdfs:subClassOf ?parent .  
 
}`;
  getSubNodes(stmt: string): Observable<ITreeNodeQuery[]> {
    console.log(stmt);
    return this.sparql.query(stmt);
  }

  formNode(
    content:ITreeNode[],
    iri: string,
    hasChildren: boolean,
    label: string,
    hasParentId: string,
    iconRightEnabled: boolean = true,
    isActive: boolean = false
  ){
    const parent: any = this.content.find((obj) => obj.iri === hasParentId);

    const level: any = parent?.level + 1;

    content.push({
      iri: iri,
      level: level,
      hasChildren: hasChildren,
      state: ITreeState.notOpen,
      label: label,
      hasParentId: hasParentId,
      space: this.shift.repeat(level),
      iconRightEnabled: iconRightEnabled,
      isActive: isActive,
    });     
  }

  insertChild(parentId: string, data: ITreeNodeQuery[]) {
    const insertRows:ITreeNode[]=[];
    const newContent:ITreeNode[]=[];
    for (const { iri, parent, label } of data as ITreeNodeQuery[]) {      
      this.formNode(insertRows,iri.value, false, label.value, parentId);
    }
    this.content.forEach((row,index)=>{
      if (parentId===row.iri){
        newContent.push(row);
        insertRows.forEach(insRow=>newContent.push(insRow));
      } else newContent.push(row);
    });
    console.log(newContent);
    this.content=[...newContent];
  }

  processChange(treeId: string) {
    console.log('process ' + treeId);

    const currentNodeIndex = this.content.findIndex(
      (obj) => obj.iri === treeId
    );
    
    if (currentNodeIndex !==-1 && this.content[currentNodeIndex]?.state === ITreeState.notOpen) {
      this.content[currentNodeIndex].isActive = true;
      this.content[currentNodeIndex].iconRightEnabled = true;
      let stmt = this.getChildStmt(treeId);
      let custTreeId = treeId
      if (treeId === OWLTHING) {
        stmt = this.getUpperLevelStmt;
        custTreeId = OWLTHING;
      } 
      //this.content$=
      this.getSubNodes(stmt)
      .subscribe((data: any) => {
        console.log(' start state');
        console.log(this.content);  
        this.insertChild(custTreeId, data.results);          
        console.log(this.content);
        this.content$.next([...this.content]);                      
        console.log('renewed');
      });
      

    }
    
  }
}
