export interface PlanType {
  id: number;

  /** @example Vacuum Service Plan */
  description: string;

  appImgURL: string;

  /** Available to add as 'other plan' **/
  commercial: boolean;
}
