**[@poppinss/data-models](../README.md)**

[Globals](../README.md) › ["src/Contracts/index"](../modules/_src_contracts_index_.md) › [ResolverContract](_src_contracts_index_.resolvercontract.md)

# Interface: ResolverContract

A resolver to process relations or generate certain keys
based off conventions.

## Hierarchy

* **ResolverContract**

## Index

### Methods

* [getCastAsKey](_src_contracts_index_.resolvercontract.md#getcastaskey)
* [getSerializeAsKey](_src_contracts_index_.resolvercontract.md#getserializeaskey)
* [processRelation](_src_contracts_index_.resolvercontract.md#processrelation)

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

▸ **processRelation**(`relationName`: string, `type`: "belongsTo" | "hasOne" | "hasMany" | "manyToMany" | "hasOneThrough" | "hasManyThrough", `originModel`: [ModelConstructorContract](_src_contracts_index_.modelconstructorcontract.md), `options`: Partial‹[RelationNode](../modules/_src_contracts_index_.md#relationnode)›): *[RelationNode](../modules/_src_contracts_index_.md#relationnode)*

**Parameters:**

Name | Type |
------ | ------ |
`relationName` | string |
`type` | "belongsTo" \| "hasOne" \| "hasMany" \| "manyToMany" \| "hasOneThrough" \| "hasManyThrough" |
`originModel` | [ModelConstructorContract](_src_contracts_index_.modelconstructorcontract.md) |
`options` | Partial‹[RelationNode](../modules/_src_contracts_index_.md#relationnode)› |

**Returns:** *[RelationNode](../modules/_src_contracts_index_.md#relationnode)*