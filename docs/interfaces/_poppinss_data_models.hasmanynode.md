**[@poppinss/data-models](../README.md)**

[Globals](../README.md) › [@poppinss/data-models](../modules/_poppinss_data_models.md) › [HasManyNode](_poppinss_data_models.hasmanynode.md)

# Interface: HasManyNode

Shape of hasMany relationship

## Hierarchy

* [BaseRelationNode](_poppinss_data_models.baserelationnode.md)

  * **HasManyNode**

## Index

### Properties

* [meta](_poppinss_data_models.hasmanynode.md#optional-meta)
* [relatedModel](_poppinss_data_models.hasmanynode.md#relatedmodel)
* [serializeAs](_poppinss_data_models.hasmanynode.md#serializeas)
* [type](_poppinss_data_models.hasmanynode.md#type)

## Properties

### `Optional` meta

• **meta**? : *any*

*Inherited from [BaseRelationNode](_poppinss_data_models.baserelationnode.md).[meta](_poppinss_data_models.baserelationnode.md#optional-meta)*

___

###  relatedModel

• **relatedModel**: *function*

*Inherited from [BaseRelationNode](_poppinss_data_models.baserelationnode.md).[relatedModel](_poppinss_data_models.baserelationnode.md#relatedmodel)*

#### Type declaration:

▸ (): *[ModelConstructorContract](_poppinss_data_models.modelconstructorcontract.md)*

___

###  serializeAs

• **serializeAs**: *string*

*Inherited from [BaseRelationNode](_poppinss_data_models.baserelationnode.md).[serializeAs](_poppinss_data_models.baserelationnode.md#serializeas)*

___

###  type

• **type**: *"hasMany"*