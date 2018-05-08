import {AlbumModel} from './album-model';
import {ArtistModel} from './artist-model';


export class TrackModel {
  id: number;
  trackID: string;
  name: string;
  album: AlbumModel;
  artists: ArtistModel[];
  popularity: string;
  widgetURL: string;
}
