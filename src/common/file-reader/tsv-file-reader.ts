import { readFileSync } from 'fs';
import { Film } from '../../types/film.type.js';
import { FileReaderInterface } from './file-reader.interface.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Film[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([name, description, createdDate, genre, releaseDate, rating, videoPreviewSrc, videoSrc, actors, director, duration, commentsCount, userName, email, avatarPath, password, posterSrc, backgroundImgSrc, backgroundColor]) => ({
        name,
        description,
        postDate: new Date(createdDate),
        genre,
        releaseDate: Number.parseInt(releaseDate, 10),
        rating: Number.parseInt(rating, 10),
        videoPreviewSrc,
        videoSrc,
        actors: actors.split(' ')
          .map((actorName) => actorName),
        director,
        duration: Number.parseInt(duration, 10),
        commentsCount: Number.parseInt(commentsCount, 10),
        user: { name: userName, email, avatarPath, password },
        posterSrc,
        backgroundImgSrc,
        backgroundColor,
      }));
  }
}
