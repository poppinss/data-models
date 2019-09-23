[@poppinss/data-models](../README.md) › [@poppinss/data-models](../modules/_poppinss_data_models.md) › [ManyToManyNode](_poppinss_data_models.manytomanynode.md)

# Interface: ManyToManyNode

Shape of hasMany relationship

## Hierarchy

* [BaseRelationNode](_poppinss_data_models.baserelationnode.md)

  ↳ **ManyToManyNode**

## Index

### Properties

* [meta](_poppinss_data_models.manytomanynode.md#optional-meta)
* [relatedModel](_poppinss_data_models.manytomanynode.md#relatedmodel)
* [serializeAs](_poppinss_data_models.manytomanynode.md#serializeas)
* [type](_poppinss_data_models.manytomanynode.md#type)

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

• **type**: *"manyToMany"*
