/*
* @poppinss/data-models
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { Exception } from '@poppinss/utils'
import { isObject, StaticImplements } from '../utils'
import { proxyHandler } from './proxyHandler'
import {
  ColumnNode,
  AdapterContract,
  ModelContract,
  ModelConstructorContract,
  ComputedNode,
} from '../Contracts'

/**
 * Abstract class to define fully fledged data models
 */
@StaticImplements<ModelConstructorContract>()
export abstract class BaseModel implements ModelContract {
  /**
   * The adapter to be used for persisting and fetching data
   */
  public static $adapter: AdapterContract

  /**
   * Primary key is required to build relationships across models
   */
  public static $primaryKey: string

  /**
   * Whether or not the model has been booted. Booting the model initializes it's
   * static properties. Base models must not be initialized.
   */
  public static $booted: boolean

  /**
   * A set of properties marked as computed. Computed properties are included in
   * the `toJSON` result, else they behave the same way as any other instance
   * property.
   */
  public static $computed: Map<string, ComputedNode>

  /**
   * Columns makes it easier to define extra props on the model
   * and distinguish them with the attributes to be sent
   * over to the adapter
   */
  public static $columns: Map<string, ColumnNode>

  /**
   * Mappings are required, so that we can quickly lookup serializing
   * and normalizing names for columns.
   */
  private static _mappings: {
    serialize: Map<string, string>,
    cast: Map<string, string>,
  }

  /**
   * Create a model instance from the adapter result. The result value must
   * be a valid object, otherwise `null` is returned.
   */
  public static $createFromAdapterResult<T extends ModelContract> (
    this: new () => T,
    adapterResult: any,
  ): T | null {
    if (!isObject(adapterResult)) {
      return null
    }

    const instance = new this()
    instance.$consumeAdapterResult(adapterResult)
    instance.$hydrateOriginals()
    instance.$persisted = true
    instance.$isLocal = false
    return instance
  }

  /**
   * Creates an array of models from the adapter results. The `adapterResults`
   * must be an array with valid Javascript objects.
   *
   * 1. If top level value is not an array, then an empty array is returned.
   * 2. If row is not an object, then it will be ignored.
   */
  public static $createMultipleFromAdapterResult<T extends ModelContract> (
    this: new () => T,
    adapterResults: any[],
  ): T[] {
    if (!Array.isArray(adapterResults)) {
      return []
    }

    return adapterResults.reduce((models: T[], row) => {
      if (isObject(row)) {
        models.push(this['$createFromAdapterResult'](row))
      }
      return models
    }, [])
  }

  /**
   * Boot the model
   */
  public static $boot () {
    if (this.$booted) {
      return
    }

    this.$booted = true
    this.$primaryKey = this.$primaryKey || 'id'
    Object.defineProperty(this, '$columns', { value: new Map() })
    Object.defineProperty(this, '$computed', { value: new Map() })
    Object.defineProperty(this, '_mappings', {
      value: {
        serialize: new Map(),
        cast: new Map(),
      },
    })
  }

  /**
   * Define a new column on the model. This is required, so that
   * we differentiate between plain properties vs model attributes.
   */
  public static $addColumn (name: string, options: Partial<ColumnNode>) {
    const descriptor = Object.getOwnPropertyDescriptor(this.prototype, name)

    const column: ColumnNode = {
      castAs: options.castAs || name,
      serializeAs: options.serializeAs || name,
      nullable: options.nullable || false,
      primary: options.primary || false,
      hasGetter: !!(descriptor && descriptor.get),
      hasSetter: !!(descriptor && descriptor.set),
    }

    if (column.primary) {
      this.$primaryKey = name
    }

    this.$columns.set(name, column)
    this._mappings.cast.set(column.castAs!, name)
    this._mappings.serialize.set(column.serializeAs!, name)
  }

  /**
   * Returns a boolean telling if column exists on the model
   */
  public static $hasColumn (name: string): boolean {
    return this.$columns.has(name)
  }

  /**
   * Returns the column for a given name
   */
  public static $getColumn (name: string): ColumnNode | undefined {
    return this.$columns.get(name)
  }

  /**
   * Adds a computed node
   */
  public static $addComputed (name: string, options: Partial<ComputedNode>) {
    const column: ComputedNode = {
      serializeAs: options.serializeAs || name,
    }
    this.$computed.set(name, column)
  }

  /**
   * Find if some property is marked as computed
   */
  public static $hasComputed (name: string): boolean {
    return this.$computed.has(name)
  }

  /**
   * Get computed node
   */
  public static $getComputed (name: string): ComputedNode | undefined {
    return this.$computed.get(name)
  }

  /**
   * Returns a fresh instance of model by applying attributes
   * to the model instance
   */
  public static create<T extends ModelContract> (this: new () => T): T {
    return new this()
  }

  /**
   * Find model instance using a key/value pair
   */
  public static async findBy<T extends ModelContract> (
    this: new () => T,
    key: string,
    value: any,
  ): Promise<null | T> {
    return this['$adapter'].find(this, key, value)
  }

