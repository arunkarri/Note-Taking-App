

export interface Notes {
 active:Note;
  list:Note[]
}
export interface Note {
  id: number;
  title: string;
  description: string;
  createdTime: any;
}
