import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iptu } from './iptu';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IptuService {

  private baseIptuUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll(logradouro: string, numero: string): Observable<Iptu[]> {
    return this.http.get<Iptu[]>(this.baseIptuUrl + `/iptus/${logradouro}` + `/${numero}`);
  }

  getAllPaginated(request : any): Observable<any>{
const params = request;

return this.http.get(this.baseIptuUrl + `/iptus`, {params})


  }

  }


