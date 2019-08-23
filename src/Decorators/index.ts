/*
* @poppinss/data-models
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import 'reflect-metadata'
import {
  ColumnNode,
  ComputedNode,
  ModelConstructorContract,
  ManyToManyNode,
  HasManyNode,
  BelongsToNode,
  HasOneNode,
  HasManyThrough,
  HasOneThrough,
} from '../Contracts'

/**
 * Define property on a model as a column. The decorator needs a
 * proper model class inheriting the base model
 */
export function column (column?: Partial<ColumnNode>) {
  return function decorateAsColumn (target, property: string) {
    const Model = target.constructor as ModelConstructorContract
    Model.$boot()
    Model.$addColumn(property, column || {})
  }
}

/**
 * Define computed property on a model. The decorator needs a
 * proper model class inheriting the base model
 */
export function computed (column?: Partial<ComputedNode>) {
  return function decorateAsComputed (target, property: string) {
    const Model = target.constructor as ModelConstructorContract

    Model.$boot()
    Model.$addComputed(property, column || {})
  }
}

/**
 * Define belongsTo relationship
 */
export function belongsTo (relation?: Partial<BelongsToNode>) {
  return function decorateAsRelation (target, property: string) {
    const Model = target.constructor as ModelConstructorContract
    Model.$boot()
    Model.$addRelation(property, 'belongsTo', relation || {})
  }
}

/**
 * Define hasOne relationship
 */
export function hasOne (relation?: Partial<HasOneNode>) {
  return function decorateAsRelation (target, property: string) {
    const Model = target.constructor as ModelConstructorContract
    Model.$boot()
    Model.$addRelation(property, 'hasOne', relation || {})
  }
}

/**
 * Define hasMany relationship
 */
export function hasMany (relation?: Partial<HasManyNode>) {
  return function decorateAsRelation (target, property: string) {
    const Model = target.constructor as ModelConstructorContract
    Model.$boot()
    Model.$addRelation(property, 'hasMany', relation || {})
  }
}

/**
 * Define manyToMany relationship
 */
export function manyToMany (relation?: Partial<ManyToManyNode>) {
  return function decorateAsRelation (target, property: string) {
    const Model = target.constructor as ModelConstructorContract
    Model.$boot()
    Model.$addRelation(property, 'manyToMany', relation || {})
  }
}

/**
 * Define hasOneThrough relationship
 */
export function hasOneThrough (relation?: Partial<HasOneThrough>) {
  return function decorateAsRelation (target, property: string) {
    const Model = target.constructor as ModelConstructorContract
    Model.$boot()
    Model.$addRelation(property, 'hasOneThrough', relation || {})
  }
}

/**
 * Define hasManyThrough relationship
 */
export function hasManyThrough (relation?: Partial<HasManyThrough>) {
  return function decorateAsRelation (target, property: string) {
    const Model = target.constructor as ModelConstructorContract
    Model.$boot()
    Model.$addRelation(property, 'hasManyThrough', relation || {})
  }
}
