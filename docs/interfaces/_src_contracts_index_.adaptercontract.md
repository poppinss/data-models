**[@poppinss/data-models](../README.md)**

[Globals](../README.md) › ["src/Contracts/index"](../modules/_src_contracts_index_.md) › [AdapterContract](_src_contracts_index_.adaptercontract.md)

# Interface: AdapterContract

Every adapter must adhere to the Adapter contract

## Hierarchy

* **AdapterContract**

## Implemented by

* [FakeAdapter](../classes/_test_helpers_index_.fakeadapter.md)

## Index

### Methods

* [delete](_src_contracts_index_.adaptercontract.md#delete)
* [find](_src_contracts_index_.adaptercontract.md#find)
* [findAll](_src_contracts_index_.adaptercontract.md#findall)
* [insert](_src_contracts_index_.adaptercontract.md#insert)
* [update](_src_contracts_index_.adaptercontract.md#update)

## Methods

###  delete

▸ **delete**(`instance`: [ModelContract](_src_contracts_index_.modelcontract.md)): *Promise‹void›*

**Parameters:**

Name | Type |
------ | ------ |
`instance` | [ModelContract](_src_contracts_index_.modelcontract.md) |

**Returns:** *Promise‹void›*

___

###  find

▸ **find**(`model`: [ModelConstructorContract](_src_contracts_index_.modelconstructorcontract.md), `key`: string, `value`: any): *Promise‹null | [ModelContract](_src_contracts_index_.modelcontract.md)›*

**Parameters:**

Name | Type |
------ | ------ |
`model` | [ModelConstructorContract](_src_contracts_index_.modelconstructorcontract.md) |
`key` | string |
`value` | any |

**Returns:** *Promise‹null | [ModelContract](_src_contracts_index_.modelcontract.md)›*

___

###  findAll

▸ **findAll**(`model`: [ModelConstructorContract](_src_contracts_index_.modelconstructorcontract.md)): *Promise‹[ModelContract](_src_contracts_index_.modelcontract.md)[]›*

**Parameters:**

Name | Type |
------ | ------ |
`model` | [ModelConstructorContract](_src_contracts_index_.modelconstructorcontract.md) |

**Returns:** *Promise‹[ModelContract](_src_contracts_index_.modelcontract.md)[]›*

___

###  insert

▸ **insert**(`instance`: [ModelContract](_src_contracts_index_.modelcontract.md), `attributes`: any): *Promise‹void›*

**Parameters:**

Name | Type |
------ | ------ |
`instance` | [ModelContract](_src_contracts_index_.modelcontract.md) |
`attributes` | any |

**Returns:** *Promise‹void›*

___

###  update

▸ **update**(`instance`: [ModelContract](_src_contracts_index_.modelcontract.md), `attributes`: any): *Promise‹void›*

**Parameters:**

Name | Type |
------ | ------ |
`instance` | [ModelContract](_src_contracts_index_.modelcontract.md) |
`attributes` | any |

**Returns:** *Promise‹void›*