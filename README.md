## Data models
> Data models to manage data in OOP style with first class support for relationships

This library is abstracted from AdonisJs [Lucid ORM](https://github.com/adonisjs/adonis-lucid) to work as a standalone implementation of [Active model](https://guides.rubyonrails.org/active_model_basics.html) heavily inspired by Rails.

The consumer of this library will be a developer creating an ORM for backend or frontend and implementing adapter for fetching and persisting data.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of contents

- [How it works](#how-it-works)
  - [Useless without Adapter](#useless-without-adapter)
  - [Standardized API](#standardized-api)
  - [Relationship example](#relationship-example)
- [Creating adapter](#creating-adapter)
- [API](#api)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## How it works
Let's say you are working with relational data in your app and want clean abstractions to fetch and save that data. For example:

```ts
import { BaseModel, column } from '@poppinss/data-models'

class User extends BaseModel {
  @primaryColumn()
  public id: number

  @column()
  public username: string
}

class Post extends BaseModel {
  @primaryColumn()
  public id: number

  @column()
  public title: string
}
```

We start by defining 2 models that extends the `BaseModel` class and define columns on them. The model **itself doesn't know how to fetch or persist** the data and instead relies on an Adapter.

### Useless without Adapter
The Adapter can run SQL queries to fetch the data or making an HTTP call to fetch data from some REST API endpoint. Which inturn means, the models are useless without adapters. That's why, this library is meant for developers creating ORM's and not users using ORM's.

### Standardized API
However, the `BaseModel` class exposes a standardized API and does all the heavy lifting of normalizing the adapter results to model instances. For example:

```ts
import { BaseModel, column } from '@poppinss/data-models'

class User extends BaseModel {
  @primaryColumn()
  public id: number

  @column()
  public username: string
}

const user = new User()
user.username = 'virk'

await user.save()
```

The `user.save` will ask the adapter to perform insert for the given model. A SQL adapter will perform an `insert` query, whereas a REST based adapter will perform a POST request to some endpoint.

Once the API call is over, the `user.$persisted` will return `true`.

### Relationship example
Let's also see how to work with relationships.

```ts
import { BaseModel, column, belongsTo } from '@poppinss/data-models'

class User extends BaseModel {
  @primaryColumn()
  public id: number

  @column()
  public username: string
}

class Post extends BaseModel {
  @primaryColumn()
  public id: number

  @column()
  public title: string

  @belongsTo({ relatedModel: () => User })
  public author: User
}
```

- First we define a `belongsTo` relationship on the post model.
-  Next we ask the adapter (depends on your implementation) to make an API call to some endpoint that returns an array of posts along with their authors.

**Fetched JSON**

```json
[
  {
    "id": "1",
    "title": "AdonisJs 101",
    "author": {
      "id": 1,
      "username": "virk",
    }
  }
]
```

We can pass this data to the post model to create an array of model instances.

```ts
const posts = Post.$createMultipleFromAdapterResult(result)
posts.length  // 1
posts[0].title = 'Adonis 101'

// Mutate and update
posts[0].title = 'Adonis 102'
await posts[0].save()
```

Once the model is persisted, the `save` method will fire the `update` method on the adapter vs the `insert`.

## Creating adapter
We make sure to keep the surface area small for the adapter by making it define handful of methods. However, you can extend the `BaseModel` to add additional methods that inturns invokes different methods on the adapter.

```ts
const restAdapter = {
  async insert (instance, attributes) {
    const response = await axios.post({
      url: instance.$getConstructor().url,
      body: attributes
    })
    instance.$consumeAdapterResult(response.data)
  },

  async delete (instance) {
    await axios.delete({
      url: `${instance.$getConstructor().url}/${instance.$getAttribute('id')}`,
    })
  },

  update (instance, dirtyAttributes) {
    const response = await axios.patch({
      url: `${instance.$getConstructor().url}/${instance.$getAttribute('id')}`,
      body: dirtyAttributes,
    })
    instance.$consumeAdapterResult(response.data)
  },

  find (model, key, value) {
    const result = await axios.get({
      url: instance.$getConstructor().url,
      params: {
        [key]: value,
      }
    })

    return model.$createFromAdapterResult(result.body[0])
  },

  findAll (model) {
    const result = await axios.get({
      url: instance.$getConstructor().url,
    })

    return model.$createMultipleFromAdapterResult(result.body)
  }
}
```

The `find` and `findAll` method gets the model constructor and not the instance, but they must return one or more instances of the model using `$createFromAdapterResult` and `$createMultipleFromAdapterResult` methods.

## API
Please check the API docs generated via Typedoc


