export interface DocumentSubType {
  id: number;
  documentTypeId: number;
  description: string;
}

export enum DocumentSubTypes {
  BeforePic = 'Before Pic',
  AfterPic = 'After Pic'
}
