/**
 * @module @poppinss/data-models
 */

/*
* @poppinss/data-models
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { Exception } from '@poppinss/utils'

import { ModelObject } from '../Contracts'
import { proxyHandler } from './proxyHandler'
import { isObject, StaticImplements } from '../utils'

import {
  CacheNode,
  ColumnNode,
  AdapterContract,
  ModelContract,
  ModelConstructorContract,
  ComputedNode,
  RelationNode,
  HasManyThrough,
  HasOneThrough,
  ResolverContract,
} from '../Contracts'

/**
 * Abstract class to define fully fledged data models
 * @module @poppinss/data-models
 */
@StaticImplements<ModelConstructorContract>()
export abstract class BaseModel implements ModelContract {
  /**
   * The adapter to be used for persisting and fetching data
   */
  public static $adapter: AdapterContract

  /**
   * An optional resolver to resolve entities
   */
  public static $resolver?: ResolverContract

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
   * Registered relationships for the given model
   */
  public static $relations: Map<string, RelationNode>

  /**
   * Mappings are required, so that we can quickly lookup serializing
   * and normalizing names for columns.
   */
  private static _mappings: {
    cast: Map<string, string>,
  }

  /**
   * Raises exception when related model is missing or not
   * defined as a fully qualified model
   */
  private static _validateRelatedModel (options: Partial<RelationNode>) {
    if (!options.relatedModel) {
      throw new Exception(
        'Related model reference is required for construct relationship',
        500,
        'E_MISSING_RELATED_MODEL',
      )
    }
  }

  /**
   * Raises exception when related model is missing or not
   * defined as a fully qualified model
   */
  private static _validateThroughModel (options: Partial<HasManyThrough> | Partial<HasOneThrough>) {
    if (!options.relatedModel) {
      throw new Exception(
        'Through model reference is required for construct through relationships',
        500,
        'E_MISSING_THROUGH_MODEL',
      )
    }
  }

  /**
   * Returns the cast as key for a given property
   */
  private static _getCastAsKey (propertyName: string, castAs?: string) {
    return castAs || (this.$resolver ? this.$resolver.getCastAsKey(propertyName) : propertyName)
  }

  /**
   * Returns the serialize as key for a given property
   */
  private static _getSerializeAsKey (propertyName: string, serializeAs?: string) {
    return serializeAs || (this.$resolver ? this.$resolver.getSerializeAsKey(propertyName) : propertyName)
  }

