
## Philosophy

Each model has 2 main properties

### Attributes
- Attributes are sent to adapter for persistance.
- Attributes are loaded from adapter.
- Calling `toJSON` on model instance will return an object of attributes.

### Computed properties
Computed properties are only required when you want to show up in the output of `toJSON` otherwise you can create normal properties on model and use them internally.

```js
class User {
  @column()
  public firstname: string

  @column()
  public lastname: string

  public fullname () {
    return this.firstname + this.lastname
  }
}

user.toJSON() // { firstname, lastname }
```

Mark `fullname` as computed.

```js
class User {
  @column()
  public firstname: string

  @column()
  public lastname: string

  @computed()
  public fullname () {
    return this.firstname + this.lastname
  }
}

user.toJSON() // { firstname, lastname, fullname }
```

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of contents

- [@poppinss/data-models](#poppinssdata-models)
  - [Change log](#change-log)
  - [Contributing](#contributing)
  - [Authors & License](#authors--license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
