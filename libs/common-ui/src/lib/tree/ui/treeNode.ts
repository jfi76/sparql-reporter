import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ITreeNode } from '../feature/tree.service';

@Component({
  selector: 'sparql-reporter-tree-node',
  templateUrl: './treeNode.html',
  styleUrls: ['./treeNode.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TreeNodeComponent implements OnInit {
  @Input()
  node?:ITreeNode;
  @HostBinding('class.icon-not-visible')
  @Input()
  hasNoChildren=false;
  @HostBinding('class.active')
  @Input()
  isActive=false;

  ngOnInit(): void {
      console.log('node item inited');
  }


  ngOnChanges({node,isActive}: SimpleChanges): void {
      if (node){
//        this.iconNotVisible=node.currentValue.hasChildren;
         console.log(isActive.currentValue);
      }
  } 
  
}