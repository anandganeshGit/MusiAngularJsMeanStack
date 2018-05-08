import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicSearchComponent } from './music-search.component';

describe('MusicSearchComponent', () => {
  let component: MusicSearchComponent;
  let fixture: ComponentFixture<MusicSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
