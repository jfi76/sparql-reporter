import save from 'save-file';
import Excel, { Worksheet } from 'exceljs';
import { Injectable } from '@angular/core';
import { Sparql } from '../sparql/sparql';

export const DEFAULT_COL_WIDTH = 40;
export const DEFAULT_TABLE_ROW_LIMIT = 5000;

@Injectable({
  providedIn: 'root',
})
export class ExportStmtExcel {
  constructor(private sparq: Sparql) {}
  replaceLitmit(stmt: string): string {
    const reg = new RegExp('limit[\\" "]*\\d*', 'gi'); // /limit\{d}\/i
    stmt = stmt.replace(reg, ' ');
    return stmt + ' limit ' + DEFAULT_TABLE_ROW_LIMIT;
  }
  execute(
    stmt?: string,
    sheetName = 'result',
    fileName = 'query-results.xlsx',
    format = 'xlsx'
  ) {
    this.sparq.queryResultTable(this.replaceLitmit(stmt || '') ).subscribe(async (response) => {
      console.log(stmt);
      const workbook: any = new Excel.Workbook();
      const sheet1 = workbook.addWorksheet(sheetName);
      const colDef: any[] = [];
      response.head.vars.forEach((column, index) => {
        colDef.push({ header: column, key: column, width: DEFAULT_COL_WIDTH });
      });
      sheet1.columns = colDef;

      response.results.forEach((row) => {
        const rowContent: string[] = [];
        row.forEach((column: { value: string }) => {
          rowContent.push(column.value || '');
        });
        sheet1.addRow(rowContent);
      });
      const firtsRow = sheet1.getRow(1);
      firtsRow.font = { bold: true };
      const sheet2 = workbook.addWorksheet('query stmt');

      sheet2.columns = [{ header: 'sparql', width: 200, key: 'sparql' }];
      sheet2.addRow([stmt]);
      sheet2.getRow(2).height = 200;

      sheet1.autoFilter = {
        from: { column: 1, row: 1 },
        to: {
          column: response.head.vars.length + 1,
          row: response.results.length + 1,
        },
      };
      const buf = await workbook[format].writeBuffer();
      save(buf, fileName).then(() => {
        console.log('exported');
      });
    });
  }
}
