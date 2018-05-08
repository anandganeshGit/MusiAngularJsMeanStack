import {AlbumModel} from './album-model';

export class ArtistModel {
  id: number;
  name: String;
  genre: any;
  albums: AlbumModel[];
  artistId: string;
}
