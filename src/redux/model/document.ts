export interface DocumentModel {
	id?: number;
	title?: string;
	short_name?: string;
	cdn?: string;
	description?: string;
    
	created_at?: Date;
	updated_at?: Date;
	deleted_at?: Date;
}
