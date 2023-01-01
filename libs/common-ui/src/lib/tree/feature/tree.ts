import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import {TreeService, OWLTHING, ITreeNode} from './tree.service';

@Component({
  selector: 'sparql-reporter-tree',
  templateUrl: './tree.html',
  styleUrls: ['./tree.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TreeComponent implements OnInit, OnChanges {
    @Input() 
    treeId='';
    @Output()
    treeIdEmitter$= new EventEmitter(); 
    content$=new Observable<ITreeNode[]>;   
  constructor(public treeService: TreeService ){
    this.content$=this.treeService.content$;
  }   
  ngOnInit(): void {
      console.log('tree inited');      
  }
  ngOnChanges({treeId}: SimpleChanges): void {
      if (treeId){
        this.treeService.processChange(treeId.currentValue);
      }
  }
  treeClik(iri:string){
    this.treeIdEmitter$.emit(iri);
  }  
}
