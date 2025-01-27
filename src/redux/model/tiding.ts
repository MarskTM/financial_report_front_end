// -------------------------------- Tiding Model --------------------------------
export interface TidingModel {
  id: string;
  title: string;
  content: string;
  sub_subcontent: string;
  category: string;
  body: string;
  created_at: Date;
  deleted_at: Date;
}

export interface TidingItem {
  key: string;
  title: string;
  type: string;
  createdDate: string;
  updatedDate: string;
  content: string;
}