import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import {TreeService, OWLTHING, ITreeNode, ITreeState} from './tree.service';

@Component({
  selector: 'sparql-reporter-tree',
  templateUrl: './tree.html',
  styleUrls: ['./tree.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TreeComponent implements OnInit, OnChanges {
    @Input() 
    tree:{iri:string,state:string}={iri:'',state:''};
    // @Input()
    // treeState='';
    @Output()
    treeIdEmitter$= new EventEmitter(); 
    content$=new Observable<ITreeNode[]>;   
  constructor(public treeService: TreeService ){
    this.content$=this.treeService.content$;
  }   
  ngOnInit(): void {
      console.log('tree inited');      
  }
  ngOnChanges({tree}: SimpleChanges): void {
    console.log(tree);
      if (tree){
        this.treeService.processChange(tree.currentValue.iri);
      }
  }
  treeClik( obj:{iri:string, state:ITreeState}){
    console.log(obj);
    this.treeIdEmitter$.emit(obj);
  }  
}
