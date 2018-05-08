/*import { Component, OnInit } from '@angular/core';*/
import {
  SwiperComponent, SwiperConfigInterface, SwiperDirective
} from 'ngx-swiper-wrapper';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  public config: SwiperConfigInterface = {};

  @ViewChild(SwiperComponent) componentRef: SwiperComponent;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;

 // var endTime;

  constructor() {
    var  endTime = new Date();
  }

  ngOnInit() {
    //console.log(user);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.config = {
        direction: 'horizontal',
        slidesPerView: 4,
        keyboard: true,
        mousewheel: false,
        scrollbar: true,
        navigation: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          hideOnClick: true
        },
        breakpoints: {
          1199: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          991: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          767: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          480: {
            slidesPerView: 1,
            spaceBetween: 0,
          }
        },
        spaceBetween: 20
      };
    }, 100)
  }

/*  getNowPlayinMovies(page: number) {
    this.moviesService.getNowPlaying(page).subscribe( res => {
      this.nowPlaying = res.results;
      this.nowPlaying.forEach(np => np['isMovie'] = true);
    });
  }*/

}
