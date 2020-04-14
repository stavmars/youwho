import { Moment } from 'moment';

export interface INewsPost {
  id?: string;
  content?: string;
  previewImageContentType?: string;
  previewImage?: any;
  previewTitle?: string;
  published?: boolean;
  postDate?: Moment;
}

export const defaultValue: Readonly<INewsPost> = {};
