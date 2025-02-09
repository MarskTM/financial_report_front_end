// -------------------------------- Tiding Model --------------------------------
export interface TidingModel {
  id?: number;
  parent_id?: number;
  category?: string;
  title?: string;
  content?: string;
  images?: string[];

  prev_content?: string;
  prev_image?: string;

  tidings?: TidingModel[];

  created_at: Date;
  updated_at: Date;
}

export interface TidingItem {
  key: string;
  title: string;
  type: string;
  createdDate: string;
  updatedDate: string;
  content: string;
}
