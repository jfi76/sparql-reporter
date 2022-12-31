import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'stream';
import {TreeService} from './tree.service';

@Component({
  selector: 'sparql-reporter-tree',
  templateUrl: './tree.html',
  styleUrls: ['./tree.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TreeComponent implements OnInit {
    @Input() 
    treeId='';
    @Output()
    treeIdEmitter$= new EventEmitter();    
  constructor(private treeService: TreeService ){

  }   
  ngOnInit(): void {
      console.log('tree inited');
      this.treeService.getUpperLevel();
  }
  
  setTreeId(id:string):void{
    this.treeIdEmitter$.emit(id);
  }
  
}
