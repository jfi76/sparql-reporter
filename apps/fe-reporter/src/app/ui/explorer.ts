import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'sparql-reporter-explorer',
  templateUrl: './explorer.html',
  styleUrls: ['./explorer.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ExplorerComponent implements OnInit {
    treeId='';
    objectId='';

    /*
    props:{[pror: string]: unknown}={
        treeId:'',
        objectId:''
      }*/
      constructor(public activateRoute: ActivatedRoute, public router: Router){
    
      }
      ngOnInit(): void {
          this.activateRoute.queryParams.subscribe((params:any)=>{
             this.treeId=params.treeId || '';
             this.objectId=params.objectId || '';
          });      
      }

  treeIdEmitterHandler(id: string){
    console.log('treeIdEmitterHandler:');
    console.log(id);
    this.treeId=id;
    this.router.navigate([],{relativeTo:this.activateRoute,queryParams:{treeId:this.treeId,objectId:this.objectId}})    
 }

}
