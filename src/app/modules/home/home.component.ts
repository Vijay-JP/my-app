import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../core/services/http.service';

import { InvestmentsModel } from '../../shared/model/investments.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fileDetails!: FormGroup;
  user:any;
  investmentModel:InvestmentsModel[]=[];
  loading: boolean = false;
  file: any = []; 

  constructor(
    private route : Router,
    private httpservice : HttpService,
    private formBuilder: FormBuilder
  ) { }

  logout() {
    console.log('Logout Method');
    sessionStorage.clear;
    this.route.navigate(['']);
  }

  ngOnInit(): void {
    this.user = sessionStorage.getItem('username');
    //HDD
    this.user = "Vijayakumar";
    console.log(this.user);

    this.getInvestments('showInvestments');
    
  }

  getInvestments(value: string) {
    this.httpservice.getCall('showInvestments')
        .subscribe((data : any) => {
        console.log(data);
        this.investmentModel = (data);
        console.log(this.investmentModel);
    });
  }

  // On file Select
  onChange(event: any) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
      this.loading = !this.loading;
      console.log(this.file);
      this.httpservice.upload('loadInvestment', this.file).subscribe(
          (event: any) => {
            console.log(event);
              if (typeof (event) === 'object') {
                  this.loading = false; 
              }
          }
      );
  }

}
