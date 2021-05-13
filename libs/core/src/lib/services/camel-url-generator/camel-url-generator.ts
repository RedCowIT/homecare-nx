import {DefaultHttpUrlGenerator, HttpResourceUrls, normalizeRoot, Pluralizer} from '@ngrx/data';
import voca from 'voca';

/**
 * Default NgRx HttpUrlGenerator lowercases all entity urls. It also uses different
 * urls between singular and plural. This generator ensures all entities use singular,
 * camel case urls.
 */
export class CamelUrlGenerator extends DefaultHttpUrlGenerator {

  private pluralizerImp: Pluralizer;

  constructor(pluralizer: Pluralizer){
    super(pluralizer);
    this.pluralizerImp = pluralizer;
  }

  protected getResourceUrls(entityName: string, root: string): HttpResourceUrls {

    let resourceUrls = this.knownHttpResourceUrls[entityName];

    if (!resourceUrls) {
      const nRoot = normalizeRoot(root);
      resourceUrls = {
        entityResourceUrl: `${nRoot}/${voca.camelCase(this.pluralizerImp.pluralize(
          entityName
        ))}/`,
        collectionResourceUrl: `${nRoot}/${voca.camelCase(this.pluralizerImp.pluralize(
          entityName
        ))}/`
      };
      this.registerHttpResourceUrls({ [entityName]: resourceUrls });
    }
    return resourceUrls;
  }
}
