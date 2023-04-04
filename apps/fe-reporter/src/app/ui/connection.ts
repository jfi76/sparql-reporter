import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'sparql-reporter-connection',
  templateUrl: './connection.html',
  styleUrls: ['./connection.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ConnectionComponent implements OnInit {
  datasetFc = new FormControl();
  urlFc=new FormControl();
  ngOnInit(): void {
    if (localStorage.getItem("serveUrl") && localStorage.getItem("serveUrl")!==null && localStorage.getItem("serveUrl")!=='')  this.urlFc.setValue(localStorage.getItem("serveUrl"));
    if (localStorage.getItem("dataset") && localStorage.getItem("dataset")!==null && localStorage.getItem("dataset")!=='')  this.datasetFc.setValue(localStorage.getItem("dataset"));
  }

  save(){
    console.log(this.datasetFc.value);
    localStorage.setItem("dataset",this.datasetFc.value);
    localStorage.setItem("serveUrl",this.trim(this.urlFc.value));
  }
  trim(val:string):string{
    if (val.length>0){
      val=val.trimEnd();
      if (val[val.length-1]==='/') val=val.substring(0,val.length-1);
    }
    return val;
  }
}
