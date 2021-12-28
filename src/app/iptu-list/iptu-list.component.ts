import { Component, OnInit } from '@angular/core';
import { Iptu } from '../iptu';
import { Router } from '@angular/router';
import { IptuService } from '../iptu.service';

@Component({
  selector: 'app-iptu-list',
  templateUrl: './iptu-list.component.html',
  styleUrls: ['./iptu-list.component.scss']
})
export class IptuListComponent implements OnInit {

  iptus: Iptu[] = [];
  logradouroInformado!: string;
  numeroInformado!: string;

  constructor(private service: IptuService) {}

  ngOnInit(): void {

  }

  pesquisa(){
    this.service.getAll(this.logradouroInformado, this.numeroInformado).subscribe((i)=>this.iptus=i)
  }
}
