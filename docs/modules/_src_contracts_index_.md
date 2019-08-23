**[@poppinss/data-models](../README.md)**

[Globals](../README.md) › ["src/Contracts/index"](_src_contracts_index_.md)

# External module: "src/Contracts/index"

## Index

### Interfaces

* [AdapterContract](../interfaces/_src_contracts_index_.adaptercontract.md)
* [BaseRelationNode](../interfaces/_src_contracts_index_.baserelationnode.md)
* [BelongsToNode](../interfaces/_src_contracts_index_.belongstonode.md)
* [HasManyNode](../interfaces/_src_contracts_index_.hasmanynode.md)
* [HasManyThrough](../interfaces/_src_contracts_index_.hasmanythrough.md)
* [HasOneNode](../interfaces/_src_contracts_index_.hasonenode.md)
* [HasOneThrough](../interfaces/_src_contracts_index_.hasonethrough.md)
* [ManyToManyNode](../interfaces/_src_contracts_index_.manytomanynode.md)
* [ModelConstructorContract](../interfaces/_src_contracts_index_.modelconstructorcontract.md)
* [ModelContract](../interfaces/_src_contracts_index_.modelcontract.md)
* [ModelObject](../interfaces/_src_contracts_index_.modelobject.md)
* [ResolverContract](../interfaces/_src_contracts_index_.resolvercontract.md)

### Type aliases

* [CacheNode](_src_contracts_index_.md#cachenode)
* [ColumnNode](_src_contracts_index_.md#columnnode)
* [ComputedNode](_src_contracts_index_.md#computednode)
* [RelationNode](_src_contracts_index_.md#relationnode)

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

Ƭ **RelationNode**: *[BelongsToNode](../interfaces/_src_contracts_index_.belongstonode.md) | [HasManyNode](../interfaces/_src_contracts_index_.hasmanynode.md) | [HasOneNode](../interfaces/_src_contracts_index_.hasonenode.md) | [ManyToManyNode](../interfaces/_src_contracts_index_.manytomanynode.md) | [HasOneThrough](../interfaces/_src_contracts_index_.hasonethrough.md) | [HasManyThrough](../interfaces/_src_contracts_index_.hasmanythrough.md)*

A union of all the relationships