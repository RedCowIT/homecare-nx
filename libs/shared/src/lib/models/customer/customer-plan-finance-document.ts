export interface CustomerPlanFinanceDocument {
  id: number;
  customerPlanId: number;
  title: string;
  customerName: string;
  dob: string;
  phone1: string;
  phone2: string;
  email1: string;
  email2: string;
  residentialStatus: number;
  currentAddressLessThanThree: boolean;
  currentAddress1: string;
  currentAddress2: string;
  currentAddress3: string;
  currentAddress4: string;
  currentPostcode: string;
  previousAddress1: string;
  previousAddress2: string;
  previousAddress3: string;
  previousAddress4: string;
  previousPostcode: string;
  employmentStatusId: number;
  employmentStatusTimeId: number;
  occupation: string;
  productId: number;
  productDescription: string;
  price: number;
  deposit: number;
  monthPeriodId: number;
  loan: number;
  interestRate: number;
  interest: number;
  totalPayable: 0;
  monthlyPayment: 0;
  signatureName: string;
  signatureDate: string;
  signatureJSON: string;
  signatureBase64: string;
}

export function isValidCustomerPlanFinanceDocument(doc: CustomerPlanFinanceDocument): boolean {
  return doc.customerPlanId &&
  doc.title &&
  doc.customerName && doc.customerName !== '',
  doc.dob && doc.dob !== '' &&
  doc.employmentStatusId &&
  doc.employmentStatusTimeId &&
  doc.residentialStatus &&
  doc.occupation && doc.occupation !== '' &&
  doc.signatureName && doc.signatureName !== '';
}
