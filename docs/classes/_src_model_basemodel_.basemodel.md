[@poppinss/data-models](../README.md) › ["src/Model/BaseModel"](../modules/_src_model_basemodel_.md) › [BaseModel](_src_model_basemodel_.basemodel.md)

# Class: BaseModel

Abstract class to define fully fledged data models

## Hierarchy

* **BaseModel**

## Implements

* [ModelContract](../interfaces/_poppinss_data_models.modelcontract.md)

## Index

### Constructors

* [constructor](_src_model_basemodel_.basemodel.md#constructor)

### Properties

* [$attributes](_src_model_basemodel_.basemodel.md#$attributes)
* [$extras](_src_model_basemodel_.basemodel.md#$extras)
* [$isDeleted](_src_model_basemodel_.basemodel.md#$isdeleted)
* [$isLocal](_src_model_basemodel_.basemodel.md#$islocal)
* [$options](_src_model_basemodel_.basemodel.md#$options)
* [$original](_src_model_basemodel_.basemodel.md#$original)
* [$persisted](_src_model_basemodel_.basemodel.md#$persisted)
* [$preloaded](_src_model_basemodel_.basemodel.md#$preloaded)
* [$sideloaded](_src_model_basemodel_.basemodel.md#$sideloaded)
* [$adapter](_src_model_basemodel_.basemodel.md#static-$adapter)
* [$booted](_src_model_basemodel_.basemodel.md#static-$booted)
* [$columns](_src_model_basemodel_.basemodel.md#static-$columns)
* [$computed](_src_model_basemodel_.basemodel.md#static-$computed)
* [$primaryKey](_src_model_basemodel_.basemodel.md#static-$primarykey)
* [$relations](_src_model_basemodel_.basemodel.md#static-$relations)
* [$resolver](_src_model_basemodel_.basemodel.md#static-optional-$resolver)

### Accessors

* [$dirty](_src_model_basemodel_.basemodel.md#$dirty)
* [$isDirty](_src_model_basemodel_.basemodel.md#$isdirty)
* [$isNew](_src_model_basemodel_.basemodel.md#$isnew)
* [$primaryKeyValue](_src_model_basemodel_.basemodel.md#$primarykeyvalue)

### Methods

* [$consumeAdapterResult](_src_model_basemodel_.basemodel.md#$consumeadapterresult)
* [$getAttribute](_src_model_basemodel_.basemodel.md#protected-$getattribute)
* [$getAttributeFromCache](_src_model_basemodel_.basemodel.md#protected-$getattributefromcache)
* [$getRelated](_src_model_basemodel_.basemodel.md#protected-$getrelated)
* [$hydrateOriginals](_src_model_basemodel_.basemodel.md#$hydrateoriginals)
* [$prepareForAdapter](_src_model_basemodel_.basemodel.md#protected-$prepareforadapter)
* [$setAttribute](_src_model_basemodel_.basemodel.md#protected-$setattribute)
* [$setRelated](_src_model_basemodel_.basemodel.md#$setrelated)
* [delete](_src_model_basemodel_.basemodel.md#delete)
* [fill](_src_model_basemodel_.basemodel.md#fill)
* [merge](_src_model_basemodel_.basemodel.md#merge)
* [save](_src_model_basemodel_.basemodel.md#save)
* [toJSON](_src_model_basemodel_.basemodel.md#tojson)
* [$addColumn](_src_model_basemodel_.basemodel.md#static-$addcolumn)
* [$addComputed](_src_model_basemodel_.basemodel.md#static-$addcomputed)
* [$addRelation](_src_model_basemodel_.basemodel.md#static-$addrelation)
* [$boot](_src_model_basemodel_.basemodel.md#static-$boot)
* [$createFromAdapterResult](_src_model_basemodel_.basemodel.md#static-$createfromadapterresult)
* [$createMultipleFromAdapterResult](_src_model_basemodel_.basemodel.md#static-$createmultiplefromadapterresult)
* [$getColumn](_src_model_basemodel_.basemodel.md#static-$getcolumn)
* [$getComputed](_src_model_basemodel_.basemodel.md#static-$getcomputed)
* [$getRelation](_src_model_basemodel_.basemodel.md#static-$getrelation)
* [$hasColumn](_src_model_basemodel_.basemodel.md#static-$hascolumn)
* [$hasComputed](_src_model_basemodel_.basemodel.md#static-$hascomputed)
* [$hasRelation](_src_model_basemodel_.basemodel.md#static-$hasrelation)
* [create](_src_model_basemodel_.basemodel.md#static-create)
* [findAll](_src_model_basemodel_.basemodel.md#static-findall)
* [findBy](_src_model_basemodel_.basemodel.md#static-findby)

## Constructors

###  constructor

\+ **new BaseModel**(): *[BaseModel](_src_model_basemodel_.basemodel.md)*

**Returns:** *[BaseModel](_src_model_basemodel_.basemodel.md)*

## Properties

###  $attributes

• **$attributes**: *[ModelObject](../interfaces/_poppinss_data_models.modelobject.md)*

*Implementation of [ModelContract](../interfaces/_poppinss_data_models.modelcontract.md).[$attributes](../interfaces/_poppinss_data_models.modelcontract.md#$attributes)*

A copy of attributes that will be sent over to adapter

___

###  $extras

• **$extras**: *[ModelObject](../interfaces/_poppinss_data_models.modelobject.md)*

*Implementation of [ModelContract](../interfaces/_poppinss_data_models.modelcontract.md).[$extras](../interfaces/_poppinss_data_models.modelcontract.md#$extras)*

Extras are dynamic properties set on the model instance, which
are not serialized and neither casted for adapter calls.

This is helpful when adapter wants to load some extra data conditionally
and that data must not be persisted back the adapter.

___

###  $isDeleted

• **$isDeleted**: *boolean* = false

*Implementation of [ModelContract](../interfaces/_poppinss_data_models.modelcontract.md).[$isDeleted](../interfaces/_poppinss_data_models.modelcontract.md#$isdeleted)*

Once deleted the model instance cannot make calls to the adapter

___

###  $isLocal

• **$isLocal**: *boolean* = true

*Implementation of [ModelContract](../interfaces/_poppinss_data_models.modelcontract.md).[$isLocal](../interfaces/_poppinss_data_models.modelcontract.md#$islocal)*

`$isLocal` tells if the model instance was created locally vs
one generated as a result of fetch call from the adapter.

___

###  $options

• **$options**: *any*

*Implementation of [ModelContract](../interfaces/_poppinss_data_models.modelcontract.md).[$options](../interfaces/_poppinss_data_models.modelcontract.md#optional-$options)*

Custom options defined on the model instance that are
passed to the adapter

___

###  $original

• **$original**: *[ModelObject](../interfaces/_poppinss_data_models.modelobject.md)*

*Implementation of [ModelContract](../interfaces/_poppinss_data_models.modelcontract.md).[$original](../interfaces/_poppinss_data_models.modelcontract.md#$original)*

Original represents the properties that already has been
persisted or loaded by the adapter.

___

###  $persisted

• **$persisted**: *boolean* = false

*Implementation of [ModelContract](../interfaces/_poppinss_data_models.modelcontract.md).[$persisted](../interfaces/_poppinss_data_models.modelcontract.md#$persisted)*

Persisted means the model has been persisted with the adapter. This will
also be true, when model instance is created as a result of fetch
call from the adapter.

___

###  $preloaded

• **$preloaded**: *object*

*Implementation of [ModelContract](../interfaces/_poppinss_data_models.modelcontract.md).[$preloaded](../interfaces/_poppinss_data_models.modelcontract.md#$preloaded)*

Preloaded relationships on the model instance

#### Type declaration:

* \[ **relation**: *string*\]: [ModelContract](../interfaces/_poppinss_data_models.modelcontract.md) | [ModelContract](../interfaces/_poppinss_data_models.modelcontract.md)[]

___

###  $sideloaded

• **$sideloaded**: *[ModelObject](../interfaces/_poppinss_data_models.modelobject.md)*

*Implementation of [ModelContract](../interfaces/_poppinss_data_models.modelcontract.md).[$sideloaded](../interfaces/_poppinss_data_models.modelcontract.md#$sideloaded)*

Sideloaded are dynamic properties set on the model instance, which
are not serialized and neither casted for adapter calls.

This is helpful when you want to add dynamic meta data to the model
and it's children as well.

The difference between [$extras](_src_model_basemodel_.basemodel.md#$extras) and [$sideloaded](_src_model_basemodel_.basemodel.md#$sideloaded) is:

- Extras can be different for each model instance
- Extras are not shared down the hierarchy (example relationships)
- Sideloaded are shared across multiple model instances created via `$createMultipleFromAdapterResult`.
- Sideloaded are passed to the relationships as well.

___

### `Static` $adapter

▪ **$adapter**: *[AdapterContract](../interfaces/_poppinss_data_models.adaptercontract.md)*

The adapter to be used for persisting and fetching data

___

### `Static` $booted

▪ **$booted**: *boolean*

Whether or not the model has been booted. Booting the model initializes it's
static properties. Base models must not be initialized.

___

### `Static` $columns

▪ **$columns**: *Map‹string, [ColumnNode](../modules/_poppinss_data_models.md#columnnode)›*

Columns makes it easier to define extra props on the model
and distinguish them with the attributes to be sent
over to the adapter

___

### `Static` $computed

▪ **$computed**: *Map‹string, [ComputedNode](../modules/_poppinss_data_models.md#computednode)›*

A set of properties marked as computed. Computed properties are included in
the `toJSON` result, else they behave the same way as any other instance
property.

___

### `Static` $primaryKey

▪ **$primaryKey**: *string*

Primary key is required to build relationships across models

___

### `Static` $relations

▪ **$relations**: *Map‹string, [RelationNode](../modules/_poppinss_data_models.md#relationnode)›*

Registered relationships for the given model

___

### `Static` `Optional` $resolver

▪ **$resolver**? : *[ResolverContract](../interfaces/_poppinss_data_models.resolvercontract.md)*

An optional resolver to resolve entities

## Accessors

###  $dirty

• **get $dirty**(): *any*

Returns dirty properties of a model by doing a diff
between original values and current attributes

**Returns:** *any*

___

###  $isDirty

• **get $isDirty**(): *boolean*

Finding if model is dirty with changes or not

**Returns:** *boolean*

___

###  $isNew

• **get $isNew**(): *boolean*

Opposite of [[this.$persisted]]

**Returns:** *boolean*

___

###  $primaryKeyValue

• **get $primaryKeyValue**(): *any | undefined*

Returns the value of primary key. The value must be
set inside attributes object

**Returns:** *any | undefined*

## Methods

###  $consumeAdapterResult

▸ **$consumeAdapterResult**(`adapterResult`: [ModelObject](../interfaces/_poppinss_data_models.modelobject.md), `sideloadAttributes?`: [ModelObject](../interfaces/_poppinss_data_models.modelobject.md)): *void*

*Implementation of [ModelContract](../interfaces/_poppinss_data_models.modelcontract.md)*

Persisting the model with adapter insert/update results. This
method is invoked after adapter insert/update action.

**Parameters:**

Name | Type |
------ | ------ |
`adapterResult` | [ModelObject](../interfaces/_poppinss_data_models.modelobject.md) |
`sideloadAttributes?` | [ModelObject](../interfaces/_poppinss_data_models.modelobject.md) |

**Returns:** *void*

___

### `Protected` $getAttribute

▸ **$getAttribute**(`key`: string): *any*

Get value of attribute

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *any*

___

### `Protected` $getAttributeFromCache

▸ **$getAttributeFromCache**(`key`: string, `callback`: function): *any*

Returns the attribute value from the cache which was resolved by
the mutated by a getter. This is done to avoid re-mutating
the same attribute value over and over again.

**Parameters:**

▪ **key**: *string*

▪ **callback**: *function*

▸ (`value`: any): *any*

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *any*

___

### `Protected` $getRelated

▸ **$getRelated**(`key`: string, `defaultValue`: any): *any*

Returns the related model or default value when model is missing

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`defaultValue` | any |

**Returns:** *any*

___

###  $hydrateOriginals

▸ **$hydrateOriginals**(): *void*

*Implementation of [ModelContract](../interfaces/_poppinss_data_models.modelcontract.md)*

Sync originals with the attributes. After this `isDirty` will
return false

**Returns:** *void*

___

### `Protected` $prepareForAdapter

▸ **$prepareForAdapter**(`attributes`: [ModelObject](../interfaces/_poppinss_data_models.modelobject.md)): *object*

Preparing the object to be sent to the adapter. We need
to create the object with the property names to be
used by the adapter.

**Parameters:**

Name | Type |
------ | ------ |
`attributes` | [ModelObject](../interfaces/_poppinss_data_models.modelobject.md) |

**Returns:** *object*

___

### `Protected` $setAttribute

▸ **$setAttribute**(`key`: string, `value`: any): *void*

Set attribute

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`value` | any |

**Returns:** *void*

___

###  $setRelated

▸ **$setRelated**(`key`: string, `adapterResult`: [ModelObject](../interfaces/_poppinss_data_models.modelobject.md) | [ModelObject](../interfaces/_poppinss_data_models.modelobject.md)[]): *void*

Sets the related data on the model instance. The method internally handles
`one to one` or `many` relations

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`adapterResult` | [ModelObject](../interfaces/_poppinss_data_models.modelobject.md) &#124; [ModelObject](../interfaces/_poppinss_data_models.modelobject.md)[] |

**Returns:** *void*

___

###  delete

▸ **delete**(): *Promise‹void›*

*Implementation of [ModelContract](../interfaces/_poppinss_data_models.modelcontract.md)*

Perform delete by issuing a delete request on the adapter

**Returns:** *Promise‹void›*

___

###  fill

▸ **fill**(`values`: [ModelObject](../interfaces/_poppinss_data_models.modelobject.md)): *void*

*Implementation of [ModelContract](../interfaces/_poppinss_data_models.modelcontract.md)*

Set bulk attributes on the model instance. Setting relationships via
fill isn't allowed, since we disallow setting relationships
locally

**Parameters:**

Name | Type |
------ | ------ |
`values` | [ModelObject](../interfaces/_poppinss_data_models.modelobject.md) |

**Returns:** *void*

___

###  merge

▸ **merge**(`values`: [ModelObject](../interfaces/_poppinss_data_models.modelobject.md)): *void*

*Implementation of [ModelContract](../interfaces/_poppinss_data_models.modelcontract.md)*

Merge bulk attributes with existing attributes.

**Parameters:**

Name | Type |
------ | ------ |
`values` | [ModelObject](../interfaces/_poppinss_data_models.modelobject.md) |

**Returns:** *void*

___

###  save

▸ **save**(): *Promise‹void›*

*Implementation of [ModelContract](../interfaces/_poppinss_data_models.modelcontract.md)*

Perform save on the model instance to commit mutations.

**Returns:** *Promise‹void›*

___

###  toJSON

▸ **toJSON**(): *object*

*Implementation of [ModelContract](../interfaces/_poppinss_data_models.modelcontract.md)*

Converting model to it's JSON representation

**Returns:** *object*

___

### `Static` $addColumn

▸ **$addColumn**(`name`: string, `options`: Partial‹[ColumnNode](../modules/_poppinss_data_models.md#columnnode)›): *void*

Define a new column on the model. This is required, so that
we differentiate between plain properties vs model attributes.

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`options` | Partial‹[ColumnNode](../modules/_poppinss_data_models.md#columnnode)› |

**Returns:** *void*

___

### `Static` $addComputed

▸ **$addComputed**(`name`: string, `options`: Partial‹[ComputedNode](../modules/_poppinss_data_models.md#computednode)›): *void*

Adds a computed node

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`options` | Partial‹[ComputedNode](../modules/_poppinss_data_models.md#computednode)› |

**Returns:** *void*

___

### `Static` $addRelation

▸ **$addRelation**(`name`: string, `type`: "belongsTo" | "hasOne" | "hasMany" | "manyToMany" | "hasOneThrough" | "hasManyThrough", `options`: Omit‹Partial‹[RelationNode](../modules/_poppinss_data_models.md#relationnode)›, "type"›): *void*

Adds a relationship

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`type` | "belongsTo" &#124; "hasOne" &#124; "hasMany" &#124; "manyToMany" &#124; "hasOneThrough" &#124; "hasManyThrough" |
`options` | Omit‹Partial‹[RelationNode](../modules/_poppinss_data_models.md#relationnode)›, "type"› |

**Returns:** *void*

___

### `Static` $boot

▸ **$boot**(): *void*

Boot the model

**Returns:** *void*

___

### `Static` $createFromAdapterResult

▸ **$createFromAdapterResult**<**T**>(`this`: object, `adapterResult`: [ModelObject](../interfaces/_poppinss_data_models.modelobject.md), `sideloadAttributes?`: [ModelObject](../interfaces/_poppinss_data_models.modelobject.md), `options?`: any): *T | null*

Create a model instance from the adapter result. The result value must
be a valid object, otherwise `null` is returned.

**Type parameters:**

▪ **T**: *[ModelContract](../interfaces/_poppinss_data_models.modelcontract.md)*

**Parameters:**

Name | Type |
------ | ------ |
`this` | object |
`adapterResult` | [ModelObject](../interfaces/_poppinss_data_models.modelobject.md) |
`sideloadAttributes?` | [ModelObject](../interfaces/_poppinss_data_models.modelobject.md) |
`options?` | any |

**Returns:** *T | null*

___

### `Static` $createMultipleFromAdapterResult

▸ **$createMultipleFromAdapterResult**<**T**>(`this`: object, `adapterResults`: [ModelObject](../interfaces/_poppinss_data_models.modelobject.md)[], `sideloadAttributes?`: [ModelObject](../interfaces/_poppinss_data_models.modelobject.md), `options?`: any): *T[]*

Creates an array of models from the adapter results. The `adapterResults`
must be an array with valid Javascript objects.

1. If top level value is not an array, then an empty array is returned.
2. If row is not an object, then it will be ignored.

**Type parameters:**

▪ **T**: *[ModelContract](../interfaces/_poppinss_data_models.modelcontract.md)*

**Parameters:**

Name | Type |
------ | ------ |
`this` | object |
`adapterResults` | [ModelObject](../interfaces/_poppinss_data_models.modelobject.md)[] |
`sideloadAttributes?` | [ModelObject](../interfaces/_poppinss_data_models.modelobject.md) |
`options?` | any |

**Returns:** *T[]*

___

### `Static` $getColumn

▸ **$getColumn**(`name`: string): *[ColumnNode](../modules/_poppinss_data_models.md#columnnode) | undefined*

Returns the column for a given name

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *[ColumnNode](../modules/_poppinss_data_models.md#columnnode) | undefined*

___

### `Static` $getComputed

▸ **$getComputed**(`name`: string): *[ComputedNode](../modules/_poppinss_data_models.md#computednode) | undefined*

Get computed node

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *[ComputedNode](../modules/_poppinss_data_models.md#computednode) | undefined*

___

### `Static` $getRelation

▸ **$getRelation**<**T**>(`name`: string): *T | undefined*

Returns relationship node for a given relation

**Type parameters:**

▪ **T**: *[RelationNode](../modules/_poppinss_data_models.md#relationnode)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *T | undefined*

___

### `Static` $hasColumn

▸ **$hasColumn**(`name`: string): *boolean*

Returns a boolean telling if column exists on the model

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *boolean*

___

### `Static` $hasComputed

▸ **$hasComputed**(`name`: string): *boolean*

Find if some property is marked as computed

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *boolean*

___

### `Static` $hasRelation

▸ **$hasRelation**(`name`: string): *boolean*

Find if some property is marked as a relation or not

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *boolean*

___

### `Static` create

▸ **create**<**T**>(`this`: object, `values`: [ModelObject](../interfaces/_poppinss_data_models.modelobject.md)): *T*

Returns a fresh instance of model by applying attributes
to the model instance

**Type parameters:**

▪ **T**: *[ModelContract](../interfaces/_poppinss_data_models.modelcontract.md)*

**Parameters:**

Name | Type |
------ | ------ |
`this` | object |
`values` | [ModelObject](../interfaces/_poppinss_data_models.modelobject.md) |

**Returns:** *T*

___

### `Static` findAll

▸ **findAll**<**T**>(`this`: object, `options?`: any): *Promise‹T[]›*

Create a array of model instances from the adapter result

**Type parameters:**

▪ **T**: *[ModelContract](../interfaces/_poppinss_data_models.modelcontract.md)*

**Parameters:**

Name | Type |
------ | ------ |
`this` | object |
`options?` | any |

**Returns:** *Promise‹T[]›*

___

### `Static` findBy

▸ **findBy**<**T**>(`this`: object, `key`: string, `value`: any, `options?`: any): *Promise‹null | T›*

Find model instance using a key/value pair

**Type parameters:**

▪ **T**: *[ModelContract](../interfaces/_poppinss_data_models.modelcontract.md)*

**Parameters:**

Name | Type |
------ | ------ |
`this` | object |
`key` | string |
`value` | any |
`options?` | any |

**Returns:** *Promise‹null | T›*
