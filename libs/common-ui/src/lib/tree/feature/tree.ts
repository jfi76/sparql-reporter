import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'sparql-reporter-tree',
  templateUrl: './tree.html',
  styleUrls: ['./tree.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TreeComponent implements OnInit {

  ngOnInit(): void {
      console.log('inited');
  }

  
}
