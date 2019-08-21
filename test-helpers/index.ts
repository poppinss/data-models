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
  ) {
    if (typeof (this._handlers[action]) === 'function') {
      return this._handlers[action](model)
    }
  }

  public on (action: 'insert', handler: ((model: ModelContract) => void)): void
  public on (action: 'update', handler: ((model: ModelContract) => void)): void
  public on (action: 'delete', handler: ((model: ModelContract) => void)): void
  public on (action: 'find', handler: ((model: ModelConstructorContract) => void)): void
  public on (action: 'findAll', handler: ((model: ModelConstructorContract) => void)): void
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

  public async find (model: ModelConstructorContract, key: string, value: any) {
    this.operations.push({ type: 'find', model, key, value })
    return this._invokeHandler('find', model)
  }

  public async findAll (model: ModelConstructorContract) {
    this.operations.push({ type: 'findAll', model })
    return this._invokeHandler('findAll', model)
  }
}

export function mapToObj<T extends any> (value: Map<any, any>): T {
  let obj = {} as T
  value.forEach((value, key) => {
    obj[key] = value
  })
  return obj
}
