import {Policy, ProductStock} from "@homecare/shared";
import {createStringKeyComparer} from "@homecare/common";

export enum ProductEntity {
  ApplianceModel = 'ApplianceModel',
  AppliancePriceRange = 'AppliancePriceRange',
  ApplianceType = 'ApplianceType',
  ApplianceInstallType = 'ApplianceInstallType',
  ApplianceFuelType = 'ApplianceFuelType',
  ApplianceTumbleDryerType = 'ApplianceTumbleDryerType',
  ApplianceBrand = 'ApplianceBrand',
  CommercialProduct = 'CommercialProduct',
  Manufacturer = 'Manufacturer',
  Product = 'Product',
  ProductCategory = 'ProductCategory',
  ProductStock = 'ProductStock'
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
  [ProductEntity.ApplianceInstallType]: {
    sortComparer: createStringKeyComparer('description')
  },
  [ProductEntity.ApplianceFuelType]: {
    sortComparer: createStringKeyComparer('description')
  },
  [ProductEntity.ApplianceTumbleDryerType]: {
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
  [ProductEntity.ProductStock]: {
    selectId: (productStock: ProductStock) => productStock.productId
  }
}
