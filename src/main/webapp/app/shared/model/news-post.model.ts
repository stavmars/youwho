import { Moment } from 'moment';

export interface INewsPost {
  id?: string;
  content?: string;
  previewImageContentType?: string;
  previewImage?: any;
  previewTitle?: string;
  postDate?: Moment;
}

export const defaultValue: Readonly<INewsPost> = {};
