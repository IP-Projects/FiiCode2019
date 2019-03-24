// type: 1 - private, 0 - public
//id is guid
//keywords is a csv
//extension: image, svg, youtube, audio, video
// data is a mime type data string

// on post all ids that concern the object will be null
// if your app will not have users, you will just have to send any string for userId
//given the fact that you have an appropriate back-end and database

export interface ICollection {
  id: string;
  name: string;
  userId: string;
  type: number;
  keywords: string;
  placeholder: IPlaceholder[];
}

export interface IEntityFile {
  id: string;
  name: string;
  placeholderId: string;
  extension: string;
  isUrl: boolean;
  data: string;
}

export interface IPlaceholder {
  id: string;
  name: string;
  collectionId: string;
  keywords: string;
  data: string;
  extension: string;
  entityFile: IEntityFile[];
}
