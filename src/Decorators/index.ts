/*
* @poppinss/data-models
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import 'reflect-metadata'
import { ColumnNode, ComputedNode, ModelConstructorContract } from '../Contracts'

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
  return function decorateAsColumn (target, property: string) {
    const Model = target.constructor as ModelConstructorContract

    Model.$boot()
    Model.$addComputed(property, column || {})
  }
}
