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

/**
 * Represents a single column on the model
 */
export type ColumnNode = {
  castAs: string,
  serializeAs: string,
  nullable: boolean,
  primary: boolean,
  hasGetter: boolean,
  hasSetter: boolean,
}

/**
 * Shape of cache node to keep getters optimized
 */
export type CacheNode = {
  original: any,
  resolved: any,
  getter: (value: any) => any,
}

/**
 * Represents a computed property on the model
 */
export type ComputedNode = {
  serializeAs: string,
}

/**
 * Shape of the relationships node
 */
export interface BaseRelationNode {
  relatedModel: (() => ModelConstructorContract),
  serializeAs: string,
  meta?: any,
}

/**
 * Shape of belongsTo relationship
 */
export interface BelongsToNode extends BaseRelationNode {
  type: 'belongsTo',
}

/**
 * Shape of hasOne relationship
 */
export interface HasOneNode extends BaseRelationNode {
  type: 'hasOne',
}

/**
 * Shape of hasMany relationship
 */
export interface HasManyNode extends BaseRelationNode {
  type: 'hasMany',
}

/**
 * Shape of hasMany relationship
 */
export interface ManyToManyNode extends BaseRelationNode {
  type: 'manyToMany',
}

/**
 * Shape of hasOneThrough relationship
 */
export interface HasOneThrough extends BaseRelationNode {
  type: 'hasOneThrough',
  throughModel: (() => ModelConstructorContract),
}

/**
 * Shape of hasManyThrough relationship
 */
export interface HasManyThrough extends BaseRelationNode {
  type: 'hasManyThrough',
  throughModel: (() => ModelConstructorContract),
}

/**
 * A union of all the relationships
 */
export type RelationNode = BelongsToNode
  | HasManyNode
  | HasOneNode
  | ManyToManyNode
  | HasOneThrough
  | HasManyThrough

/**
 * Reusable interface to define an object.
 */
export interface ModelObject {
  [key: string]: any
}

/**
 * Shape of the model instance. We prefix the properties with a `$` to
 * differentiate between special properties provided by the base
 * model but with exception to `save`, `delete`, `fill`, `merge`
 * and `toJSON`.
 */
export interface ModelContract {
  $attributes: ModelObject
  $original: ModelObject
  $persisted: boolean
  $isNew: boolean
  $isLocal: boolean
  $dirty: ModelObject
  $isDirty: boolean
  $isDeleted: boolean
  $preloaded: { [relation: string]: ModelContract | ModelContract[] },
  $sideloaded: ModelObject,

  $consumeAdapterResult (result: ModelObject, sideloadAttributes?: string[]): void,
  $setRelated (key: string, result: ModelObject): void,
  $hydrateOriginals (): void,

  fill (value: ModelObject, sideloadAttributes?: string[]): void,
  merge (value: ModelObject, sideloadAttributes?: string[]): void,
  save (): Promise<void>
  delete (): Promise<void>
  toJSON (): ModelObject
}

/**
 * Shape of the model static properties. Again the `$` prefix is to
 * denote special properties from the base model with exception to
 * `create`, `findAll`, `findAll`.
 */
export interface ModelConstructorContract {
  $booted: boolean
  $adapter: AdapterContract
  $resolver?: ResolverContract
  $columns: Map<string, ColumnNode>
  $relations: Map<string, RelationNode>
  $computed: Map<string, ComputedNode>
  $primaryKey: string

  $boot (): void

  /**
   * Creating model from adapter results
   */
  $createFromAdapterResult (result?: ModelObject, sideloadAttributes?: string[]): null | ModelContract
  $createMultipleFromAdapterResult (results: ModelObject[], sideloadAttributes?: string[]): ModelContract[]

  /**
   * Managing columns
   */
  $addColumn (name: string, options: Partial<ColumnNode>): void
  $hasColumn (name: string): boolean
  $getColumn (name: string): ColumnNode | undefined

  /**
   * Managing computed columns
   */
  $addComputed (name: string, options: Partial<ComputedNode>): void
  $hasComputed (name: string): boolean
  $getComputed (name: string): ComputedNode | undefined

  /**
   * Managing relationships
   */
  $addRelation (name: string, type: RelationNode['type'], options: Partial<RelationNode>): void
  $hasRelation (name: string): boolean
  $getRelation<T extends RelationNode> (name: string): T | undefined

  /**
   * Creating model
   */
  create (values: ModelObject): ModelContract

  /**
   * Creating model by invoking actions on adapter
   */
  findBy (key: string, value: any): Promise<null | ModelContract>
  findAll (): Promise<ModelContract[]>
}

/**
 * Every adapter must adhere to the Adapter contract
 */
export interface AdapterContract {
  delete (instance: ModelContract): Promise<void>
  insert (instance: ModelContract, attributes: any): Promise<void>
  update (instance: ModelContract, attributes: any): Promise<void>
  find (model: ModelConstructorContract, key: string, value: any): Promise<null | ModelContract>
  findAll (model: ModelConstructorContract): Promise<ModelContract[]>
}

/**
 * A resolver to process relations or generate certain keys
 * based off conventions.
 */
export interface ResolverContract {
  processRelation (
    relationName: string,
    type: RelationNode['type'],
    originModel: ModelConstructorContract,
    options: Partial<RelationNode>,
  ): RelationNode

  getSerializeAsKey (key: string): string
  getCastAsKey (key: string): string
}
