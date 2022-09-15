import { User } from './user.type.js';

export type Film = {
  name: string;
  description: string;
  postDate: Date;
  genre: string;
  releaseDate: number;
  rating: number;
  videoPreviewSrc: string;
  videoSrc: string;
  actors: string[];
  director: string;
  duration: number;
  commentsCount: number;
  user: User;
  posterSrc: string;
  backgroundImgSrc: string;
  backgroundColor: string;
}
