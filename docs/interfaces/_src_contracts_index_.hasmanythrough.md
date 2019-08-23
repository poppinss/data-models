**[@poppinss/data-models](../README.md)**

[Globals](../README.md) › ["src/Contracts/index"](../modules/_src_contracts_index_.md) › [HasManyThrough](_src_contracts_index_.hasmanythrough.md)

# Interface: HasManyThrough

Shape of hasManyThrough relationship

## Hierarchy

* [BaseRelationNode](_src_contracts_index_.baserelationnode.md)

  * **HasManyThrough**

## Index

### Properties

* [meta](_src_contracts_index_.hasmanythrough.md#optional-meta)
* [relatedModel](_src_contracts_index_.hasmanythrough.md#relatedmodel)
* [serializeAs](_src_contracts_index_.hasmanythrough.md#serializeas)
* [throughModel](_src_contracts_index_.hasmanythrough.md#throughmodel)
* [type](_src_contracts_index_.hasmanythrough.md#type)

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

###  throughModel

• **throughModel**: *function*

#### Type declaration:

▸ (): *[ModelConstructorContract](_src_contracts_index_.modelconstructorcontract.md)*

___

###  type

• **type**: *"hasManyThrough"*