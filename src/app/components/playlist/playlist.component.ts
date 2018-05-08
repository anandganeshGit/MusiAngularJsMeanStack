import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {MusicSearchService} from '../../service/music-search.service';
import {TrackModel} from '../../models/track-model';
import {MatTableDataSource} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  moduleId: module.id,
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  tracks: TrackModel[];

  displayedColumns = ['cover', 'artistName', 'name', 'popularity', 'album'];
  dataSource = new MatTableDataSource<TrackModel>(); // new MatTableDataSource(this.searchResTrack);
  constructor(private musSerSerObj: MusicSearchService,  public sanitizer: DomSanitizer, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.getTracks();
    this.cdr.detectChanges();
  }

 
deleteRecord(track: TrackModel): void {
   this.tracks = this.tracks.filter(t => t !== track);
   this.musSerSerObj.deleteTrack(track).subscribe();
   this.getTracks();

/*    swal({
     type: 'error',
     title: 'Track deleted',
     showConfirmButton: false,
     timer: 1900
   }).catch(function (timeout) {
     if (timeout === 'timer') {
     }
   });*/

 }

  

  getTracks(): void {
    this.musSerSerObj.getTracks()
      .subscribe(tracks => this.tracks = tracks);
    console.log(this.tracks.length +'  okok   '+ this.tracks);
    this.dataSource = new MatTableDataSource(this.tracks);
  }
}
