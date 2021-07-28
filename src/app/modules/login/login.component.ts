import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpService } from '../../core/services/http.service';
import { LoginModel } from '../../shared/model/login.model';

@Component({ templateUrl: 'login.component.html' })

export class LoginComponent implements OnInit {

    loginForm!: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string = '';
    login:LoginModel[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private httpservice: HttpService,
        private router: Router
    ) {
    }

    onSubmit() {
        console.log('Onsubmit method');
        this.router.navigate(['/home']);
        /*this.httpservice.postCall('login', this.loginForm.value)
            .subscribe((data : any) => {
            console.log(data);
            this.login.push(data);
            sessionStorage.setItem('username', this.login[0].name);
            this.router.navigate(['/home']);
        });*/
    }
    
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
}

