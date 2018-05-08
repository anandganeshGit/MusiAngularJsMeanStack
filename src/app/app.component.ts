import { Component } from '@angular/core';
import { AuthService } from 'angular4-social-login';
import { SocialUser } from 'angular4-social-login';
/*import {AuthService} from './core/auth.service';*/

declare var swal: any;

@Component({
  selector: 'app-home',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoggedIn: false;
  isRedColor = true;
  isBlueColor = false;
  isGreenColor = false;
  
   user: SocialUser;
  constructor(public authService: AuthService) {
    }
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }
  signOut(): void {

    this.authService.signOut();

    // Sweetalert2 function to show popup for logout
    swal({
      type: 'error',
      title: 'You have been Logged Out',
      showConfirmButton: false,
      timer: 1800
    }).catch(function (timeout) {
      if (timeout === 'timer') {
      }
    });


  }
  // changeToRed(): void {
  //   this.isRedColor = true;
  //   this.isBlueColor = false;
  //   this.isGreenColor = false;
  // }
  //
  // changeToBlue(): void {
  //   this.isRedColor = false;
  //   this.isBlueColor = true;
  //   this.isGreenColor = false;
  // }
  //
  // changeToGreen(): void {
  //   this.isRedColor = false;
  //   this.isBlueColor = false;
  //   this.isGreenColor = true;
  // }

}


  