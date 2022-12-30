import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'sparql-reporter-connection',
  templateUrl: './connection.html',
  styleUrls: ['./connection.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ConnectionComponent implements OnInit {

  ngOnInit(): void {
      console.log('inited');
  }

  
}
