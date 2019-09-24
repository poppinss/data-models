[@poppinss/data-models](../README.md) › [@poppinss/data-models](../modules/_poppinss_data_models.md) › [AdapterContract](_poppinss_data_models.adaptercontract.md)

# Interface: AdapterContract

Every adapter must adhere to the Adapter contract

## Hierarchy

* **AdapterContract**

## Implemented by

* [FakeAdapter](../classes/_test_helpers_index_.fakeadapter.md)

## Index

### Methods

* [delete](_poppinss_data_models.adaptercontract.md#delete)
* [find](_poppinss_data_models.adaptercontract.md#find)
* [findAll](_poppinss_data_models.adaptercontract.md#findall)
* [insert](_poppinss_data_models.adaptercontract.md#insert)
* [update](_poppinss_data_models.adaptercontract.md#update)

## Methods

###  delete

▸ **delete**(`instance`: [ModelContract](_poppinss_data_models.modelcontract.md)): *Promise‹void›*

**Parameters:**

Name | Type |
------ | ------ |
`instance` | [ModelContract](_poppinss_data_models.modelcontract.md) |

**Returns:** *Promise‹void›*

___

###  find

▸ **find**(`model`: [ModelConstructorContract](_poppinss_data_models.modelconstructorcontract.md), `key`: string, `value`: any, `options?`: any): *Promise‹null | [ModelContract](_poppinss_data_models.modelcontract.md)›*

**Parameters:**

Name | Type |
------ | ------ |
`model` | [ModelConstructorContract](_poppinss_data_models.modelconstructorcontract.md) |
`key` | string |
`value` | any |
`options?` | any |

**Returns:** *Promise‹null | [ModelContract](_poppinss_data_models.modelcontract.md)›*

___

###  findAll

▸ **findAll**(`model`: [ModelConstructorContract](_poppinss_data_models.modelconstructorcontract.md), `options?`: any): *Promise‹[ModelContract](_poppinss_data_models.modelcontract.md)[]›*

**Parameters:**

Name | Type |
------ | ------ |
`model` | [ModelConstructorContract](_poppinss_data_models.modelconstructorcontract.md) |
`options?` | any |

**Returns:** *Promise‹[ModelContract](_poppinss_data_models.modelcontract.md)[]›*

___

###  insert

▸ **insert**(`instance`: [ModelContract](_poppinss_data_models.modelcontract.md), `attributes`: any): *Promise‹void›*

**Parameters:**

Name | Type |
------ | ------ |
`instance` | [ModelContract](_poppinss_data_models.modelcontract.md) |
`attributes` | any |

**Returns:** *Promise‹void›*

___

###  update

▸ **update**(`instance`: [ModelContract](_poppinss_data_models.modelcontract.md), `attributes`: any): *Promise‹void›*

**Parameters:**

Name | Type |
------ | ------ |
`instance` | [ModelContract](_poppinss_data_models.modelcontract.md) |
`attributes` | any |

**Returns:** *Promise‹void›*
