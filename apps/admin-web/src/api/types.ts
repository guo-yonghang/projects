export interface CommonLoginParams {
  userName?: string;
  pwd?: string;
}

export interface LoginResult {
  access_token: string;
  user_id: number;
  name: string;
  admin_user_role_id?: string[];
  source_type: number;
  expires_in: number;
}

export interface MenuPermResult {
  [key: string]: any;
}
