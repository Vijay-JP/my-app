import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
  
@Injectable({
  providedIn: 'root'
})
export class HttpService {
    
  private url = 'http://localhost:8080';
   

  headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  options = { headers: this.headers };

  constructor(private httpClient: HttpClient) { }
  
  getCall(extension:string){
    return this.httpClient.get(this.url+'/'+extension);
  }
  
  postCall(extension:string, post:any){
    console.log(this.url+'/'+extension);
    console.log(post);
    const body = JSON.stringify(post);
    console.log(body);
    return this.httpClient.post(this.url+'/'+extension, body, this.options);
  }

  upload(extension:string, file:any):Observable<any> {
    // Create form data
    const formData = new FormData();  
    // Store form name as "file" with file data
    formData.append("file", file, file.name);
    // Make http post request over api
    // with formData as req
    return this.httpClient.post(this.url+'/'+extension, formData)
}
  
}
