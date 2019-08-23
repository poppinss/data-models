**[@poppinss/data-models](../README.md)**

[Globals](../README.md) › ["src/Contracts/index"](../modules/_src_contracts_index_.md) › [BaseRelationNode](_src_contracts_index_.baserelationnode.md)

# Interface: BaseRelationNode

Shape of the relationships node

## Hierarchy

* **BaseRelationNode**

  * [BelongsToNode](_src_contracts_index_.belongstonode.md)

  * [HasOneNode](_src_contracts_index_.hasonenode.md)

  * [HasManyNode](_src_contracts_index_.hasmanynode.md)

  * [ManyToManyNode](_src_contracts_index_.manytomanynode.md)

  * [HasOneThrough](_src_contracts_index_.hasonethrough.md)

  * [HasManyThrough](_src_contracts_index_.hasmanythrough.md)

## Index

### Properties

* [meta](_src_contracts_index_.baserelationnode.md#optional-meta)
* [relatedModel](_src_contracts_index_.baserelationnode.md#relatedmodel)
* [serializeAs](_src_contracts_index_.baserelationnode.md#serializeas)

## Properties

### `Optional` meta

• **meta**? : *any*

___

###  relatedModel

• **relatedModel**: *function*

#### Type declaration:

▸ (): *[ModelConstructorContract](_src_contracts_index_.modelconstructorcontract.md)*

___

###  serializeAs

• **serializeAs**: *string*