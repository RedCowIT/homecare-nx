export interface AppointmentVisit {
  id: number;
  appointmentId: number;
  customerId: number;
  customerComments: string;
  shampooComments: string;
  ovenComments: string;
  engineerRating: number;
  qIndependentCompany: boolean;
  qServiceCost: boolean;
  qWashFilters: string;
  qEfficiency: boolean;
  qParts: boolean;
  preInspectionSignatureJSON: string;
  signatureName: string;
  signatureJSON: string;
}
