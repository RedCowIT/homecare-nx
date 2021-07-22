import {TableSourceService} from "@homecare/common";
import {CustomerAppliancesService} from "../store/entity/services/customer-appliances/customer-appliances.service";
import {map} from "rxjs/operators";
import {ApplianceModelsService, ApplianceTypesService, ManufacturersService} from "@homecare/product";
import {combineLatest} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class CustomerApplianceTableService extends TableSourceService {

  customerId: number;

  hasInitialized: boolean;

  constructor(private customerAppliancesService: CustomerAppliancesService,
              private manufacturersService: ManufacturersService,
              private applianceTypesService: ApplianceTypesService,
              private applianceModelsService: ApplianceModelsService) {
    super();
  }

  init(customerId: number) {

    this.customerId = customerId;

    this.columns = [
      {prop: 'type'},
      {prop: 'make'},
      {prop: 'model'},
      {prop: 'serial'}
    ];

    this.rows$ = combineLatest([
      this.customerAppliancesService.entities$,
      this.applianceTypesService.entityMap$,
      this.applianceModelsService.entityMap$,
      this.manufacturersService.entityMap$
    ]).pipe(map(([
                   customerAppliances,
                   applianceTypeMap,
                   applianceModelMap,
                   manufacturerMap]) => {

        return customerAppliances.map(customerAppliance => {

          return {
            id: customerAppliance.id,
            type: applianceTypeMap[customerAppliance.applianceTypeId]?.description,
            make: customerAppliance.manufacturerId ? manufacturerMap[customerAppliance.manufacturerId]?.description :
              customerAppliance.manufacturerText,
            model: customerAppliance.modelId ? applianceModelMap[customerAppliance.modelId]?.description :
              customerAppliance.modelText,
            serial: customerAppliance.serialNo
          };
        });

      })
    );

    this.hasInitialized = true;
  }

  load() {
    this.customerAppliancesService.load({
      tag: 'CustomerApplianceTable'
    });
  }
}
