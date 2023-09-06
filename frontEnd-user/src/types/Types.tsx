import { ReactNode } from "react";

export interface LoginRegisterFormProps {
  setIsShow: (value: boolean) => void;
}

export interface DefaultLayoutProps {
  children?: ReactNode;
  onFilteredOptionsApp?: (filteredOptions: any[]) => void;
}

export interface SlickSliderProps {
  slickPrev: () => void;
  slickNext: () => void;
}

export interface IErrorsRegister {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  birthday?: string;
}

export interface IErrorsLogin {
  email?: string;
  password?: string;
}

export interface INavibarProps {
  onFilteredOptions: (filteredOptions: any[]) => void;
}

export interface IProfile {
  id?: number | undefined;
  email?: string;
  password?: string;
  firstName?: string | undefined;
  lastName?: string | undefined;
  birthday?: string | undefined;
  oldPass?: string | undefined;
  newPass?: string | undefined;
  confirmPass?: string | undefined;
  role?: number;
  status?: number;
}

export interface IErrorsPayment {
  fullName?: string;
  email?: string;
  address?: string;
  phone?: string;
}
