import {TableSourceService} from "@homecare/common";
import {CustomerAppliancesService} from "../store/entity/services/customer-appliances/customer-appliances.service";
import {map} from "rxjs/operators";
import {ApplianceModelsService, ApplianceTypesService, ManufacturersService} from "@homecare/product";
import {combineLatest} from "rxjs";
import {Injectable} from "@angular/core";
import {CustomerApplianceTypesService} from "../store/entity/services/customer-appliance-types/customer-appliance-types.service";

@Injectable()
export class CustomerApplianceTableService extends TableSourceService {

  customerId: number;

  hasInitialized: boolean;

  constructor(private customerAppliancesService: CustomerAppliancesService,
              private manufacturersService: ManufacturersService,
              private applianceTypesService: CustomerApplianceTypesService,
              private applianceModelsService: ApplianceModelsService) {
    super();
  }

  init(customerId: number) {

    this.customerId = customerId;

    this.columns = [
      {prop: 'type', flexGrow: 1},
      {prop: 'make', flexGrow: 1},
      {prop: 'model', flexGrow: 1},
      {prop: 'serial', flexGrow: 1}
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
    this.customerAppliancesService.getWithQuery({
        'customerId': `${this.customerId}`
      },
      {
        tag: 'CustomerApplianceTable'
      }
    );
  }
}
