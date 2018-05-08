import { Component, OnInit } from '@angular/core';
import { SocialUser } from 'angular4-social-login';
import { AuthService } from 'angular4-social-login';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: SocialUser;
  userForm: FormGroup;
  data: any;
 userData: any;
 fname: any;
 lname: any;
 address: any;
 phone: any;
  constructor(private authService: AuthService,
              private fb: FormBuilder,private _http: Http) {

                this.data = [];
   this.userData = [];
              }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  this.userDetails();
  }

  userDetails() {
    // console.log(this.encoded);
    this.data.length = 0;
    console.log('Search tracks vanthachu');
    this.data.push({'mail': this.user.email});
    // let headers = new Headers();
    // headers.append('Authorization', 'Bearer ' + token);
    return this._http.post('/users/getUser', this.data)
      .subscribe(res => {
        this.userData = res.json();
        this.fname = this.userData[0].fname;
        this.lname = this.userData[0].lname;
        this.phone = this.userData[0].phone;
        this.address = this.userData[0].address;
 /*
        console.log(this.userData[0].fname);
        console.log(this.userData[0].lname);
        console.log(this.userData[0].phone);
        console.log(this.userData[0].address);*/
      });
  }



}
