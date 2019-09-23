[@poppinss/data-models](../README.md) › [@poppinss/data-models](../modules/_poppinss_data_models.md) › [HasManyThrough](_poppinss_data_models.hasmanythrough.md)

# Interface: HasManyThrough

Shape of hasManyThrough relationship

## Hierarchy

* [BaseRelationNode](_poppinss_data_models.baserelationnode.md)

  ↳ **HasManyThrough**

## Index

### Properties

* [meta](_poppinss_data_models.hasmanythrough.md#optional-meta)
* [relatedModel](_poppinss_data_models.hasmanythrough.md#relatedmodel)
* [serializeAs](_poppinss_data_models.hasmanythrough.md#serializeas)
* [throughModel](_poppinss_data_models.hasmanythrough.md#throughmodel)
* [type](_poppinss_data_models.hasmanythrough.md#type)

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

• **type**: *"hasManyThrough"*
