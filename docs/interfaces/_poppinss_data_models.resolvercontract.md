[@poppinss/data-models](../README.md) › [@poppinss/data-models](../modules/_poppinss_data_models.md) › [ResolverContract](_poppinss_data_models.resolvercontract.md)

# Interface: ResolverContract

A resolver to process relations or generate certain keys
based off conventions.

## Hierarchy

* **ResolverContract**

## Index

### Methods

* [getCastAsKey](_poppinss_data_models.resolvercontract.md#getcastaskey)
* [getSerializeAsKey](_poppinss_data_models.resolvercontract.md#getserializeaskey)
* [processRelation](_poppinss_data_models.resolvercontract.md#processrelation)

## Methods

###  getCastAsKey

▸ **getCastAsKey**(`key`: string): *string*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *string*

___

###  getSerializeAsKey

▸ **getSerializeAsKey**(`key`: string): *string*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *string*

___

###  processRelation

▸ **processRelation**(`relationName`: string, `type`: "belongsTo" | "hasOne" | "hasMany" | "manyToMany" | "hasOneThrough" | "hasManyThrough", `originModel`: [ModelConstructorContract](_poppinss_data_models.modelconstructorcontract.md), `options`: Partial‹[RelationNode](../modules/_poppinss_data_models.md#relationnode)›): *[RelationNode](../modules/_poppinss_data_models.md#relationnode)*

**Parameters:**

Name | Type |
------ | ------ |
`relationName` | string |
`type` | "belongsTo" &#124; "hasOne" &#124; "hasMany" &#124; "manyToMany" &#124; "hasOneThrough" &#124; "hasManyThrough" |
`originModel` | [ModelConstructorContract](_poppinss_data_models.modelconstructorcontract.md) |
`options` | Partial‹[RelationNode](../modules/_poppinss_data_models.md#relationnode)› |

**Returns:** *[RelationNode](../modules/_poppinss_data_models.md#relationnode)*
