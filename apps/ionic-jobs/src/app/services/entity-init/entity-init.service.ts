import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {AppInitHandler} from '@homecare/shared';
import {EntityDefinitionService} from "@ngrx/data";
import {AppointmentEntity, appointmentEntityMetadata} from "@homecare/appointment";
import {EntitySyncService} from "@homecare/entity";
import {coreEntityMetadata} from "@homecare/core";
import {CustomerEntity, customerEntityMetadata} from "@homecare/customer";
import {PlanEntity, planEntityMetadata} from "@homecare/plan";
import {ProductEntity, productEntityMetadata} from "@homecare/product";
import {BillingEntity, billingEntityMetadata} from "@homecare/billing";
import {DocumentEntity, documentEntityMetadata} from "@homecare-nx/document";

/**
 * Registers NGRX metadata before anything else
 */
@Injectable({
  providedIn: 'root'
})
export class EntityInitService implements AppInitHandler {

  /**
   * All application entity meta data
   */
  static readonly entityMetadata = [
    coreEntityMetadata,
    appointmentEntityMetadata,
    billingEntityMetadata,
    customerEntityMetadata,
    planEntityMetadata,
    productEntityMetadata,
    documentEntityMetadata
  ];

  /**
   * Entities we need to sync for working "offline".
   */
  static readonly syncEntities = [
    AppointmentEntity.AppointmentNoAnswerReason,
    AppointmentEntity.CallTypeClass,
    AppointmentEntity.CallType,
    AppointmentEntity.AppointmentStatus,
    BillingEntity.QuoteItemType,
    BillingEntity.InvoiceItemType,
    BillingEntity.InvoicePaymentType,
    BillingEntity.InvoiceStatus,
    CustomerEntity.EmploymentStatus,
    CustomerEntity.EmploymentStatusTime,
    CustomerEntity.ResidentialStatus,
    CustomerEntity.CustomerApplianceType,
    PlanEntity.FinancePlanPeriod,
    PlanEntity.PlanPaymentPeriod,
    PlanEntity.PlanType,
    PlanEntity.Plan,
    ProductEntity.AppliancePriceRange,
    ProductEntity.ApplianceType,
    ProductEntity.ApplianceInstallType,
    ProductEntity.ApplianceFuelType,
    ProductEntity.ApplianceTumbleDryerType,
    ProductEntity.ApplianceBrand,
    ProductEntity.CommercialProduct,
    ProductEntity.Product,
    ProductEntity.Manufacturer,
    ProductEntity.ApplianceModel,
    ProductEntity.ProductCategory,
    DocumentEntity.DocumentType,
    DocumentEntity.DocumentSubType,
    DocumentEntity.ReferenceSection,
    DocumentEntity.Reference
  ];

  constructor(private entityDefinitionService: EntityDefinitionService,
              private entitySyncService: EntitySyncService) {

    for (const metadata of EntityInitService.entityMetadata) {
      this.entityDefinitionService.registerMetadataMap(metadata);
    }

  }

  init(): void {

    for (const entityName of EntityInitService.syncEntities) {
      this.entitySyncService.registerEntity(entityName);
    }

  }

  waitUntilInitialized(): Observable<any> {

    return of(true);

  }

}
