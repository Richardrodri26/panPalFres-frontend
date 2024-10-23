import { ValidateUserResponse } from "./auth";

export interface Transaction {
  type: string;
  user: ValidateUserResponse;
  id:   string;
}