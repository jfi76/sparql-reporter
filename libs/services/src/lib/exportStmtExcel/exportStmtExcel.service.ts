
import save from 'save-file';
import Excel ,{Worksheet} from 'exceljs'; 
import { Injectable } from '@angular/core';
import { Sparql } from '../sparql/sparql';

@Injectable({
    providedIn: 'root',
  })
  export class ExportStmtExcel {
    constructor(private sparq:Sparql){

    }
   async execute(stmt?:string){
        this.sparq.queryResultTable(stmt || '').subscribe(obj=>{

        })
        const workbook = new Excel.Workbook();
        const sheet1 =workbook.addWorksheet('test');
        sheet1.addRow(['xxx','zzz','ccc']);
        const buf=await workbook.xlsx.writeBuffer();
         save(buf,'jj.xlsx').then(()=>{
            console.log('ok');
         });
    }
  }