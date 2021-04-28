import {chain, Rule} from '@angular-devkit/schematics';
import {bootstrapModuleRules, initModuleRule} from '../common-schematics';


export default function (schema: any): Rule {
  let rules = [initModuleRule(schema)];

  rules = rules.concat(bootstrapModuleRules(schema, 'lib', schema.name));

  return chain(rules);
}
