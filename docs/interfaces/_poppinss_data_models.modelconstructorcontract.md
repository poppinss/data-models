**[@poppinss/data-models](../README.md)**

[Globals](../README.md) › [@poppinss/data-models](../modules/_poppinss_data_models.md) › [ModelConstructorContract](_poppinss_data_models.modelconstructorcontract.md)

# Interface: ModelConstructorContract

Shape of the model static properties. Again the `$` prefix is to
denote special properties from the base model with exception to
`create`, `findAll`, `findAll`.

## Hierarchy

* **ModelConstructorContract**

## Index

### Properties

* [$adapter](_poppinss_data_models.modelconstructorcontract.md#$adapter)
* [$booted](_poppinss_data_models.modelconstructorcontract.md#$booted)
* [$columns](_poppinss_data_models.modelconstructorcontract.md#$columns)
* [$computed](_poppinss_data_models.modelconstructorcontract.md#$computed)
* [$primaryKey](_poppinss_data_models.modelconstructorcontract.md#$primarykey)
* [$relations](_poppinss_data_models.modelconstructorcontract.md#$relations)
* [$resolver](_poppinss_data_models.modelconstructorcontract.md#optional-$resolver)

### Methods

* [$addColumn](_poppinss_data_models.modelconstructorcontract.md#$addcolumn)
* [$addComputed](_poppinss_data_models.modelconstructorcontract.md#$addcomputed)
* [$addRelation](_poppinss_data_models.modelconstructorcontract.md#$addrelation)
* [$boot](_poppinss_data_models.modelconstructorcontract.md#$boot)
* [$createFromAdapterResult](_poppinss_data_models.modelconstructorcontract.md#$createfromadapterresult)
* [$createMultipleFromAdapterResult](_poppinss_data_models.modelconstructorcontract.md#$createmultiplefromadapterresult)
* [$getColumn](_poppinss_data_models.modelconstructorcontract.md#$getcolumn)
* [$getComputed](_poppinss_data_models.modelconstructorcontract.md#$getcomputed)
* [$getRelation](_poppinss_data_models.modelconstructorcontract.md#$getrelation)
* [$hasColumn](_poppinss_data_models.modelconstructorcontract.md#$hascolumn)
* [$hasComputed](_poppinss_data_models.modelconstructorcontract.md#$hascomputed)
* [$hasRelation](_poppinss_data_models.modelconstructorcontract.md#$hasrelation)
* [create](_poppinss_data_models.modelconstructorcontract.md#create)
* [findAll](_poppinss_data_models.modelconstructorcontract.md#findall)
* [findBy](_poppinss_data_models.modelconstructorcontract.md#findby)

## Properties

###  $adapter

• **$adapter**: *[AdapterContract](_poppinss_data_models.adaptercontract.md)*

___

###  $booted

• **$booted**: *boolean*

___

###  $columns

• **$columns**: *Map‹string, [ColumnNode](../modules/_poppinss_data_models.md#columnnode)›*

___

###  $computed

• **$computed**: *Map‹string, [ComputedNode](../modules/_poppinss_data_models.md#computednode)›*

___

###  $primaryKey

• **$primaryKey**: *string*

___

###  $relations

• **$relations**: *Map‹string, [RelationNode](../modules/_poppinss_data_models.md#relationnode)›*

___

### `Optional` $resolver

• **$resolver**? : *[ResolverContract](_poppinss_data_models.resolvercontract.md)*

## Methods

###  $addColumn

▸ **$addColumn**(`name`: string, `options`: Partial‹[ColumnNode](../modules/_poppinss_data_models.md#columnnode)›): *void*

Managing columns

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`options` | Partial‹[ColumnNode](../modules/_poppinss_data_models.md#columnnode)› |

**Returns:** *void*

___

###  $addComputed

▸ **$addComputed**(`name`: string, `options`: Partial‹[ComputedNode](../modules/_poppinss_data_models.md#computednode)›): *void*

Managing computed columns

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`options` | Partial‹[ComputedNode](../modules/_poppinss_data_models.md#computednode)› |

**Returns:** *void*

___

###  $addRelation

▸ **$addRelation**(`name`: string, `type`: "belongsTo" | "hasOne" | "hasMany" | "manyToMany" | "hasOneThrough" | "hasManyThrough", `options`: Partial‹[RelationNode](../modules/_poppinss_data_models.md#relationnode)›): *void*

Managing relationships

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`type` | "belongsTo" \| "hasOne" \| "hasMany" \| "manyToMany" \| "hasOneThrough" \| "hasManyThrough" |
`options` | Partial‹[RelationNode](../modules/_poppinss_data_models.md#relationnode)› |

**Returns:** *void*

___

###  $boot

▸ **$boot**(): *void*

**Returns:** *void*

___

###  $createFromAdapterResult

▸ **$createFromAdapterResult**(`result?`: [ModelObject](_poppinss_data_models.modelobject.md), `sideloadAttributes?`: string[]): *null | [ModelContract](_poppinss_data_models.modelcontract.md)*

Creating model from adapter results

**Parameters:**

Name | Type |
------ | ------ |
`result?` | [ModelObject](_poppinss_data_models.modelobject.md) |
`sideloadAttributes?` | string[] |

**Returns:** *null | [ModelContract](_poppinss_data_models.modelcontract.md)*

___

###  $createMultipleFromAdapterResult

▸ **$createMultipleFromAdapterResult**(`results`: [ModelObject](_poppinss_data_models.modelobject.md)[], `sideloadAttributes?`: string[]): *[ModelContract](_poppinss_data_models.modelcontract.md)[]*

**Parameters:**

Name | Type |
------ | ------ |
`results` | [ModelObject](_poppinss_data_models.modelobject.md)[] |
`sideloadAttributes?` | string[] |

**Returns:** *[ModelContract](_poppinss_data_models.modelcontract.md)[]*

___

###  $getColumn

▸ **$getColumn**(`name`: string): *[ColumnNode](../modules/_poppinss_data_models.md#columnnode) | undefined*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *[ColumnNode](../modules/_poppinss_data_models.md#columnnode) | undefined*

___

###  $getComputed

▸ **$getComputed**(`name`: string): *[ComputedNode](../modules/_poppinss_data_models.md#computednode) | undefined*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *[ComputedNode](../modules/_poppinss_data_models.md#computednode) | undefined*

___

###  $getRelation

▸ **$getRelation**<**T**>(`name`: string): *T | undefined*

**Type parameters:**

▪ **T**: *[RelationNode](../modules/_poppinss_data_models.md#relationnode)*

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

▸ **create**(`values`: [ModelObject](_poppinss_data_models.modelobject.md)): *[ModelContract](_poppinss_data_models.modelcontract.md)*

Creating model

**Parameters:**

Name | Type |
------ | ------ |
`values` | [ModelObject](_poppinss_data_models.modelobject.md) |

**Returns:** *[ModelContract](_poppinss_data_models.modelcontract.md)*

___

###  findAll

▸ **findAll**(): *Promise‹[ModelContract](_poppinss_data_models.modelcontract.md)[]›*

**Returns:** *Promise‹[ModelContract](_poppinss_data_models.modelcontract.md)[]›*

___

###  findBy

▸ **findBy**(`key`: string, `value`: any): *Promise‹null | [ModelContract](_poppinss_data_models.modelcontract.md)›*

Creating model by invoking actions on adapter

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`value` | any |

**Returns:** *Promise‹null | [ModelContract](_poppinss_data_models.modelcontract.md)›*