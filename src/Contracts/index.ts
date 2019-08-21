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
 * Represents a computed property on the model
 */
export type ComputedNode = {
  serializeAs: string,
}

/**
 * Reusable interface to define an object.
 */
export interface ModelObject {
  [key: string]: any
}

/**
 * Shape of the model instance. We prefix the properties with a `$` to
 * differentiate between special properties provided by the base
 * model but with exception to `save`, `delete` and `toJSON`.
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

  $consumeAdapterResult (result: ModelObject): void,
  $hydrateOriginals (): void,

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
  $columns: Map<string, ColumnNode>
  $computed: Map<string, ComputedNode>
  $primaryKey: string

  $boot (): void

  /**
   * Creating model from adapter results
   */
  $createFromAdapterResult (result?: ModelObject): null | ModelContract
  $createMultipleFromAdapterResult (results: ModelObject[]): ModelContract[]

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
