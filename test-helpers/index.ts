/*
* @poppinss/data-models
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { AdapterContract, ModelContract, ModelConstructorContract } from '../src/Contracts'

export class FakeAdapter implements AdapterContract {
  public operations: any[] = []

  private _handlers: any = {
    insert: null,
    update: null,
    find: null,
    delete: null,
    findAll: null,
  }

  private _invokeHandler (
    action: keyof FakeAdapter['_handlers'],
    model: ModelContract | ModelConstructorContract,
    options?: any,
  ) {
    if (typeof (this._handlers[action]) === 'function') {
      return this._handlers[action](model, options)
    }
  }

  public on (action: 'insert', handler: ((model: ModelContract) => void)): void
  public on (action: 'update', handler: ((model: ModelContract) => void)): void
  public on (action: 'delete', handler: ((model: ModelContract) => void)): void
  public on (action: 'find', handler: ((model: ModelConstructorContract, options?: any) => void)): void
  public on (action: 'findAll', handler: ((model: ModelConstructorContract, options?: any) => void)): void
  public on (
    action: string,
    handler: ((model: ModelContract) => void) | ((model: ModelConstructorContract) => void),
  ): void {
    this._handlers[action] = handler
  }

  public async insert (instance: ModelContract, attributes: any) {
    this.operations.push({ type: 'insert', instance, attributes })
    return this._invokeHandler('insert', instance)
  }

  public async delete (instance: ModelContract) {
    this.operations.push({ type: 'delete', instance })
    return this._invokeHandler('delete', instance)
  }

  public async update (instance: ModelContract, attributes: any) {
    this.operations.push({ type: 'update', instance, attributes })
    return this._invokeHandler('update', instance)
  }

  public async find (model: ModelConstructorContract, key: string, value: any, options?: any) {
    const payload: any = { type: 'find', model, key, value }
    if (options) {
      payload.options = options
    }

    this.operations.push(payload)
    return this._invokeHandler('find', model, options)
  }

  public async findAll (model: ModelConstructorContract, options?: any) {
    const payload: any = { type: 'findAll', model }
    if (options) {
      payload.options = options
    }

    this.operations.push(payload)
    return this._invokeHandler('findAll', model, options)
  }
}

export function mapToObj<T extends any> (value: Map<any, any>): T {
  let obj = {} as T
  value.forEach((value, key) => {
    obj[key] = value
  })
  return obj
}
