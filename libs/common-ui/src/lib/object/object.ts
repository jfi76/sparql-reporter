import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IQueryResult } from '@sparql-reporter/services';
import { Observable } from 'rxjs';
import { ObjectService } from './feature/object.service';

@Component({
  selector: 'sparql-reporter-object',
  templateUrl: './object.html',
  styleUrls: ['./object.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ObjectComponent implements OnInit, OnChanges {
@Input()
objecId='';
tableQueryResult = new Observable<IQueryResult>;
@Output()
emitObjectIri$= new EventEmitter();
constructor(private objectService: ObjectService){
  
}
  ngOnInit(): void {
      console.log('inited');
  }

ngOnChanges({objecId}: SimpleChanges){
  if (objecId){
    console.log('get' + this.objecId)
    this.tableQueryResult=this.objectService.queryObject(this.objecId);
  }
}
handleObjectClick(iri:any){
  console.log('list level obj '+iri);
  this.emitObjectIri$.emit(iri);
} 
}
