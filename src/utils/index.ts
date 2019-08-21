/*
* @poppinss/data-models
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * Returns whether value is valid object or not
 */
export function isObject (value: any): boolean {
  return value && value.constructor.name === 'Object'
}

/**
 * Decorator to enforce static interface
 */
export function StaticImplements<T> () {
  return (_t: T) => {}
}
