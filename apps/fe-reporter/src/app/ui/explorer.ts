import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'sparql-reporter-explorer',
  templateUrl: './explorer.html',
  styleUrls: ['./explorer.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ExplorerComponent implements OnInit {

  ngOnInit(): void {
      console.log('inited');
  }


}
