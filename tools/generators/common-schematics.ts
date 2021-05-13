/**
 * Homecare - NX Schematics
 */

import {externalSchematic, Rule} from '@angular-devkit/schematics';
import * as path from "path";
import {stringUtils} from '@nrwl/workspace';
import {ExecutionOptions} from '@angular-devkit/schematics/src/engine/interface';

/**
 * Creates a path.
 *
 * If no content is specified, installs a .gitkeep in an empty directory.
 *
 * @param dir
 * @param content
 */
export function createPath<OptionT extends object>(dir: string, content = ''): Rule {
  return ((tree, context) => {
    if (content && content !== '') {
      return tree.create(dir, content);
    } else {
      return tree.create(path.join(dir, '.gitkeep'), '');
    }
  });
}

export function createAppPath(project: string, dir: string, content = ''): Rule {
  return createPath(path.join('apps', project, 'src', 'app', dir), content);
}

export function createLibPath(project: string, dir: string, content = ''): Rule {
  return createPath(path.join('libs', project, 'src', 'lib', dir), content);
}

export function createModulePath(type: 'app' | 'lib', project: string, baseDir: string, destination: string, content = ''): Rule {

  if (baseDir && baseDir !== ''){
    destination = path.join(baseDir, destination);
  }

  switch (type) {
    case 'app':
      return createAppPath(project, destination, content);
    case 'lib':
      return createLibPath(project, destination, content);
    default:
      throw new Error('Unsupported module type: ' + type + ', must be one of app|lib');
  }
}

export function initLibRule(schema: any): Rule {

  return externalSchematic('@nrwl/angular', 'lib', {
    name: schema.name
  });

}

export function initModuleRule(schema: any): Rule {
  return externalSchematic('@nrwl/angular', 'module', {
    name: schema.name,
    project: schema.project,
    routing: true,
  });
}


/**
 * Bootstraps an Angular module with optional store
 *
 * @param schema
 * @param type 'app'|'lib' Whether the module is in an app or a library project
 * @param baseDir
 */
export function bootstrapModuleRules(schema: any, type: 'app' | 'lib', baseDir = ''): Rule[] {

  let rules = [
    externalSchematic('@nrwl/angular', 'module', {
      name: path.join(baseDir, schema.name + '-components'),
      project: schema.project,
      module: schema.name
    }),
    createModulePath(type, schema.project, baseDir, 'pages'),
    createModulePath(type, schema.project, baseDir, 'models'),
    createModulePath(type, schema.project, baseDir, 'services')
  ];

  if (!schema['skipStore']) {

    //ng g @ngrx/schematics:effect -p <project> store/featureA -m <feature>.module.ts --group

    rules = [
      ...rules,
      externalSchematic('@ngrx/schematics', 'store', {
        name: path.join(baseDir, 'store'),
        project: schema.project,
        module: schema.name,
        statePath: path.join('store', 'reducers'),
        stateInterface: stringUtils.classify(schema.name) + 'State'
      }),
      externalSchematic('@ngrx/schematics', 'action', {
        name: path.join(baseDir, 'store', stringUtils.camelize(schema.name)),
        project: schema.project,
        group: true,
        defaults: true
      }),
      createModulePath(
        type,
        schema.project,
        baseDir,
        path.join('store', 'actions', 'index.ts'),
        'import * as ' + stringUtils.camelize(schema.name) + 'Actions from \'./' + stringUtils.dasherize(schema.name) + '.actions\';\n' +
        '\n' +
        'export {' + stringUtils.camelize(schema.name) + 'Actions};'),
      externalSchematic('@ngrx/schematics', 'effect', {
        name: path.join(baseDir, 'store', stringUtils.camelize(schema.name)),
        project: schema.project,
        module: schema.name,
        group: true,
        defaults: true
      }),
      createModulePath(type, schema.project, baseDir, path.join('store', 'selectors')),
    ];

  }

  return rules;

}


export function backupModules(schema: any, type: 'app' | 'lib', baseDir = ''): Rule[] {

  let rules = [
    externalSchematic('@nrwl/angular', 'module', {
      name: path.join(schema.name, schema.name + '-components'),
      project: schema.project,
      module: schema.name
    }),
    createModulePath(type, schema.project, baseDir, 'pages'),
    createModulePath(type, schema.project, baseDir, 'models'),
    createModulePath(type, schema.project, baseDir, 'services')
  ];

  if (!schema['skipStore']) {

    //ng g @ngrx/schematics:effect -p <project> store/featureA -m <feature>.module.ts --group

    rules = [
      ...rules,
      externalSchematic('@ngrx/schematics', 'store', {
        name: path.join(schema.name, 'store'),
        project: schema.project,
        module: schema.name,
        statePath: path.join('store', 'reducers'),
        stateInterface: stringUtils.classify(schema.name) + 'State'
      }),
      externalSchematic('@ngrx/schematics', 'action', {
        name: path.join(schema.name, 'store', stringUtils.camelize(schema.name)),
        project: schema.project,
        group: true,
        defaults: true
      }),
      createModulePath(
        type,
        schema.project,
        baseDir,
        path.join(schema.name, 'store', 'actions', 'index.ts'),
        'import * as ' + stringUtils.camelize(schema.name) + 'Actions from \'./' + stringUtils.dasherize(schema.name) + '.actions\';\n' +
        '\n' +
        'export {' + stringUtils.camelize(schema.name) + 'Actions};'),
      externalSchematic('@ngrx/schematics', 'effect', {
        name: path.join(schema.name, 'store', stringUtils.camelize(schema.name)),
        project: schema.project,
        module: schema.name,
        group: true,
        defaults: true
      }),
      createModulePath(type, schema.project, baseDir, path.join('store', 'selectors')),
    ];

  }

  return rules;

}
