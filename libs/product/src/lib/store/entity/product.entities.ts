import {Policy} from "@homecare/shared";
import {createStringKeyComparer} from "@homecare/common";

export enum ProductEntity {
  ApplianceModel = 'ApplianceModel',
  AppliancePriceRange = 'AppliancePriceRange',
  ApplianceType = 'ApplianceType',
  ApplianceBrand = 'ApplianceBrand',
  CommercialProduct = 'CommercialProduct',
  Manufacturer = 'Manufacturer',
  Product = 'Product',
  ProductCategory = 'ProductCategory'
}

export function sortPolicy(a: Policy, b: Policy): number {
  return a.order - b.order;
}

export const productEntityMetadata = {
  [ProductEntity.ApplianceModel]: {
    sortComparer: createStringKeyComparer('description')
  },
  [ProductEntity.AppliancePriceRange]: {},
  [ProductEntity.ApplianceType]: {
    sortComparer: createStringKeyComparer('description')
  },
  [ProductEntity.ApplianceBrand]: {
    sortComparer: createStringKeyComparer('description')
  },
  [ProductEntity.CommercialProduct]: {},
  [ProductEntity.Manufacturer]: {
    sortComparer: createStringKeyComparer('description')
  },
  [ProductEntity.Product]: {
    sortComparer: createStringKeyComparer('description')
  },
  [ProductEntity.ProductCategory]: {
    sortComparer: createStringKeyComparer('description')
  },
}
