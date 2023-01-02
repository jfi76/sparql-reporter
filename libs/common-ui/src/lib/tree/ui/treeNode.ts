import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ITreeNode, ITreeState } from '../feature/tree.service';

@Component({
  selector: 'sparql-reporter-tree-node',
  templateUrl: './treeNode.html',
  styleUrls: ['./treeNode.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TreeNodeComponent implements OnChanges{
  @Input()
  node?:ITreeNode;
  @HostBinding('class.icon-not-visible')
  @Input()
  hasNoChildren=false;
  @HostBinding('class.active')
  @Input()
  isActive=false; 
  @Input()
  state:ITreeState=ITreeState.notOpen;
  public collapsed=false;

  ngOnChanges({state}: SimpleChanges): void {
      if (state){
        this.collapsed=state.currentValue === ITreeState.notOpen ? true : false;
      }
  }

}