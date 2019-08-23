**[@poppinss/data-models](../README.md)**

[Globals](../README.md) › ["test-helpers/index"](../modules/_test_helpers_index_.md) › [FakeAdapter](_test_helpers_index_.fakeadapter.md)

# Class: FakeAdapter

## Hierarchy

* **FakeAdapter**

## Implements

* [AdapterContract](../interfaces/_src_contracts_index_.adaptercontract.md)

## Index

### Properties

* [operations](_test_helpers_index_.fakeadapter.md#operations)

### Methods

* [delete](_test_helpers_index_.fakeadapter.md#delete)
* [find](_test_helpers_index_.fakeadapter.md#find)
* [findAll](_test_helpers_index_.fakeadapter.md#findall)
* [insert](_test_helpers_index_.fakeadapter.md#insert)
* [on](_test_helpers_index_.fakeadapter.md#on)
* [update](_test_helpers_index_.fakeadapter.md#update)

## Properties

###  operations

• **operations**: *any[]* =  []

## Methods

###  delete

▸ **delete**(`instance`: [ModelContract](../interfaces/_src_contracts_index_.modelcontract.md)): *Promise‹any›*

*Implementation of [AdapterContract](../interfaces/_src_contracts_index_.adaptercontract.md)*

**Parameters:**

Name | Type |
------ | ------ |
`instance` | [ModelContract](../interfaces/_src_contracts_index_.modelcontract.md) |

**Returns:** *Promise‹any›*

___

###  find

▸ **find**(`model`: [ModelConstructorContract](../interfaces/_src_contracts_index_.modelconstructorcontract.md), `key`: string, `value`: any): *Promise‹any›*

*Implementation of [AdapterContract](../interfaces/_src_contracts_index_.adaptercontract.md)*

**Parameters:**

Name | Type |
------ | ------ |
`model` | [ModelConstructorContract](../interfaces/_src_contracts_index_.modelconstructorcontract.md) |
`key` | string |
`value` | any |

**Returns:** *Promise‹any›*

___

###  findAll

▸ **findAll**(`model`: [ModelConstructorContract](../interfaces/_src_contracts_index_.modelconstructorcontract.md)): *Promise‹any›*

*Implementation of [AdapterContract](../interfaces/_src_contracts_index_.adaptercontract.md)*

**Parameters:**

Name | Type |
------ | ------ |
`model` | [ModelConstructorContract](../interfaces/_src_contracts_index_.modelconstructorcontract.md) |

**Returns:** *Promise‹any›*

___

###  insert

▸ **insert**(`instance`: [ModelContract](../interfaces/_src_contracts_index_.modelcontract.md), `attributes`: any): *Promise‹any›*

*Implementation of [AdapterContract](../interfaces/_src_contracts_index_.adaptercontract.md)*

**Parameters:**

Name | Type |
------ | ------ |
`instance` | [ModelContract](../interfaces/_src_contracts_index_.modelcontract.md) |
`attributes` | any |

**Returns:** *Promise‹any›*

___

###  on

▸ **on**(`action`: "insert", `handler`: function): *void*

**Parameters:**

▪ **action**: *"insert"*

▪ **handler**: *function*

▸ (`model`: [ModelContract](../interfaces/_src_contracts_index_.modelcontract.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`model` | [ModelContract](../interfaces/_src_contracts_index_.modelcontract.md) |

**Returns:** *void*

▸ **on**(`action`: "update", `handler`: function): *void*

**Parameters:**

▪ **action**: *"update"*

▪ **handler**: *function*

▸ (`model`: [ModelContract](../interfaces/_src_contracts_index_.modelcontract.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`model` | [ModelContract](../interfaces/_src_contracts_index_.modelcontract.md) |

**Returns:** *void*

▸ **on**(`action`: "delete", `handler`: function): *void*

**Parameters:**

▪ **action**: *"delete"*

▪ **handler**: *function*

▸ (`model`: [ModelContract](../interfaces/_src_contracts_index_.modelcontract.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`model` | [ModelContract](../interfaces/_src_contracts_index_.modelcontract.md) |

**Returns:** *void*

▸ **on**(`action`: "find", `handler`: function): *void*

**Parameters:**

▪ **action**: *"find"*

▪ **handler**: *function*

▸ (`model`: [ModelConstructorContract](../interfaces/_src_contracts_index_.modelconstructorcontract.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`model` | [ModelConstructorContract](../interfaces/_src_contracts_index_.modelconstructorcontract.md) |

**Returns:** *void*

▸ **on**(`action`: "findAll", `handler`: function): *void*

**Parameters:**

▪ **action**: *"findAll"*

▪ **handler**: *function*

▸ (`model`: [ModelConstructorContract](../interfaces/_src_contracts_index_.modelconstructorcontract.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`model` | [ModelConstructorContract](../interfaces/_src_contracts_index_.modelconstructorcontract.md) |

**Returns:** *void*

___

###  update

▸ **update**(`instance`: [ModelContract](../interfaces/_src_contracts_index_.modelcontract.md), `attributes`: any): *Promise‹any›*

*Implementation of [AdapterContract](../interfaces/_src_contracts_index_.adaptercontract.md)*

**Parameters:**

Name | Type |
------ | ------ |
`instance` | [ModelContract](../interfaces/_src_contracts_index_.modelcontract.md) |
`attributes` | any |

**Returns:** *Promise‹any›*