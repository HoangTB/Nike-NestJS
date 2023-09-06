import { ReactNode } from "react";
import { IProducts } from "../models/Product";

export interface DefaultLayoutProps {
  children: ReactNode;
}

export interface IErrors {
  email?: string;
  password?: string;
}

export interface IConfirmDeleteProps {
  handleCancel?: () => void;
  idDelete: number | null;
  handleLoading?: () => void;
}

export interface IFormCreate {
  handleCreate?: () => void;
  handleLoading?: () => void;
}
export interface IFormUpdate {
  handleEdit?: (id: number) => void;
  idUpdate?: number | null;
  dataEdit?: IProducts[];
  handleLoading?: () => void;
}
export interface IFormSuccess {
  closeSuccess?: () => void;
}

export interface IErrorsCreate {
  name?: string;
  type?: string;
  image?: string;
  price?: string;
  news?: string;
  quantityInventory?: string;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
}

export interface IStatusValue {
  status: number;
}
