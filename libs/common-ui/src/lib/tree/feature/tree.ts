import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import {TreeService} from './tree.service';

@Component({
  selector: 'sparql-reporter-tree',
  templateUrl: './tree.html',
  styleUrls: ['./tree.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TreeComponent implements OnInit {
  @Input() 
  public currentId = '';
  constructor(private treeService: TreeService ){

  }   
  ngOnInit(): void {
      console.log('tree inited');
      this.treeService.getUpperLevel();
  }

  
}