  /**
   * Create a model instance from the adapter result. The result value must
   * be a valid object, otherwise `null` is returned.
   */
  public static $createFromAdapterResult<T extends ModelContract> (
    this: new () => T,
    adapterResult: ModelObject,
    sideloadAttributes?: string[],
    options?: any,
  ): T | null {
    if (!isObject(adapterResult)) {
      return null
    }

    const instance = new this()
    instance.$consumeAdapterResult(adapterResult, sideloadAttributes)
    instance.$hydrateOriginals()
    instance.$persisted = true
    instance.$isLocal = false

    if (options) {
      instance.$options = options
    }

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
    adapterResults: ModelObject[],
    sideloadAttributes?: string[],
    options?: any,
  ): T[] {
    if (!Array.isArray(adapterResults)) {
      return []
    }

    return adapterResults.reduce((models, row) => {
      if (isObject(row)) {
        models.push(this['$createFromAdapterResult'](row, sideloadAttributes, options))
      }
      return models
    }, []) as T[]
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
    Object.defineProperty(this, '$relations', { value: new Map() })
    Object.defineProperty(this, '_mappings', {
      value: {
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
      castAs: this._getCastAsKey(name, options.castAs),
      serializeAs: this._getSerializeAsKey(name, options.serializeAs),
      nullable: options.nullable || false,
      primary: options.primary || false,
      hasGetter: !!(descriptor && descriptor.get),
      hasSetter: !!(descriptor && descriptor.set),
    }

    /**
     * Set column as the primary column, when `primary` is to true
     */
    if (column.primary) {
      this.$primaryKey = name
    }

    this.$columns.set(name, column)
    this._mappings.cast.set(column.castAs!, name)
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
   * Adds a relationship
   */
  public static $addRelation (
    name: string,
    type: RelationNode['type'],
    options: Omit<Partial<RelationNode>, 'type'>,
  ) {
    if (this.$resolver) {
      options = this.$resolver.processRelation(name, type, this, options)
    }

    this._validateRelatedModel(options)

    /**
     * Self constructing the relationship
     */
    let relation = {
      relatedModel: options.relatedModel,
      serializeAs: this._getSerializeAsKey(name, options.serializeAs),
      type,
    } as RelationNode

    /**
     * Add additional properties for hasOneThrough
     */
    if (type === 'hasOneThrough') {
      const throughOptions = options as HasOneThrough
      this._validateThroughModel(throughOptions)

      relation = relation as HasOneThrough
      relation.throughModel = throughOptions.throughModel
    }

    /**
     * Add additional properties for hasManyThrough
     */
    if (type === 'hasManyThrough') {
      const throughOptions = options as HasManyThrough
      this._validateThroughModel(throughOptions)

      relation = relation as HasManyThrough
      relation.throughModel = throughOptions.throughModel
    }

    this.$relations.set(name, relation)
  }

  /**
   * Find if some property is marked as a relation or not
   */
  public static $hasRelation (name: string): boolean {
    return this.$relations.has(name)
  }

  /**
   * Returns relationship node for a given relation
   */
  public static $getRelation<T extends RelationNode> (name: string): T | undefined {
    return this.$relations.get(name) as T
  }

  /**
   * Returns a fresh instance of model by applying attributes
   * to the model instance
   */
  public static create<T extends ModelContract> (
    this: new () => T,
    values: ModelObject,
  ): T {
    const instance = new this()
    instance.fill(values)
    return instance
  }

  /**
   * Find model instance using a key/value pair
   */
  public static async findBy<T extends ModelContract> (
    this: new () => T,
    key: string,
    value: any,
    options?: any,
  ): Promise<null | T> {
    return this['$adapter'].find(this, key, value, options)
  }

  /**
   * Create a array of model instances from the adapter result
   */
  public static async findAll <T extends ModelContract> (this: new () => T, options?: any): Promise<T[]> {
    return this['$adapter'].findAll(this, options)
  }

  constructor () {
    return new Proxy(this, proxyHandler)
  }

  /**
   * When `fill` method is called, then we may have a situation where it
   * removed the values which exists in `original` and hence the dirty
   * diff has to do a negative diff as well
   */
  private _fillInvoked: boolean = false

  /**
   * A copy of cached getters
   */
  private _cachedGetters: { [key: string]: CacheNode } = {}

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
   * Returns the attribute value from the cache which was resolved by
   * the mutated by a getter. This is done to avoid re-mutating
   * the same attribute value over and over again.
   */
  protected $getAttributeFromCache (key: string, callback: CacheNode['getter']): any {
    const original = this.$getAttribute(key)
    const cached = this._cachedGetters[key]

    /**
     * Return the resolved value from cache when cache original is same
     * as the attribute value
     */
    if (cached && cached.original === original) {
      return cached.resolved
    }

    /**
     * Re-resolve the value from the callback
     */
    const resolved = callback(original)

    if (!cached) {
      /**
       * Create cache entry
       */
      this._cachedGetters[key] = { getter: callback, original, resolved }
    } else {
      /**
       * Update original and resolved keys
       */
      this._cachedGetters[key].original = original
      this._cachedGetters[key].resolved = resolved
    }

    return resolved
  }

  /**
   * Returns the related model or default value when model is missing
   */
  protected $getRelated (key: string, defaultValue: any): any {
    return this.$preloaded[key] || defaultValue
  }

  /**
   * Preparing the object to be sent to the adapter. We need
   * to create the object with the property names to be
   * used by the adapter.
   */
  protected $prepareForAdapter (attributes: ModelObject) {
    const Model = this.constructor as typeof BaseModel
    return Object.keys(attributes).reduce((result, key) => {
      result[Model.$getColumn(key)!.castAs] = attributes[key]
      return result
    }, {})
  }

  /**
   * A copy of attributes that will be sent over to adapter
   */
  public $attributes: ModelObject = {}

  /**
   * Original represents the properties that already has been
   * persisted or loaded by the adapter.
   */
  public $original: ModelObject = {}

  /**
   * Preloaded relationships on the model instance
   */
  public $preloaded: { [relation: string]: ModelContract | ModelContract[] } = {}

  /**
   * Sideloaded are dynamic properties set on the model instance, which
   * are not serialized and neither casted for adapter calls.
   *
   * This is helpful when adapter or some other part of the application
   * want to add meta data to the models, without asking the user to
   * pre-define properties for them.
   */
  public $sideloaded: ModelObject = {}

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
   * Custom options defined on the model instance that are
   * passed to the adapter
   */
  public $options: any

  /**
   * Returns the value of primary key. The value must be
   * set inside attributes object
   */
  public get $primaryKeyValue (): any | undefined {
    const model = this.constructor as typeof BaseModel
    const column = model.$getColumn(model.$primaryKey)

    if (column && column.hasGetter) {
      return this[model.$primaryKey]
    }

    return this.$getAttribute(model.$primaryKey)
  }

  /**
   * Opposite of [[this.$persisted]]
   */
  public get $isNew (): boolean {
    return !this.$persisted
  }

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
    const processedKeys: string[] = []

    /**
     * Do not compute diff, when model has never been persisted
     */
    if (!this.$persisted) {
      return this.$attributes
    }

    const result = Object.keys(this.$attributes).reduce((result, key) => {
      const value = this.$attributes[key]
      const originalValue = this.$original[key]

      if (originalValue !== value) {
        result[key] = value
      }

      if (this._fillInvoked) {
        processedKeys.push(key)
      }

      return result
    }, {})

    /**
     * Find negative diff if fill was invoked, since we may have removed values
     * that exists in originals
     */
    if (this._fillInvoked) {
      Object.keys(this.$original)
        .filter((key) => !processedKeys.includes(key))
        .forEach((key) => {
          result[key] = null
        })
    }

    return result
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
  public $consumeAdapterResult (adapterResult: ModelObject, sideloadAttributes?: string[]) {
    const Model = this.constructor as typeof BaseModel

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

        /**
         * If key is defined as a relation, then set the related data
         */
        if (Model.$relations.has(key)) {
          this.$setRelated(key, adapterResult[key])
        }

        /**
         * Set as sideloaded when defined
         */
        if (sideloadAttributes && sideloadAttributes.includes(key)) {
          this.$sideloaded[key] = adapterResult[key]
        }
      })
    }
  }

