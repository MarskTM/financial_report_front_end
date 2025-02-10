import { Label } from "@/components/ui/label";
// -------------------------------- Tiding Model --------------------------------
export interface TidingModel {
  id?: number;
  parent_id?: number;
  category?: string;
  title?: string;
  content?: string;
  images?: string[];
  state?: boolean;
  prev_content?: string;
  prev_image?: string;
  label?: string;
  view?: number;
  tidings?: TidingModel[];
  created_at?: Date;
  updated_at?: Date;
}

export interface TidingItem {
  id: number;
  key: string;
  title: string;
  type: string;
  createdDate: string;
  updatedDate: string;
  content: string;
}
