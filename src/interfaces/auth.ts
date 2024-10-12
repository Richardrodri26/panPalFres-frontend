

export interface LoginInterface {
  id:       string;
  email:    string;
  // password: string;
  token:    string;
}

export interface ValidateUserResponse {
  email:    string;
  fullName: string;
  id:       string;
  isActive: boolean;
  roles:    string[];
  token:    string;
}
