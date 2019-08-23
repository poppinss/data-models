**[@poppinss/data-models](../README.md)**

[Globals](../README.md) › ["src/Contracts/index"](../modules/_src_contracts_index_.md) › [HasManyNode](_src_contracts_index_.hasmanynode.md)

# Interface: HasManyNode

Shape of hasMany relationship

## Hierarchy

* [BaseRelationNode](_src_contracts_index_.baserelationnode.md)

  * **HasManyNode**

## Index

### Properties

* [meta](_src_contracts_index_.hasmanynode.md#optional-meta)
* [relatedModel](_src_contracts_index_.hasmanynode.md#relatedmodel)
* [serializeAs](_src_contracts_index_.hasmanynode.md#serializeas)
* [type](_src_contracts_index_.hasmanynode.md#type)

## Properties

### `Optional` meta

• **meta**? : *any*

*Inherited from [BaseRelationNode](_src_contracts_index_.baserelationnode.md).[meta](_src_contracts_index_.baserelationnode.md#optional-meta)*

___

###  relatedModel

• **relatedModel**: *function*

*Inherited from [BaseRelationNode](_src_contracts_index_.baserelationnode.md).[relatedModel](_src_contracts_index_.baserelationnode.md#relatedmodel)*

#### Type declaration:

▸ (): *[ModelConstructorContract](_src_contracts_index_.modelconstructorcontract.md)*

___

###  serializeAs

• **serializeAs**: *string*

*Inherited from [BaseRelationNode](_src_contracts_index_.baserelationnode.md).[serializeAs](_src_contracts_index_.baserelationnode.md#serializeas)*

___

###  type

• **type**: *"hasMany"*