import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';

import {TreeService} from './tree.service';

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
  constructor(private treeService: TreeService ){

  }   
  ngOnInit(): void {
      console.log('tree inited');
      
  }
  ngOnChanges({treeId}: SimpleChanges): void {
      if (treeId){
        console.log('get tree:' + treeId.currentValue);

        if (treeId.currentValue==='') this.treeService.getUpperLevel();
        else this.treeService.getNodeChildParents(treeId.currentValue);
      }
  }
  setTreeId(id:string):void{
    console.log('do set tree component');
    this.treeIdEmitter$.emit(id);
  }
  
}