  /**
   * Sets the related data on the model instance. The method internally handles
   * `one to one` or `many` relations
   */
  public $setRelated (key: string, adapterResult: ModelObject | ModelObject[]) {
    const Model = this.constructor as typeof BaseModel
    const relation = Model.$relations.get(key)

    /**
     * Ignore when relation is not defined
     */
    if (!relation) {
      return
    }

    const relatedModel = relation.relatedModel()
    let sideloadAttributes: string[] = []

    /**
     * Sideloading pivot object when pivotModel is not defined for many to many
     * relation
     */
    if (relation.type === 'manyToMany') {
      sideloadAttributes = ['pivot']
    }

    /**
     * Instance of model to be set as relationship
     */
    let instance: (ModelContract | ModelContract[] | null)

    /**
     * Create multiple for `hasMany` and one for `belongsTo` and `hasOne`
     */
    if (['hasMany', 'manyToMany', 'hasManyThrough'].includes(relation.type)) {
      instance = relatedModel.$createMultipleFromAdapterResult(
        adapterResult as ModelObject[],
        sideloadAttributes,
        this.$options,
      )
    } else {
      instance = relatedModel.$createFromAdapterResult(
        adapterResult,
        sideloadAttributes,
        this.$options,
      )
    }

    if (instance) {
      this.$preloaded[key] = instance
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
   * Set bulk attributes on the model instance. Setting relationships via
   * fill isn't allowed, since we disallow setting relationships
   * locally
   */
  public fill (values: ModelObject, sideloadAttributes?: string[]) {
    this.$attributes = {}
    this.merge(values, sideloadAttributes)
    this._fillInvoked = true
  }

  /**
   * Merge bulk attributes with existing attributes.
   */
  public merge (values: ModelObject, sideloadAttributes?: string[]) {
    const Model = this.constructor as typeof BaseModel

    /**
     * Merge result of adapter with the attributes. This enables
     * the adapter to hydrate models with properties generated
     * as a result of insert or update
     */
    if (isObject(values)) {
      Object.keys(values).forEach((key) => {
        if (Model.$hasColumn(key)) {
          this[key] = values[key]
        }

        /**
         * Set as sideloaded when defined
         */
        if (sideloadAttributes && sideloadAttributes.includes(key)) {
          this.$sideloaded[key] = values[key]
        }
      })
    }
  }

  /**
   * Perform save on the model instance to commit mutations.
   */
  public async save () {
    this._ensureIsntDeleted()
    const Model = this.constructor as typeof BaseModel

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
    const Model = this.constructor as typeof BaseModel
    await Model.$adapter.delete(this)
    this.$isDeleted = true
  }

  /**
   * Converting model to it's JSON representation
   */
  public toJSON () {
    const Model = this.constructor as typeof BaseModel
    const results = {}

    Model.$computed.forEach((value, key) => {
      results[value.serializeAs] = this[key]
    })

    Object.keys(this.$attributes).forEach((key) => {
      results[Model.$getColumn(key)!.serializeAs] = this.$attributes[key]
    })

    Object.keys(this.$preloaded).forEach((key) => {
      const relationValue = this.$preloaded[key]
      results[Model.$getRelation(key)!.serializeAs] = Array.isArray(relationValue)
        ? relationValue.map((one) => one.toJSON())
        : relationValue.toJSON()
    })

    return results
  }
}
