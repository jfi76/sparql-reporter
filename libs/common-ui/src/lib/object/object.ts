import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'sparql-reporter-object',
  templateUrl: './object.html',
  styleUrls: ['./object.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ObjectComponent implements OnInit {

  ngOnInit(): void {
      console.log('inited');
  }

  
}
