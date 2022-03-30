import { VNodeChild } from 'vue';

export interface BaseResponse<T = any> {
  message: string;
  status: number;
  timestamp: number;
  data: T;
}

export interface Page<T> {
  content: Array<T>;
  size: number;
  totalElements: number;
  totalPages: number;
}
interface Column<T> {
  title: string;
  key: string;
  render?: (rowData: T, rowIndex: number) => VNodeChild;
}

export type Columns<T> = Array<Column<T>>;
