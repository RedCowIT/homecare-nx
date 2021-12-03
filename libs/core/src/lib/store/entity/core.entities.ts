import {Policy} from "@homecare/shared";

export enum CoreEntity {
  AppDataId = 'AppDataId',
  Policy = 'Policy'
}

export function sortPolicy(a: Policy, b: Policy): number {
  return a.order - b.order;
}

export const coreEntityMetadata = {
  [CoreEntity.AppDataId]: {},
  [CoreEntity.Policy]: {
    sortComparer: sortPolicy
  }
}
