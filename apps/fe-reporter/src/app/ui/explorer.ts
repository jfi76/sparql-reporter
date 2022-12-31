import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sparql-reporter-explorer',
  templateUrl: './explorer.html',
  styleUrls: ['./explorer.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ExplorerComponent implements OnInit {
    @Input() 
    treeId='';
    @Input() 
    objectId='';
    treeIdEmitter$= new EventEmitter();  
    countries=[{
		name: 'Russia',
		flag: 'f/f3/Flag_of_Russia.svg',
		area: 17075200,
		population: 146989754,
	},
	{
		name: 'Canada',
		flag: 'c/cf/Flag_of_Canada.svg',
		area: 9976140,
		population: 36624199,
	},]
  ngOnInit(): void {
      console.log('inited');
  }
  treeIdEmitterHandler(event: any){
    console.log(event.detail);
    this.treeIdEmitter$.emit(event.detail);
  }

}
