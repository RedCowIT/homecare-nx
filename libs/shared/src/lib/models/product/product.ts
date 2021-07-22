export interface Product {
  id: number;
  categoryId: number;
  rangeId?: number;
  description: string;
  productCode: string;
  vatStatusId: number;
  defaultPrice: number;
  link: number;
}
