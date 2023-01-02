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
  itemCount:IQueryField;
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
  previousIri='';
  content: ITreeNode[] = [
    {
      iri: OWLTHING,
      level: 0,
      hasChildren: true,
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
  getUpperLevelStmt = `select ?iri (coalesce(?parentStr,'') as ?parent) ?label (coalesce(?count,0) as ?itemCount) 
  where {
    {
    ?iri rdf:type owl:Class .
    ?iri rdfs:label ?label .
    optional{?iri rdfs:subClassOf ?parentStr .  }
    filter (coalesce(?parentStr,'')='')
    } .
    optional
    {  select ?iri (count(*) as ?count) where  
      {
        ?child rdfs:subClassOf ?iri .
      } group by ?iri          
    }     
  }
 `;
  getChildStmt = (id: string) => `select ?iri ?parent ?label (coalesce(?count,0) as ?itemCount) 
  where {
   {
     bind(${id} as ?parent ) .   
     ?iri rdf:type owl:Class .
     ?iri rdfs:label ?label .
     ?iri rdfs:subClassOf ?parent .     
    } .
    optional
    {  select ?iri (count(*) as ?count) where  
      {
        ?child rdfs:subClassOf ?iri .
      } group by ?iri          
    } 
  }`;
  getSubNodes(stmt: string): Observable<ITreeNodeQuery[]> {
    console.log(stmt);
    return this.sparql.query(stmt);
  }

  formNode(
    content:ITreeNode[],
    iri: string,

    label: string,
    hasParentId: string,
    itemCount:string,
    iconRightEnabled: boolean = true,
    isActive: boolean = false
  ){
    const parent: any = this.content.find((obj) => obj.iri === hasParentId);

    const level: any = parent?.level + 1;
    
    content.push({
      iri: iri,
      level: level,
      hasChildren: (itemCount!=='0' ? true :false ),
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
    for (const { iri, parent, label, itemCount } of data as ITreeNodeQuery[]) {      
      this.formNode(insertRows,iri.value,  label.value, parentId, itemCount.value, false, false);
    }
    this.content.forEach((row,index)=>{
      if (parentId===row.iri){
        newContent.push(row);
        insertRows.forEach(insRow=>newContent.push(insRow));
      } else newContent.push(row);
    });

    this.content=[...newContent];

  }

  getChildNodesIndex(iri:string):number[] {
    const retArr:number[]=[];
    for (let i=0; i < this.content.length || 0; i++ ){
      if (this.content[i].hasParentId===iri) retArr.push(i);
    }
  return retArr;
  }

  getNode(iri:string){
    return this.content.find(node=>node.iri=iri); 
  } 

  getChildNodesRecursive(iri:string):number[]{
    let childNodes:number[]=[];
    const currentChild:number[]=this.getChildNodesIndex(iri);
    currentChild.forEach((item)=>{
      const currArr=this.getChildNodesIndex(this.content[item].iri);
      if (currArr.length>0) {
        childNodes.push(item);
        childNodes=[...childNodes,...this.getChildNodesRecursive(this.content[item].iri)];
      }
      else childNodes.push(item);
    });
    return childNodes;
  }

  removeChildren(treeId:string){
    const removeArray = this.getChildNodesRecursive(treeId);    
    const newContent:ITreeNode[]=[];
    this.content.forEach((row,index)=>{
      if (removeArray.indexOf(index)===-1) newContent.push(row);
      else console.log('not inc'+index);
    });
    this.content=[...newContent];        
  }
  deactivate(treeId:string){
    const currentNodeIndex = this.content.findIndex(
      (obj) => obj.iri === treeId
    );
    console.log(currentNodeIndex + ' ' + treeId);
    if (currentNodeIndex!==-1) this.content[currentNodeIndex].isActive = false;
  }

  processChange(treeId: string):void {
    // deactivation 
    if ( this.previousIri!==treeId) this.deactivate( this.previousIri);
    this.previousIri=treeId;
     
    console.log('processCahnge' + treeId);
    const currentNodeIndex = this.content.findIndex(
      (obj) => obj.iri === treeId
    );
    if (currentNodeIndex !==-1) this.content[currentNodeIndex].isActive = true;
    if (currentNodeIndex !==-1 && this.content[currentNodeIndex]?.state === ITreeState.notOpen) {

      this.content[currentNodeIndex].iconRightEnabled = true;
      this.content[currentNodeIndex].state = ITreeState.open;
      let stmt = this.getChildStmt(treeId);
      let custTreeId = treeId
      if (treeId === OWLTHING) {
        stmt = this.getUpperLevelStmt;
        custTreeId = OWLTHING;
      } 
      this.getSubNodes(stmt)
      .subscribe((data: any) => {
        this.insertChild(custTreeId, data.results);          
        this.content$.next([...this.content]);                      
      });  
      return;    
    }

    if (currentNodeIndex !==-1 && this.content[currentNodeIndex]?.state === ITreeState.open && this.content[currentNodeIndex]?.hasChildren) {
      this.removeChildren(treeId);
      this.content[currentNodeIndex].state=ITreeState.notOpen;
      this.content$.next([...this.content]);  
    }        
  }
}
