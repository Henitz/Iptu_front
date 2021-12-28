import { Component, OnInit } from '@angular/core';
import { Iptu } from '../iptu';
import { Router } from '@angular/router';
import { IptuService } from '../iptu.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-iptu-list',
  templateUrl: './iptu-list.component.html',
  styleUrls: ['./iptu-list.component.scss']
})
export class IptuListComponent implements OnInit {

  iptus: Iptu[] = [];
  logradouroInformado!: string;
  numeroInformado!: string;
  /*name of the excel-file which will be downloaded. */
  fileName= 'ExcelSheet.xlsx';

  constructor(private service: IptuService) {}

  ngOnInit(): void {

  }

  pesquisa(){
    this.service.getAll(this.logradouroInformado, this.numeroInformado).subscribe((i)=>this.iptus=i)
  }



  exportexcel(): void
      {
         /* table id is passed over here */
         let element = document.getElementById('excel-table');
         const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

         /* generate workbook and add the worksheet */
         const wb: XLSX.WorkBook = XLSX.utils.book_new();
         XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

         /* save to file */
         XLSX.writeFile(wb, this.fileName);

      }


}
