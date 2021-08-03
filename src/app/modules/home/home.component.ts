import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../core/services/http.service';

import { InvestmentsModel, UniqueInvestmentsModel } from '../../shared/model/investments.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  invForm!: FormGroup;
  fileDetails!: FormGroup;
  user:any;
  investmentModel:InvestmentsModel[]=[];
  uniqueInvModel:UniqueInvestmentsModel[]=[];
  loading: boolean = false;
  file: any = []; 

  constructor(
    private route : Router,
    private httpservice : HttpService,
    private formBuilder: FormBuilder
  ) { }

  logout() {
    sessionStorage.clear;
    this.route.navigate(['']);
  }

  ngOnInit(): void {
    this.user = sessionStorage.getItem('username');
    //HDD
    this.user = "Vijayakumar";
    console.log(this.user);

    this.getInvestments('showInvestments');
    this.getUniqueInvestments('uniqueInvestmentDetails');
    
    this.invForm = this.formBuilder.group({
      portal: ['', Validators.required],
      investment_date: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  getInvestments(value: string) {
    this.httpservice.getCall(value)
        .subscribe((data : any) => {
        this.investmentModel = (data);
    });
  }

  getUniqueInvestments(value: string) {
    this.httpservice.getCall(value)
        .subscribe((data : any) => {
        this.uniqueInvModel = (data);
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
          (response: Response) => {
            this.loading = false; 
          }
      );
  }

  onInvSubmit(){
    this.httpservice.postCall('insertInvestment', this.invForm.value)
        .subscribe((data : any) => {
        console.log(data);
    });
  }

}
