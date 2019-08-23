**[@poppinss/data-models](../README.md)**

[Globals](../README.md) › [@poppinss/data-models](../modules/_poppinss_data_models.md) › [BaseRelationNode](_poppinss_data_models.baserelationnode.md)

# Interface: BaseRelationNode

Shape of the relationships node

## Hierarchy

* **BaseRelationNode**

  * [BelongsToNode](_poppinss_data_models.belongstonode.md)

  * [HasOneNode](_poppinss_data_models.hasonenode.md)

  * [HasManyNode](_poppinss_data_models.hasmanynode.md)

  * [ManyToManyNode](_poppinss_data_models.manytomanynode.md)

  * [HasOneThrough](_poppinss_data_models.hasonethrough.md)

  * [HasManyThrough](_poppinss_data_models.hasmanythrough.md)

## Index

### Properties

* [meta](_poppinss_data_models.baserelationnode.md#optional-meta)
* [relatedModel](_poppinss_data_models.baserelationnode.md#relatedmodel)
* [serializeAs](_poppinss_data_models.baserelationnode.md#serializeas)

## Properties

### `Optional` meta

• **meta**? : *any*

___

###  relatedModel

• **relatedModel**: *function*

#### Type declaration:

▸ (): *[ModelConstructorContract](_poppinss_data_models.modelconstructorcontract.md)*

___

###  serializeAs

• **serializeAs**: *string*