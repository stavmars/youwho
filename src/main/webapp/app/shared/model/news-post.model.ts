export interface INewsPost {
  id?: string;
  content?: string;
  previewImageContentType?: string;
  previewImage?: any;
  previewTitle?: string;
}

export const defaultValue: Readonly<INewsPost> = {};
