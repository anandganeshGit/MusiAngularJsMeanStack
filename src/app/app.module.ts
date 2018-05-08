import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.component.route';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatChipsModule, MatIconModule, MatInputModule, MatListModule, MatSidenavModule,
  MatTabsModule,
  MatToolbarModule, MatTooltipModule, MatPaginatorModule, MatMenuModule, MatDialogModule, MatSliderModule,
  MatExpansionModule
} from '@angular/material';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginCompComponent } from './components/login-comp/login-comp.component';
import { HttpModule, JsonpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { SocialLoginModule } from 'angular4-social-login';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angular4-social-login';
import { environment } from '../environments/environment';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { SplitButtonModule } from 'primeng/primeng';
import { MusicSearchComponent } from './components/music-search/music-search.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CdkTableModule} from '@angular/cdk/table';
import {MatTableModule} from '@angular/material';
import { ProfileComponent } from './components/profile/profile.component';
import {PlaylistComponent} from './components/playlist/playlist.component';
import {MusicSearchService} from './service/music-search.service';
import {WebApiDbService} from './web-api-db.service';
import {MoviesService} from './service/movie.service.service';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { DropdownModule } from 'angular-2-dropdown/mk-dropdown/dropdown.module';
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('242475794920-jk2ig7aei9s634uf4nju2ikfarf8odic.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('141104256541949')
  }
]);

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  keyboard: true
};

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginCompComponent,
    MusicSearchComponent,
    ProfileComponent,
    PlaylistComponent,
    RegisterUserComponent
  ],
  imports: [
    BrowserModule,
/*    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    }),*/
    HttpModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule,
    RouterModule.forRoot(appRoutes),
    CdkTableModule,
    MatSidenavModule,
    SplitButtonModule,
    MatTableModule,
    MatButtonModule,
    MatTabsModule,
    MatChipsModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDialogModule,
    MatSliderModule,
    MatExpansionModule,
    SwiperModule,
    SocialLoginModule,
    DropdownModule ,
    HttpClientInMemoryWebApiModule.forRoot(
      WebApiDbService, { dataEncapsulation: false })

  ],
  providers: [MusicSearchService,
    MoviesService,
    {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
