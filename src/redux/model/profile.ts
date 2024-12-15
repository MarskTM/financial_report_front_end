export interface Profile {
  id?: number;
  user_id?: number;
  first_name?: string;
  last_name?: string;
  alias?: string;
  email?: string;
  phone?: string;
  birthdate?: Date | null;
  other_links?: string;
  address?: string;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
