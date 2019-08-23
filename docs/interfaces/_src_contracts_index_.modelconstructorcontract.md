**[@poppinss/data-models](../README.md)**

[Globals](../README.md) › ["src/Contracts/index"](../modules/_src_contracts_index_.md) › [ModelConstructorContract](_src_contracts_index_.modelconstructorcontract.md)

# Interface: ModelConstructorContract

Shape of the model static properties. Again the `$` prefix is to
denote special properties from the base model with exception to
`create`, `findAll`, `findAll`.

## Hierarchy

* **ModelConstructorContract**

## Index

### Properties

* [$adapter](_src_contracts_index_.modelconstructorcontract.md#$adapter)
* [$booted](_src_contracts_index_.modelconstructorcontract.md#$booted)
* [$columns](_src_contracts_index_.modelconstructorcontract.md#$columns)
* [$computed](_src_contracts_index_.modelconstructorcontract.md#$computed)
* [$primaryKey](_src_contracts_index_.modelconstructorcontract.md#$primarykey)
* [$relations](_src_contracts_index_.modelconstructorcontract.md#$relations)
* [$resolver](_src_contracts_index_.modelconstructorcontract.md#optional-$resolver)

### Methods

* [$addColumn](_src_contracts_index_.modelconstructorcontract.md#$addcolumn)
* [$addComputed](_src_contracts_index_.modelconstructorcontract.md#$addcomputed)
* [$addRelation](_src_contracts_index_.modelconstructorcontract.md#$addrelation)
* [$boot](_src_contracts_index_.modelconstructorcontract.md#$boot)
* [$createFromAdapterResult](_src_contracts_index_.modelconstructorcontract.md#$createfromadapterresult)
* [$createMultipleFromAdapterResult](_src_contracts_index_.modelconstructorcontract.md#$createmultiplefromadapterresult)
* [$getColumn](_src_contracts_index_.modelconstructorcontract.md#$getcolumn)
* [$getComputed](_src_contracts_index_.modelconstructorcontract.md#$getcomputed)
* [$getRelation](_src_contracts_index_.modelconstructorcontract.md#$getrelation)
* [$hasColumn](_src_contracts_index_.modelconstructorcontract.md#$hascolumn)
* [$hasComputed](_src_contracts_index_.modelconstructorcontract.md#$hascomputed)
* [$hasRelation](_src_contracts_index_.modelconstructorcontract.md#$hasrelation)
* [create](_src_contracts_index_.modelconstructorcontract.md#create)
* [findAll](_src_contracts_index_.modelconstructorcontract.md#findall)
* [findBy](_src_contracts_index_.modelconstructorcontract.md#findby)

## Properties

###  $adapter

• **$adapter**: *[AdapterContract](_src_contracts_index_.adaptercontract.md)*

___

###  $booted

• **$booted**: *boolean*

___

###  $columns

• **$columns**: *Map‹string, [ColumnNode](../modules/_src_contracts_index_.md#columnnode)›*

___

###  $computed

• **$computed**: *Map‹string, [ComputedNode](../modules/_src_contracts_index_.md#computednode)›*

___

###  $primaryKey

• **$primaryKey**: *string*

___

###  $relations

• **$relations**: *Map‹string, [RelationNode](../modules/_src_contracts_index_.md#relationnode)›*

___

### `Optional` $resolver

• **$resolver**? : *[ResolverContract](_src_contracts_index_.resolvercontract.md)*

## Methods

###  $addColumn

▸ **$addColumn**(`name`: string, `options`: Partial‹[ColumnNode](../modules/_src_contracts_index_.md#columnnode)›): *void*

Managing columns

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`options` | Partial‹[ColumnNode](../modules/_src_contracts_index_.md#columnnode)› |

**Returns:** *void*

___

###  $addComputed

▸ **$addComputed**(`name`: string, `options`: Partial‹[ComputedNode](../modules/_src_contracts_index_.md#computednode)›): *void*

Managing computed columns

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`options` | Partial‹[ComputedNode](../modules/_src_contracts_index_.md#computednode)› |

**Returns:** *void*

___

###  $addRelation

▸ **$addRelation**(`name`: string, `type`: "belongsTo" | "hasOne" | "hasMany" | "manyToMany" | "hasOneThrough" | "hasManyThrough", `options`: Partial‹[RelationNode](../modules/_src_contracts_index_.md#relationnode)›): *void*

Managing relationships

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`type` | "belongsTo" \| "hasOne" \| "hasMany" \| "manyToMany" \| "hasOneThrough" \| "hasManyThrough" |
`options` | Partial‹[RelationNode](../modules/_src_contracts_index_.md#relationnode)› |

**Returns:** *void*

___

###  $boot

▸ **$boot**(): *void*

**Returns:** *void*

___

###  $createFromAdapterResult

▸ **$createFromAdapterResult**(`result?`: [ModelObject](_src_contracts_index_.modelobject.md), `sideloadAttributes?`: string[]): *null | [ModelContract](_src_contracts_index_.modelcontract.md)*

Creating model from adapter results

**Parameters:**

Name | Type |
------ | ------ |
`result?` | [ModelObject](_src_contracts_index_.modelobject.md) |
`sideloadAttributes?` | string[] |

**Returns:** *null | [ModelContract](_src_contracts_index_.modelcontract.md)*

___

###  $createMultipleFromAdapterResult

▸ **$createMultipleFromAdapterResult**(`results`: [ModelObject](_src_contracts_index_.modelobject.md)[], `sideloadAttributes?`: string[]): *[ModelContract](_src_contracts_index_.modelcontract.md)[]*

**Parameters:**

Name | Type |
------ | ------ |
`results` | [ModelObject](_src_contracts_index_.modelobject.md)[] |
`sideloadAttributes?` | string[] |

**Returns:** *[ModelContract](_src_contracts_index_.modelcontract.md)[]*

___

###  $getColumn

▸ **$getColumn**(`name`: string): *[ColumnNode](../modules/_src_contracts_index_.md#columnnode) | undefined*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *[ColumnNode](../modules/_src_contracts_index_.md#columnnode) | undefined*

___

###  $getComputed

▸ **$getComputed**(`name`: string): *[ComputedNode](../modules/_src_contracts_index_.md#computednode) | undefined*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *[ComputedNode](../modules/_src_contracts_index_.md#computednode) | undefined*

___

###  $getRelation

▸ **$getRelation**<**T**>(`name`: string): *T | undefined*

**Type parameters:**

▪ **T**: *[RelationNode](../modules/_src_contracts_index_.md#relationnode)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *T | undefined*

___

###  $hasColumn

▸ **$hasColumn**(`name`: string): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *boolean*

___

###  $hasComputed

▸ **$hasComputed**(`name`: string): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *boolean*

___

###  $hasRelation

▸ **$hasRelation**(`name`: string): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *boolean*

___

###  create

▸ **create**(`values`: [ModelObject](_src_contracts_index_.modelobject.md)): *[ModelContract](_src_contracts_index_.modelcontract.md)*

Creating model

**Parameters:**

Name | Type |
------ | ------ |
`values` | [ModelObject](_src_contracts_index_.modelobject.md) |

**Returns:** *[ModelContract](_src_contracts_index_.modelcontract.md)*

___

###  findAll

▸ **findAll**(): *Promise‹[ModelContract](_src_contracts_index_.modelcontract.md)[]›*

**Returns:** *Promise‹[ModelContract](_src_contracts_index_.modelcontract.md)[]›*

___

###  findBy

▸ **findBy**(`key`: string, `value`: any): *Promise‹null | [ModelContract](_src_contracts_index_.modelcontract.md)›*

Creating model by invoking actions on adapter

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`value` | any |

**Returns:** *Promise‹null | [ModelContract](_src_contracts_index_.modelcontract.md)›*