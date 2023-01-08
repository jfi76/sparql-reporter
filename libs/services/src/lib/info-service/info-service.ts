import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
export interface InfoLine{
    object:string;
    state:string;
}
@Injectable({
    providedIn: 'root',
  })
  export class InfoService {
    lines= new Subject<InfoLine>;
    add(line:InfoLine){
        this.lines.next(line);
    }
  }