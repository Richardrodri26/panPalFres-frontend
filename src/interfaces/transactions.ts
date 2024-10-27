import { ValidateUserResponse } from "./auth";
import { ProductInterface } from "./product";

export interface Transaction {
  id:                string;
  type:              Type;
  createdAt:         string;
  updatedAt:         string;
  transactionDetail: TransactionDetail[];
  user:              ValidateUserResponse;
}

export enum Type {
  Egreso = "egreso",
  Ingreso = "ingreso",
}

export interface TransactionDetail {
  id:       string;
  quantity: number;
  product:  ProductInterface;
}
