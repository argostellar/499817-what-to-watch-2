import { readFileSync } from 'fs';
import { Film } from '../../types/film.type.js';
import { User } from '../../types/user.type.js';
import { FileReaderInterface } from './file-reader.interface.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  private convertUserInfo(user: string): User {
    const userInfo = user.split(' ');
    const result: User = {
      name: '',
      email: '',
      avatarPath: '',
      password: '',
    };
    for (let i = 0; i < userInfo.length; i++) {
      result.name = userInfo[0];
      result.email = userInfo[1];
      result.avatarPath = userInfo[2];
      result.password = userInfo[3];
    }
    return result;
  }

  public toArray(): Film[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([name, description, createdDate, genre, releaseDate, rating, videoPreviewSrc, videoSrc, actors, director, duration, commentsCount, user, posterSrc, backgroundImgSrc, backgroundColor]) => ({
        name,
        description,
        postDate: new Date(createdDate),
        genre,
        releaseDate: Number.parseInt(releaseDate, 10),
        rating: Number.parseInt(rating, 10),
        videoPreviewSrc,
        videoSrc,
        actors: actors.split(', ')
          .map((actorName) => actorName),
        director,
        duration: Number.parseInt(duration, 10),
        commentsCount: Number.parseInt(commentsCount, 10),
        user: this.convertUserInfo(user),
        posterSrc,
        backgroundImgSrc,
        backgroundColor,
      }));
  }
}
