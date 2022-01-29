import { Component, OnInit } from '@angular/core';
import { Iptu } from '../iptu';
import { Router } from '@angular/router';
import { IptuService } from '../iptu.service';
import * as XLSX from 'xlsx';
import { ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-iptu-list',
  templateUrl: './iptu-list.component.html',
  styleUrls: ['./iptu-list.component.scss']
})
export class IptuListComponent implements OnInit {
totalElements : number = 0;
  iptus: Iptu[] = [];
  logradouroInformado!: string;
  numeroInformado!: string;
  /*name of the excel-file which will be downloaded. */
  fileName= 'ExcelSheet.xlsx';

  @ViewChild('htmlData') htmlData!:ElementRef;

  constructor(private service: IptuService) {}

  ngOnInit(): void {
    this.todosPaginado({ page: "0", size: "5" });
  }

    private todosPaginado(request: any) {
        this.service.getAllPaginated(request)
        .subscribe(data => {
            this.iptus = data['content'];
            this.totalElements = data['totalElements'];
        }
        , error => {
            console.log(error.error.message);
        }
        );
    }

    nextPage(event: PageEvent) {
        const request = <any>{};
        request['page'] = event.pageIndex.toString();
        request['size'] = event.pageSize.toString();
        this.todosPaginado(request);
    }




  pesquisa(){
    this.service.getAll(this.logradouroInformado, this.numeroInformado).subscribe((i)=>this.iptus=i)
  }



  exportexcel(): void
      {
         /* table id is passed over here */
         let element = document.getElementById('excel');
         const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

         /* generate workbook and add the worksheet */
         const wb: XLSX.WorkBook = XLSX.utils.book_new();
         XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

         /* save to file */
         XLSX.writeFile(wb, this.fileName);

      }



      Screen()
{
    var data = document.getElementById('excel');
    html2canvas(data!).then(canvas => {
        // Few necessary setting options
        var imgWidth = 208;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
        var position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        pdf.save('MYPdf.pdf'); // Generated PDF
    });
}



}