  /**
   * Create a array of model instances from the adapter result
   */
  public static async findAll <T extends ModelContract> (this: new () => T): Promise<T[]> {
    return this['$adapter'].findAll(this)
  }

  constructor () {
    return new Proxy(this, proxyHandler)
  }

  /**
   * Raises exception when mutations are performed on a delete model
   */
  private _ensureIsntDeleted () {
    if (this.$isDeleted) {
      throw new Exception('Cannot mutate delete model instance', 500, 'E_MODEL_DELETED')
    }
  }

  /**
   * Set attribute
   */
  protected $setAttribute (key: string, value: any) {
    this._ensureIsntDeleted()
    this.$attributes[key] = value
  }

  /**
   * Get value of attribute
   */
  protected $getAttribute (key: string): any {
    return this.$attributes[key]
  }

  /**
   * Returns the constructor for the model.
   */
  protected $getConstructor<T extends typeof BaseModel> (): T {
    return this.constructor as T
  }

  /**
   * Preparing the object to be sent to the adapter. We need
   * to create the object with the property names to be
   * used by the adapter.
   */
  protected $prepareForAdapter (attributes: any) {
    const Model = this.$getConstructor()
    return Object.keys(attributes).reduce((result, key) => {
      result[Model.$getColumn(key)!.castAs] = attributes[key]
      return result
    }, {})
  }

  /**
   * A copy of attributes that will be sent over to adapter
   */
  public $attributes: any = {}

  /**
   * Original represents the properties that already has been
   * persisted or loaded by the adapter.
   */
  public $original: any = {}

  /**
   * Persisted means the model has been persisted with the adapter. This will
   * also be true, when model instance is created as a result of fetch
   * call from the adapter.
   */
  public $persisted: boolean = false

  /**
   * Once deleted the model instance cannot make calls to the adapter
   */
  public $isDeleted: boolean = false

  /**
   * Opposite of [[this.$persisted]]
   */
  public $isNew: boolean = !this.$persisted

  /**
   * `$isLocal` tells if the model instance was created locally vs
   * one generated as a result of fetch call from the adapter.
   */
  public $isLocal: boolean = true

  /**
   * Returns dirty properties of a model by doing a diff
   * between original values and current attributes
   */
  public get $dirty (): any {
    return Object.keys(this.$attributes).reduce((result, key) => {
      const value = this.$attributes[key]
      const originalValue = this.$original[key]

      if (originalValue !== value) {
        result[key] = value
      }

      return result
    }, {})
  }

  /**
   * Finding if model is dirty with changes or not
   */
  public get $isDirty () {
    return Object.keys(this.$dirty).length > 0
  }

  /**
   * Persisting the model with adapter insert/update results. This
   * method is invoked after adapter insert/update action.
   */
  public $consumeAdapterResult (adapterResult: any) {
    const Model = this.$getConstructor()

    /**
     * Merge result of adapter with the attributes. This enables
     * the adapter to hydrate models with properties generated
     * as a result of insert or update
     */
    if (isObject(adapterResult)) {
      Object.keys(adapterResult).forEach((key) => {
        /**
         * The adapter will return the values as per `normalizeAs` key. We
         * need to pull the actual column name for that key and then
         * set the value.
         *
         * Key/value that are not part of defined columns will be ignored
         * silently.
         */
        const columnName = Model._mappings.cast.get(key)
        if (columnName) {
          this.$setAttribute(columnName, adapterResult[key])
        }
      })
    }
  }

  /**
   * Sync originals with the attributes. After this `isDirty` will
   * return false
   */
  public $hydrateOriginals () {
    this.$original = Object.assign({}, this.$attributes)
  }

  /**
   * Perform save on the model instance to commit mutations.
   */
  public async save () {
    this._ensureIsntDeleted()
    const Model = this.$getConstructor()

    /**
     * Persit the model when it's not persisted already
     */
    if (!this.$persisted) {
      await Model.$adapter.insert(this, this.$prepareForAdapter(this.$attributes))
      this.$hydrateOriginals()
      this.$persisted = true
      return
    }

    const dirty = this.$dirty

    /**
     * Do not issue updates when model doesn't have any mutations
     */
    if (!Object.keys(dirty).length) {
      return
    }

    /**
     * Perform update
     */
    await Model.$adapter.update(this, this.$prepareForAdapter(dirty))
    this.$hydrateOriginals()
    this.$persisted = true
  }

  /**
   * Perform delete by issuing a delete request on the adapter
   */
  public async delete () {
    this._ensureIsntDeleted()
    const Model = this.$getConstructor()
    await Model.$adapter.delete(this)
    this.$isDeleted = true
  }

  /**
   * Converting model to it's JSON representation
   */
  public toJSON () {
    const Model = this.$getConstructor()
    const results = {}

    Model.$computed.forEach((value, key) => {
      results[value.serializeAs] = this[key]
    })

    Object.keys(this.$attributes).forEach((key) => {
      results[Model.$getColumn(key)!.serializeAs] = this.$attributes[key]
    })

    return results
  }
}
