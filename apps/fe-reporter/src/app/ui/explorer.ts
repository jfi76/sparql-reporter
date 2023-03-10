import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITreeState } from '@sparql-reporter/common-ui';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'sparql-reporter-explorer',
  templateUrl: './explorer.html',
  styleUrls: ['./explorer.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ExplorerComponent implements OnInit {
    treeId='';
    treeState:ITreeState=ITreeState.notOpen;
    objectId='';
    listId='';
    refreshBrc$=new BehaviorSubject<boolean>(false);
      constructor(public activateRoute: ActivatedRoute, public router: Router){
    
      }
      ngOnInit(): void {
        this.refreshBrc$.next(false);
          this.activateRoute.queryParams.subscribe((params:any)=>{
             this.treeId=params.treeId || '';
             this.objectId=params.objectId || '';
          });      
      }

  treeIdEmitterHandler(obj:{iri: string, state:ITreeState}){
    this.refreshBrc$.next(false);
    console.log(obj);
    this.treeId=obj.iri;
    this.treeState=obj.state;
    this.router.navigate([],{relativeTo:this.activateRoute,queryParams:{treeId:this.treeId,objectId:this.objectId,treeState:this.treeState,listId:this.listId}})    
 }

 handleObjectClick(objectIri:any){
  this.refreshBrc$.next(false);
  this.objectId=objectIri;
  console.log('object:'+objectIri);
  this.router.navigate([],{relativeTo:this.activateRoute,queryParams:{treeId:this.treeId,objectId:this.objectId,treeState:this.treeState,listId:this.listId}})    

}
handleObjectClickTable(objectIri:any){
  this.refreshBrc$.next(true);
  this.objectId=objectIri;
  this.listId=objectIri;
  console.log('list object:'+objectIri);
  this.router.navigate([],{relativeTo:this.activateRoute,queryParams:{treeId:this.treeId,objectId:this.objectId,treeState:this.treeState,listId:this.listId}})    

}
}
