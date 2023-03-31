export interface MuiDateTimeParams {
  $D: number;
  $H: number;
  $L: string;
  $M: number;
  $W: number;
  $d: Date;
  $m: number;
  $ms: number;
  $s: number;
  $u: undefined;
  $x: unknown;
}

export type AnchorElType = null | HTMLElement;

export interface User {
  username: string;
  password: string;
}

export interface News {
  id: string;
  companySigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string;
  employeeSignatureName: string;
}
