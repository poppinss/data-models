**[@poppinss/data-models](../README.md)**

[Globals](../README.md) › ["src/Contracts/index"](../modules/_src_contracts_index_.md) › [ModelContract](_src_contracts_index_.modelcontract.md)

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

* [$attributes](_src_contracts_index_.modelcontract.md#$attributes)
* [$dirty](_src_contracts_index_.modelcontract.md#$dirty)
* [$isDeleted](_src_contracts_index_.modelcontract.md#$isdeleted)
* [$isDirty](_src_contracts_index_.modelcontract.md#$isdirty)
* [$isLocal](_src_contracts_index_.modelcontract.md#$islocal)
* [$isNew](_src_contracts_index_.modelcontract.md#$isnew)
* [$original](_src_contracts_index_.modelcontract.md#$original)
* [$persisted](_src_contracts_index_.modelcontract.md#$persisted)
* [$preloaded](_src_contracts_index_.modelcontract.md#$preloaded)
* [$sideloaded](_src_contracts_index_.modelcontract.md#$sideloaded)

### Methods

* [$consumeAdapterResult](_src_contracts_index_.modelcontract.md#$consumeadapterresult)
* [$hydrateOriginals](_src_contracts_index_.modelcontract.md#$hydrateoriginals)
* [$setRelated](_src_contracts_index_.modelcontract.md#$setrelated)
* [delete](_src_contracts_index_.modelcontract.md#delete)
* [fill](_src_contracts_index_.modelcontract.md#fill)
* [merge](_src_contracts_index_.modelcontract.md#merge)
* [save](_src_contracts_index_.modelcontract.md#save)
* [toJSON](_src_contracts_index_.modelcontract.md#tojson)

## Properties

###  $attributes

• **$attributes**: *[ModelObject](_src_contracts_index_.modelobject.md)*

___

###  $dirty

• **$dirty**: *[ModelObject](_src_contracts_index_.modelobject.md)*

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

• **$original**: *[ModelObject](_src_contracts_index_.modelobject.md)*

___

###  $persisted

• **$persisted**: *boolean*

___

###  $preloaded

• **$preloaded**: *object*

#### Type declaration:

* \[ **relation**: *string*\]: [ModelContract](_src_contracts_index_.modelcontract.md) | [ModelContract](_src_contracts_index_.modelcontract.md)[]

___

###  $sideloaded

• **$sideloaded**: *[ModelObject](_src_contracts_index_.modelobject.md)*

## Methods

###  $consumeAdapterResult

▸ **$consumeAdapterResult**(`result`: [ModelObject](_src_contracts_index_.modelobject.md), `sideloadAttributes?`: string[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`result` | [ModelObject](_src_contracts_index_.modelobject.md) |
`sideloadAttributes?` | string[] |

**Returns:** *void*

___

###  $hydrateOriginals

▸ **$hydrateOriginals**(): *void*

**Returns:** *void*

___

###  $setRelated

▸ **$setRelated**(`key`: string, `result`: [ModelObject](_src_contracts_index_.modelobject.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`result` | [ModelObject](_src_contracts_index_.modelobject.md) |

**Returns:** *void*

___

###  delete

▸ **delete**(): *Promise‹void›*

**Returns:** *Promise‹void›*

___

###  fill

▸ **fill**(`value`: [ModelObject](_src_contracts_index_.modelobject.md), `sideloadAttributes?`: string[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [ModelObject](_src_contracts_index_.modelobject.md) |
`sideloadAttributes?` | string[] |

**Returns:** *void*

___

###  merge

▸ **merge**(`value`: [ModelObject](_src_contracts_index_.modelobject.md), `sideloadAttributes?`: string[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [ModelObject](_src_contracts_index_.modelobject.md) |
`sideloadAttributes?` | string[] |

**Returns:** *void*

___

###  save

▸ **save**(): *Promise‹void›*

**Returns:** *Promise‹void›*

___

###  toJSON

▸ **toJSON**(): *[ModelObject](_src_contracts_index_.modelobject.md)*

**Returns:** *[ModelObject](_src_contracts_index_.modelobject.md)*