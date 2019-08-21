/*
* @poppinss/data-models
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { ModelConstructorContract } from '../Contracts'

/**
 * A proxy trap to add support for custom getters and setters
 */
export const proxyHandler = {
  get (target: any, key: any) {
    const Model = target.constructor as ModelConstructorContract
    const column = Model.$getColumn(key)

    /**
     * Forward prxoxy when value is not a column
     */
    if (!column || column.hasGetter) {
      return Reflect.get(target, key)
    }

    /**
     * Fallback to `getAttribute` function
     */
    return target.$getAttribute(key)
  },

  set (target: any, key: any, value: any) {
    const Model = target.constructor as ModelConstructorContract
    const column = Model.$getColumn(key)

    /**
     * Forward prxoxy when value is not a column
     */
    if (!column || column.hasSetter) {
      return Reflect.set(target, key, value)
    }

    /**
     * Fallback to `setAttribute` function
     */
    target.$setAttribute(key, value)
    return true
  },
}
