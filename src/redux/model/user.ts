import { Profile, FinancialReportModel, DocumentModel } from '../model';

// ------------------------------- Authentication model ---------------------------
export interface User {
	id?: number;
	username: string;
	role: string;

	profile?: Profile;
}

export interface UserReport {
	id?: number;
	profile_id?: number;
	document_id?: number;

	name?: string;
	category?: string;
	date?: Date;

	reports?: FinancialReportModel[];
	document?: DocumentModel;

	created_at?: Date;
	updated_at?: Date;
	deleted_at?: Date;
}