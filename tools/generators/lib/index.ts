import {chain, Rule} from '@angular-devkit/schematics';
import {bootstrapModuleRules, initLibRule, initModuleRule} from '../common-schematics';


export default function (schema: any): Rule {

  // add Create lib rule here
  let rules = [
    initLibRule(schema)
  ];

  schema.project = schema.name;

  rules = rules.concat(bootstrapModuleRules(schema, 'lib'));

  return chain(rules);
}
