import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITreeState } from 'libs/common-ui/src/lib/tree/feature/tree.service';

@Component({
  selector: 'sparql-reporter-explorer',
  templateUrl: './explorer.html',
  styleUrls: ['./explorer.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ExplorerComponent implements OnInit {
    treeId='';
    objectId='';

      constructor(public activateRoute: ActivatedRoute, public router: Router){
    
      }
      ngOnInit(): void {
          this.activateRoute.queryParams.subscribe((params:any)=>{
             this.treeId=params.treeId || '';
             this.objectId=params.objectId || '';
          });      
      }

  treeIdEmitterHandler(id: string){
    this.treeId=id;
    this.router.navigate([],{relativeTo:this.activateRoute,queryParams:{treeId:this.treeId,objectId:this.objectId}})    
 }

}
