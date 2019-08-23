**[@poppinss/data-models](../README.md)**

[Globals](../README.md) › [@poppinss/data-models](_poppinss_data_models.md)

# External module: @poppinss/data-models

## Index

### Interfaces

* [AdapterContract](../interfaces/_poppinss_data_models.adaptercontract.md)
* [BaseRelationNode](../interfaces/_poppinss_data_models.baserelationnode.md)
* [BelongsToNode](../interfaces/_poppinss_data_models.belongstonode.md)
* [HasManyNode](../interfaces/_poppinss_data_models.hasmanynode.md)
* [HasManyThrough](../interfaces/_poppinss_data_models.hasmanythrough.md)
* [HasOneNode](../interfaces/_poppinss_data_models.hasonenode.md)
* [HasOneThrough](../interfaces/_poppinss_data_models.hasonethrough.md)
* [ManyToManyNode](../interfaces/_poppinss_data_models.manytomanynode.md)
* [ModelConstructorContract](../interfaces/_poppinss_data_models.modelconstructorcontract.md)
* [ModelContract](../interfaces/_poppinss_data_models.modelcontract.md)
* [ModelObject](../interfaces/_poppinss_data_models.modelobject.md)
* [ResolverContract](../interfaces/_poppinss_data_models.resolvercontract.md)

### Type aliases

* [CacheNode](_poppinss_data_models.md#cachenode)
* [ColumnNode](_poppinss_data_models.md#columnnode)
* [ComputedNode](_poppinss_data_models.md#computednode)
* [RelationNode](_poppinss_data_models.md#relationnode)

### Functions

* [StaticImplements](_poppinss_data_models.md#staticimplements)
* [isObject](_poppinss_data_models.md#isobject)

## Type aliases

###  CacheNode

Ƭ **CacheNode**: *object*

Shape of cache node to keep getters optimized

#### Type declaration:

___

###  ColumnNode

Ƭ **ColumnNode**: *object*

Represents a single column on the model

#### Type declaration:

___

###  ComputedNode

Ƭ **ComputedNode**: *object*

Represents a computed property on the model

#### Type declaration:

___

###  RelationNode

Ƭ **RelationNode**: *[BelongsToNode](../interfaces/_poppinss_data_models.belongstonode.md) | [HasManyNode](../interfaces/_poppinss_data_models.hasmanynode.md) | [HasOneNode](../interfaces/_poppinss_data_models.hasonenode.md) | [ManyToManyNode](../interfaces/_poppinss_data_models.manytomanynode.md) | [HasOneThrough](../interfaces/_poppinss_data_models.hasonethrough.md) | [HasManyThrough](../interfaces/_poppinss_data_models.hasmanythrough.md)*

A union of all the relationships

## Functions

###  StaticImplements

▸ **StaticImplements**<**T**>(): *(Anonymous function)*

Decorator to enforce static interface

**Type parameters:**

▪ **T**

**Returns:** *(Anonymous function)*

___

###  isObject

▸ **isObject**(`value`: any): *boolean*

Returns whether value is valid object or not

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *boolean*