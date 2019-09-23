[@poppinss/data-models](../README.md) › [@poppinss/data-models](../modules/_poppinss_data_models.md) › [HasOneThrough](_poppinss_data_models.hasonethrough.md)

# Interface: HasOneThrough

Shape of hasOneThrough relationship

## Hierarchy

* [BaseRelationNode](_poppinss_data_models.baserelationnode.md)

  ↳ **HasOneThrough**

## Index

### Properties

* [meta](_poppinss_data_models.hasonethrough.md#optional-meta)
* [relatedModel](_poppinss_data_models.hasonethrough.md#relatedmodel)
* [serializeAs](_poppinss_data_models.hasonethrough.md#serializeas)
* [throughModel](_poppinss_data_models.hasonethrough.md#throughmodel)
* [type](_poppinss_data_models.hasonethrough.md#type)

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

###  throughModel

• **throughModel**: *function*

#### Type declaration:

▸ (): *[ModelConstructorContract](_poppinss_data_models.modelconstructorcontract.md)*

___

###  type

• **type**: *"hasOneThrough"*
