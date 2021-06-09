export interface CallType {
  id: number;
  callTypeClassId: number;
  active: boolean;
  description: string;
  customerDescription: string;
  photoRequired: boolean;
  service: boolean;
  clean: boolean;
  carpet: boolean;
  vacuum: boolean;
}
