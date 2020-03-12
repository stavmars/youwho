export interface INewsPost {
  id?: string;
  content?: string;
  previewImageContentType?: string;
  previewImage?: any;
}

export const defaultValue: Readonly<INewsPost> = {};
