import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { InfoService } from '@sparql-reporter/services';

import { last, Observable, Subject } from 'rxjs';

@Component({
  selector: 'sparql-reporter-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements OnInit {
  infoString=new Subject<string>();
  lastInfo =  this.infoService.lines.subscribe(line=>{
    console.log(line.object + '  ' + line.state);
    this.infoString.next(line.object + '  ' + line.state); 
  }); 
constructor(public infoService: InfoService ){}

  ngOnInit(): void {
      console.log('inited');
  }

  
}
