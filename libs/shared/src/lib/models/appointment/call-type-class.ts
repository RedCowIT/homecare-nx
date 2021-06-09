export interface CallTypeClass {
  id: number;
  active: boolean;
  description: string;
}

export enum CallTypeClassDescription {
  Free = 'Free',
  Fresh = 'Fresh',
  NCO = 'NCO'
};
