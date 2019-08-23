**[@poppinss/data-models](../README.md)**

[Globals](../README.md) › ["src/Decorators/index"](_src_decorators_index_.md)

# External module: "src/Decorators/index"

## Index

### Functions

* [belongsTo](_src_decorators_index_.md#belongsto)
* [column](_src_decorators_index_.md#column)
* [computed](_src_decorators_index_.md#computed)
* [hasMany](_src_decorators_index_.md#hasmany)
* [hasManyThrough](_src_decorators_index_.md#hasmanythrough)
* [hasOne](_src_decorators_index_.md#hasone)
* [hasOneThrough](_src_decorators_index_.md#hasonethrough)
* [manyToMany](_src_decorators_index_.md#manytomany)

## Functions

###  belongsTo

▸ **belongsTo**(`relation?`: Partial‹[BelongsToNode](../interfaces/_poppinss_data_models.belongstonode.md)›): *decorateAsRelation*

Define belongsTo relationship

**Parameters:**

Name | Type |
------ | ------ |
`relation?` | Partial‹[BelongsToNode](../interfaces/_poppinss_data_models.belongstonode.md)› |

**Returns:** *decorateAsRelation*

___

###  column

▸ **column**(`column?`: Partial‹[ColumnNode](_poppinss_data_models.md#columnnode)›): *decorateAsColumn*

Define property on a model as a column. The decorator needs a
proper model class inheriting the base model

**Parameters:**

Name | Type |
------ | ------ |
`column?` | Partial‹[ColumnNode](_poppinss_data_models.md#columnnode)› |

**Returns:** *decorateAsColumn*

___

###  computed

▸ **computed**(`column?`: Partial‹[ComputedNode](_poppinss_data_models.md#computednode)›): *decorateAsComputed*

Define computed property on a model. The decorator needs a
proper model class inheriting the base model

**Parameters:**

Name | Type |
------ | ------ |
`column?` | Partial‹[ComputedNode](_poppinss_data_models.md#computednode)› |

**Returns:** *decorateAsComputed*

___

###  hasMany

▸ **hasMany**(`relation?`: Partial‹[HasManyNode](../interfaces/_poppinss_data_models.hasmanynode.md)›): *decorateAsRelation*

Define hasMany relationship

**Parameters:**

Name | Type |
------ | ------ |
`relation?` | Partial‹[HasManyNode](../interfaces/_poppinss_data_models.hasmanynode.md)› |

**Returns:** *decorateAsRelation*

___

###  hasManyThrough

▸ **hasManyThrough**(`relation?`: Partial‹[HasManyThrough](../interfaces/_poppinss_data_models.hasmanythrough.md)›): *decorateAsRelation*

Define hasManyThrough relationship

**Parameters:**

Name | Type |
------ | ------ |
`relation?` | Partial‹[HasManyThrough](../interfaces/_poppinss_data_models.hasmanythrough.md)› |

**Returns:** *decorateAsRelation*

___

###  hasOne

▸ **hasOne**(`relation?`: Partial‹[HasOneNode](../interfaces/_poppinss_data_models.hasonenode.md)›): *decorateAsRelation*

Define hasOne relationship

**Parameters:**

Name | Type |
------ | ------ |
`relation?` | Partial‹[HasOneNode](../interfaces/_poppinss_data_models.hasonenode.md)› |

**Returns:** *decorateAsRelation*

___

###  hasOneThrough

▸ **hasOneThrough**(`relation?`: Partial‹[HasOneThrough](../interfaces/_poppinss_data_models.hasonethrough.md)›): *decorateAsRelation*

Define hasOneThrough relationship

**Parameters:**

Name | Type |
------ | ------ |
`relation?` | Partial‹[HasOneThrough](../interfaces/_poppinss_data_models.hasonethrough.md)› |

**Returns:** *decorateAsRelation*

___

###  manyToMany

▸ **manyToMany**(`relation?`: Partial‹[ManyToManyNode](../interfaces/_poppinss_data_models.manytomanynode.md)›): *decorateAsRelation*

Define manyToMany relationship

**Parameters:**

Name | Type |
------ | ------ |
`relation?` | Partial‹[ManyToManyNode](../interfaces/_poppinss_data_models.manytomanynode.md)› |

**Returns:** *decorateAsRelation*