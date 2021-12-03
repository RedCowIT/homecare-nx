export interface Customer {
  id: number;
  customerTypeId: number;
  name: string;
  titleId: number;
  phone1: string;
  phone2: string;
  email1: string;
  email2: string;
  DOB: string;
  DDReference: string;
}

export function getCustomerEmail(customer: Customer): string {
  return customer.email1 ? customer.email1 : customer.email2;
}

export function getCustomerPhone(customer: Customer): string {
  return customer.phone1 ? customer.phone1 : customer.phone2;
}
