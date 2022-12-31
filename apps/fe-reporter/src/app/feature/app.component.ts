import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'sparql-reporter-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})


export class AppComponent implements OnInit {
  title = 'sparql-reporter';
  props:{[pror: string]: unknown}={
    treeId:'',
    objectId:''
  }
  constructor(public activateRoute: ActivatedRoute, public router: Router){

  }
  ngOnInit(): void {
      this.activateRoute.queryParams.subscribe((params:any)=>{
         this.props['treeId'] = params.treeId;
         this.props['objectId'] = params.objectId;
      });      
  }
  treeIdEmitterHandler(event:any){
      console.log(event);
  }
}
