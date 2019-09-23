[@poppinss/data-models](../README.md) › [@poppinss/data-models](../modules/_poppinss_data_models.md) › [ModelContract](_poppinss_data_models.modelcontract.md)

# Interface: ModelContract

Shape of the model instance. We prefix the properties with a `$` to
differentiate between special properties provided by the base
model but with exception to `save`, `delete`, `fill`, `merge`
and `toJSON`.

## Hierarchy

* **ModelContract**

## Implemented by

* [BaseModel](../classes/_src_model_basemodel_.basemodel.md)

## Index

### Properties

* [$attributes](_poppinss_data_models.modelcontract.md#$attributes)
* [$dirty](_poppinss_data_models.modelcontract.md#$dirty)
* [$isDeleted](_poppinss_data_models.modelcontract.md#$isdeleted)
* [$isDirty](_poppinss_data_models.modelcontract.md#$isdirty)
* [$isLocal](_poppinss_data_models.modelcontract.md#$islocal)
* [$isNew](_poppinss_data_models.modelcontract.md#$isnew)
* [$original](_poppinss_data_models.modelcontract.md#$original)
* [$persisted](_poppinss_data_models.modelcontract.md#$persisted)
* [$preloaded](_poppinss_data_models.modelcontract.md#$preloaded)
* [$primaryKeyValue](_poppinss_data_models.modelcontract.md#optional-$primarykeyvalue)
* [$sideloaded](_poppinss_data_models.modelcontract.md#$sideloaded)

### Methods

* [$consumeAdapterResult](_poppinss_data_models.modelcontract.md#$consumeadapterresult)
* [$hydrateOriginals](_poppinss_data_models.modelcontract.md#$hydrateoriginals)
* [$setRelated](_poppinss_data_models.modelcontract.md#$setrelated)
* [delete](_poppinss_data_models.modelcontract.md#delete)
* [fill](_poppinss_data_models.modelcontract.md#fill)
* [merge](_poppinss_data_models.modelcontract.md#merge)
* [save](_poppinss_data_models.modelcontract.md#save)
* [toJSON](_poppinss_data_models.modelcontract.md#tojson)

## Properties

###  $attributes

• **$attributes**: *[ModelObject](_poppinss_data_models.modelobject.md)*

___

###  $dirty

• **$dirty**: *[ModelObject](_poppinss_data_models.modelobject.md)*

___

###  $isDeleted

• **$isDeleted**: *boolean*

___

###  $isDirty

• **$isDirty**: *boolean*

___

###  $isLocal

• **$isLocal**: *boolean*

___

###  $isNew

• **$isNew**: *boolean*

___

###  $original

• **$original**: *[ModelObject](_poppinss_data_models.modelobject.md)*

___

###  $persisted

• **$persisted**: *boolean*

___

###  $preloaded

• **$preloaded**: *object*

#### Type declaration:

* \[ **relation**: *string*\]: [ModelContract](_poppinss_data_models.modelcontract.md) | [ModelContract](_poppinss_data_models.modelcontract.md)[]

___

### `Optional` $primaryKeyValue

• **$primaryKeyValue**? : *any*

___

###  $sideloaded

• **$sideloaded**: *[ModelObject](_poppinss_data_models.modelobject.md)*

## Methods

###  $consumeAdapterResult

▸ **$consumeAdapterResult**(`result`: [ModelObject](_poppinss_data_models.modelobject.md), `sideloadAttributes?`: string[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`result` | [ModelObject](_poppinss_data_models.modelobject.md) |
`sideloadAttributes?` | string[] |

**Returns:** *void*

___

###  $hydrateOriginals

▸ **$hydrateOriginals**(): *void*

**Returns:** *void*

___

###  $setRelated

▸ **$setRelated**(`key`: string, `result`: [ModelObject](_poppinss_data_models.modelobject.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`result` | [ModelObject](_poppinss_data_models.modelobject.md) |

**Returns:** *void*

___

###  delete

▸ **delete**(): *Promise‹void›*

**Returns:** *Promise‹void›*

___

###  fill

▸ **fill**(`value`: [ModelObject](_poppinss_data_models.modelobject.md), `sideloadAttributes?`: string[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [ModelObject](_poppinss_data_models.modelobject.md) |
`sideloadAttributes?` | string[] |

**Returns:** *void*

___

###  merge

▸ **merge**(`value`: [ModelObject](_poppinss_data_models.modelobject.md), `sideloadAttributes?`: string[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [ModelObject](_poppinss_data_models.modelobject.md) |
`sideloadAttributes?` | string[] |

**Returns:** *void*

___

###  save

▸ **save**(): *Promise‹void›*

**Returns:** *Promise‹void›*

___

###  toJSON

▸ **toJSON**(): *[ModelObject](_poppinss_data_models.modelobject.md)*

**Returns:** *[ModelObject](_poppinss_data_models.modelobject.md)*
