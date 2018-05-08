import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../../service/movie.service.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SocialUser} from 'angular4-social-login';
import { AuthService } from 'angular4-social-login';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  registerform: FormGroup;
  fnm: string;
  lnm: string;
  ph: string;
  mail: string;
  pwd: string;
  addr: string;
  user :SocialUser;

  constructor(private mbdb: MoviesService, private fb: FormBuilder,private authService: AuthService) {
    this.registerform = fb.group({
      fname: '',
      lname: '',
      phone: '',
      address: '',
      email: '',
      password: ''
    });
  }

  ngOnInit() {

    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }


  onSubmit() {
    this.mbdb.getUsers(this.registerform.value);
  }
}
