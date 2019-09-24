/*
* @poppinss/data-models
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import test from 'japa'

import { RelationNode, ColumnNode } from '../src/Contracts'
import { column, computed, belongsTo } from '../src/Decorators'
import { BaseModel } from '../src/Model/BaseModel'
import { FakeAdapter, mapToObj } from '../test-helpers'

test.group('Base Model | resolver', () => {
  test('pull serializeAs and castAs keys from resolver', (assert) => {
    class User extends BaseModel {
      @column()
      public username: string

      public static $resolver = {
        getSerializeAsKey (key) {
          return key.toUpperCase()
        },
        getCastAsKey (key) {
          return key.toUpperCase()
        },
        processRelation (_name, _type, options) {
          return options as unknown as RelationNode
        },
      }
    }

    assert.deepEqual(mapToObj<{ [name: string]: ColumnNode }>(User.$columns), {
      username: {
        castAs: 'USERNAME',
        serializeAs: 'USERNAME',
        nullable: false,
        primary: false,
        hasGetter: false,
        hasSetter: false,
      },
    })
  })

  test('pull serializeAs name of relation from resolver', (assert) => {
    class Profile extends BaseModel {}

    class User extends BaseModel {
      @belongsTo({ relatedModel: () => Profile })
      public profile: Profile

      public static $resolver = {
        getSerializeAsKey (key) {
          return key.toUpperCase()
        },
        getCastAsKey (key) {
          return key.toUpperCase()
        },
        processRelation (_name, _type, _orginModel, options) {
          return options as unknown as RelationNode
        },
      }
    }

    assert.equal(User.$relations.get('profile')!.serializeAs, 'PROFILE')
  })
})

test.group('Base Model | getter-setters', () => {
  test('set property on $attributes when defined on model instance', (assert) => {
    class User extends BaseModel {
      @column()
      public username: string
    }

    const user = new User()
    user.username = 'virk'

    assert.deepEqual(user.$attributes, { username: 'virk' })
  })

  test('pass value to setter when defined', (assert) => {
    class User extends BaseModel {
      @column()
      public set username (value: any) {
        this.$setAttribute('username', value.toUpperCase())
      }
    }

    const user = new User()
    user.username = 'virk'

    assert.deepEqual(user.$attributes, { username: 'VIRK' })
  })

  test('set value on model instance when is not a column', (assert) => {
    class User extends BaseModel {
      public username: string
    }
    User.$boot()

    const user = new User()
    user.username = 'virk'

    assert.deepEqual(user.$attributes, {})
    assert.equal(user.username, 'virk')
  })

  test('get value from attributes', (assert) => {
    class User extends BaseModel {
      @column()
      public username: string
    }

    const user = new User()
    user.$attributes = { username: 'virk' }

    assert.equal(user.username, 'virk')
  })

  test('rely on getter when column is defined as a getter', (assert) => {
    class User extends BaseModel {
      @column()
      public get username () {
        return this.$getAttribute('username').toUpperCase()
      }
    }

    const user = new User()
    user.$attributes = { username: 'virk' }

    assert.equal(user.username, 'VIRK')
  })

  test('get value from model instance when is not a column', (assert) => {
    class User extends BaseModel {
      public username = 'virk'
    }

    User.$boot()
    const user = new User()
    assert.equal(user.username, 'virk')
  })

  test('get value for primary key', (assert) => {
    class User extends BaseModel {
      @column({ primary: true })
      public id: number

      @column()
      public username: string
    }

    const user = new User()
    user.$attributes = { username: 'virk', id: 1 }

    assert.deepEqual(user.$primaryKeyValue, 1)
  })

  test('invoke getter when accessing value using $primaryKeyValue', (assert) => {
    class User extends BaseModel {
      @column({ primary: true })
      public get id () {
        return String(this.$getAttribute('id'))
      }

      @column()
      public username: string
    }

    const user = new User()
    user.$attributes = { username: 'virk', id: 1 }

    assert.deepEqual(user.$primaryKeyValue, '1')
  })
})

test.group('Base Model | dirty', () => {
  test('get dirty properties on a fresh model', (assert) => {
    class User extends BaseModel {
      @column()
      public username: string
    }

    const user = new User()
    user.username = 'virk'

    assert.deepEqual(user.$dirty, { username: 'virk' })
    assert.isTrue(user.$isDirty)
  })

  test('get empty object when model is not dirty', (assert) => {
    class User extends BaseModel {
      @column()
      public username: string
    }

    const user = new User()
    user.username = 'virk'
    user.$original = { username: 'virk' }
    user.$persisted = true

    assert.deepEqual(user.$dirty, {})
    assert.isFalse(user.$isDirty)
  })

  test('get empty object when model is not dirty with null values', (assert) => {
    class User extends BaseModel {
      @column()
      public username: string
    }

    const user = new User()

    user.$attributes = { username: null }
    user.$original = { username: null }
    user.$persisted = true

    assert.deepEqual(user.$dirty, {})
    assert.isFalse(user.$isDirty)
  })

  test('get empty object when model is not dirty with false values', (assert) => {
    class User extends BaseModel {
      @column()
      public username: string
    }

    const user = new User()

    user.$attributes = { username: false }
    user.$original = { username: false }
    user.$persisted = true

    assert.deepEqual(user.$dirty, {})
    assert.isFalse(user.$isDirty)
  })

  test('get values removed as a side-effect of fill as dirty', async (assert) => {
    const adapter = new FakeAdapter()
    class User extends BaseModel {
      @column()
      public username: string

      @column()
      public age: number
    }
    User.$adapter = adapter

    const user = new User()
    user.username = 'virk'
    user.age = 22
    await user.save()

    assert.deepEqual(user.$dirty, {})
    assert.isFalse(user.$isDirty)
    assert.isTrue(user.$persisted)

    user.fill({ username: 'virk' })
    assert.deepEqual(user.$dirty, { age: null })
  })
})

test.group('Base Model | persist', () => {
  test('persist model with the adapter', async (assert) => {
    const adapter = new FakeAdapter()

    class User extends BaseModel {
      @column()
      public username: string

      @column({ castAs: 'full_name' })
      public fullName: string
    }

    User.$adapter = adapter

    const user = new User()
    user.username = 'virk'
    user.fullName = 'H virk'

    await user.save()
    assert.isTrue(user.$persisted)
    assert.isFalse(user.$isDirty)
    assert.deepEqual(adapter.operations, [{
      type: 'insert',
      instance: user,
      attributes: { username: 'virk', full_name: 'H virk' },
    }])

    assert.deepEqual(user.$attributes, { username: 'virk', fullName: 'H virk' })
    assert.deepEqual(user.$original, { username: 'virk', fullName: 'H virk' })
  })

  test('merge adapter insert return value with attributes', async (assert) => {
    const adapter = new FakeAdapter()

    class User extends BaseModel {
      @column()
      public username: string

      @column()
      public id: number
    }

    User.$adapter = adapter
    adapter.on('insert', (model) => {
      model.$consumeAdapterResult({ id: 1 })
    })

    const user = new User()
    user.username = 'virk'

    await user.save()
    assert.isTrue(user.$persisted)
    assert.isFalse(user.$isDirty)
    assert.deepEqual(adapter.operations, [{
      type: 'insert',
      instance: user,
      attributes: { username: 'virk' },
    }])

    assert.deepEqual(user.$attributes, { username: 'virk', id: 1 })
    assert.deepEqual(user.$original, { username: 'virk', id: 1 })
  })

  test('do not merge adapter results when not part of model columns', async (assert) => {
    const adapter = new FakeAdapter()

    class User extends BaseModel {
      @column()
      public username: string
    }

    User.$adapter = adapter
    adapter.on('insert', () => {
      return { id: 1 }
    })

    const user = new User()
    user.username = 'virk'

    await user.save()
    assert.isTrue(user.$persisted)
    assert.isFalse(user.$isDirty)
    assert.deepEqual(adapter.operations, [{
      type: 'insert',
      instance: user,
      attributes: { username: 'virk' },
    }])

    assert.deepEqual(user.$attributes, { username: 'virk' })
    assert.deepEqual(user.$original, { username: 'virk' })
  })

  test('issue update when model has already been persisted', async (assert) => {
    const adapter = new FakeAdapter()

    class User extends BaseModel {
      @column()
      public username: string
    }

    User.$adapter = adapter

    const user = new User()
    user.username = 'virk'
    user.$persisted = true

    await user.save()
    assert.isTrue(user.$persisted)
    assert.isFalse(user.$isDirty)
    assert.deepEqual(adapter.operations, [{
      type: 'update',
      instance: user,
      attributes: { username: 'virk' },
    }])

    assert.deepEqual(user.$attributes, { username: 'virk' })
    assert.deepEqual(user.$original, { username: 'virk' })
  })

  test('merge return values from update', async (assert) => {
    const adapter = new FakeAdapter()

    class User extends BaseModel {
      @column()
      public username: string

      @column({ castAs: 'updated_at' })
      public updatedAt: string
    }

    adapter.on('update', (model) => {
      return model.$consumeAdapterResult({ updated_at: '2019-11-20' })
    })

    User.$adapter = adapter

    const user = new User()
    user.username = 'virk'
    user.$persisted = true

    await user.save()
    assert.isTrue(user.$persisted)
    assert.isFalse(user.$isDirty)
    assert.deepEqual(adapter.operations, [{
      type: 'update',
      instance: user,
      attributes: { username: 'virk' },
    }])

    assert.deepEqual(user.$attributes, { username: 'virk', updatedAt: '2019-11-20' })
    assert.deepEqual(user.$original, { username: 'virk', updatedAt: '2019-11-20' })
  })

  test('do not issue update when model is not dirty', async (assert) => {
    const adapter = new FakeAdapter()

    class User extends BaseModel {
      @column()
      public username: string

      @column({ castAs: 'updated_at' })
      public updatedAt: string
    }

    User.$adapter = adapter

    const user = new User()
    user.$persisted = true

    await user.save()
    assert.isTrue(user.$persisted)
    assert.isFalse(user.$isDirty)
    assert.deepEqual(adapter.operations, [])
    assert.deepEqual(user.$attributes, {})
    assert.deepEqual(user.$original, {})
  })
})

test.group('Base Model | fetch', () => {
  test('find by key/value pair', async (assert) => {
    const adapter = new FakeAdapter()

    class User extends BaseModel {
      @column()
      public username: string

      @column({ castAs: 'full_name' })
      public fullName: string
    }

    adapter.on('find', (model) => {
      return model.$createFromAdapterResult({ username: 'virk' })
    })
    User.$adapter = adapter

    const user = await User.findBy('username', 'virk')
    user!.username = 'virk'

    assert.isTrue(user!.$persisted)
    assert.isFalse(user!.$isDirty)
    assert.isFalse(user!.$isLocal)
    assert.deepEqual(adapter.operations, [{
      type: 'find',
      model: User,
      key: 'username',
      value: 'virk',
    }])

    assert.deepEqual(user!.$attributes, { username: 'virk' })
    assert.deepEqual(user!.$original, { username: 'virk' })
  })

  test('set options on model instance passed to $createFromAdapterResult', async (assert) => {
    const adapter = new FakeAdapter()

    class User extends BaseModel {
      @column()
      public username: string

      @column({ castAs: 'full_name' })
      public fullName: string
    }

    adapter.on('find', (model) => {
      return model.$createFromAdapterResult({ username: 'virk' }, [], { connection: 'foo' })
    })
    User.$adapter = adapter

    const user = await User.findBy('username', 'virk')
    user!.username = 'virk'

    assert.deepEqual(user!.$options, { connection: 'foo' })
    assert.isTrue(user!.$persisted)
    assert.isFalse(user!.$isDirty)
    assert.isFalse(user!.$isLocal)
    assert.deepEqual(adapter.operations, [{
      type: 'find',
      model: User,
      key: 'username',
      value: 'virk',
    }])

    assert.deepEqual(user!.$attributes, { username: 'virk' })
    assert.deepEqual(user!.$original, { username: 'virk' })
  })

  test('return null when adapter doesn\'t returns an object', async (assert) => {
    const adapter = new FakeAdapter()

    class User extends BaseModel {
      @column()
      public username: string

      @column({ castAs: 'full_name' })
      public fullName: string
    }

    adapter.on('find', () => {
      return null
    })
    User.$adapter = adapter

    const user = await User.findBy('username', 'virk')
    assert.isNull(user)
  })

  test('return an array of model instances from adapter result', async (assert) => {
    const adapter = new FakeAdapter()

    class User extends BaseModel {
      @column()
      public username: string

      @column({ castAs: 'full_name' })
      public fullName: string
    }

    adapter.on('findAll', (model) => {
      return model.$createMultipleFromAdapterResult([{ username: 'virk', full_name: 'H virk' }, { username: 'prasan' }])
    })
    User.$adapter = adapter

    const users = await User.findAll()
    assert.lengthOf(users, 2)

    assert.deepEqual(adapter.operations, [{
      type: 'findAll',
      model: User,
    }])

    assert.isTrue(users[0].$persisted)
    assert.isFalse(users[0].$isDirty)
    assert.isFalse(users[0].$isLocal)
    assert.deepEqual(users[0].$attributes, { username: 'virk', fullName: 'H virk' })
    assert.deepEqual(users[0].$original, { username: 'virk', fullName: 'H virk' })

    assert.isTrue(users[1].$persisted)
    assert.isFalse(users[1].$isDirty)
    assert.isFalse(users[1].$isLocal)
    assert.deepEqual(users[1].$attributes, { username: 'prasan' })
    assert.deepEqual(users[1].$original, { username: 'prasan' })
  })

  test('pass options to an array of model instance', async (assert) => {
    const adapter = new FakeAdapter()

    class User extends BaseModel {
      @column()
      public username: string

      @column({ castAs: 'full_name' })
      public fullName: string
    }

    adapter.on('findAll', (model) => {
      return model.$createMultipleFromAdapterResult(
        [{ username: 'virk', full_name: 'H virk' }, { username: 'prasan' }],
        [],
        { connection: 'foo' },
      )
    })
    User.$adapter = adapter

    const users = await User.findAll()
    assert.lengthOf(users, 2)

    assert.deepEqual(adapter.operations, [{
      type: 'findAll',
      model: User,
    }])

    assert.isTrue(users[0].$persisted)
    assert.isFalse(users[0].$isDirty)
    assert.isFalse(users[0].$isLocal)
    assert.deepEqual(users[0].$options, { connection: 'foo' })
    assert.deepEqual(users[0].$attributes, { username: 'virk', fullName: 'H virk' })
    assert.deepEqual(users[0].$original, { username: 'virk', fullName: 'H virk' })

    assert.isTrue(users[1].$persisted)
    assert.isFalse(users[1].$isDirty)
    assert.isFalse(users[1].$isLocal)
    assert.deepEqual(users[1].$options, { connection: 'foo' })
    assert.deepEqual(users[1].$attributes, { username: 'prasan' })
    assert.deepEqual(users[1].$original, { username: 'prasan' })
  })

  test('skip rows that are not valid objects inside array', async (assert) => {
    const adapter = new FakeAdapter()

    class User extends BaseModel {
      @column()
      public username: string

      @column({ castAs: 'full_name' })
      public fullName: string
    }

    adapter.on('findAll', (model) => {
      return model.$createMultipleFromAdapterResult([{ username: 'virk', full_name: 'H virk' }, null as any])
    })
    User.$adapter = adapter

    const users = await User.findAll()
    assert.lengthOf(users, 1)

    assert.deepEqual(adapter.operations, [{
      type: 'findAll',
      model: User,
    }])

    assert.isTrue(users[0].$persisted)
    assert.isFalse(users[0].$isDirty)
    assert.isFalse(users[0].$isLocal)
    assert.deepEqual(users[0].$attributes, { username: 'virk', fullName: 'H virk' })
    assert.deepEqual(users[0].$original, { username: 'virk', fullName: 'H virk' })
  })
})

test.group('Base Model | delete', () => {
  test('delete model instance using adapter', async (assert) => {
    const adapter = new FakeAdapter()

    class User extends BaseModel {
      @column()
      public username: string
    }

    User.$adapter = adapter

    const user = new User()
    await user.delete()
    assert.deepEqual(adapter.operations, [{
      type: 'delete',
      instance: user,
    }])

    assert.isTrue(user.$isDeleted)
  })

  test('raise exception when trying to mutate model after deletion', async (assert) => {
    const adapter = new FakeAdapter()
    assert.plan(1)

    class User extends BaseModel {
      @column()
      public username: string
    }

    User.$adapter = adapter

    const user = new User()
    await user.delete()

    try {
      user.username = 'virk'
    } catch ({ message }) {
      assert.equal(message, 'E_MODEL_DELETED: Cannot mutate delete model instance')
    }
  })
})

test.group('Base Model | toJSON', () => {
  test('convert model to its JSON representation', async (assert) => {
    class User extends BaseModel {
      @column()
      public username: string
    }

    const user = new User()
    user.username = 'virk'

    assert.deepEqual(user.toJSON(), { username: 'virk' })
  })

  test('use serializeAs key when converting model to JSON', async (assert) => {
    class User extends BaseModel {
      @column({ serializeAs: 'theUsername' })
      public username: string
    }

    const user = new User()
    user.username = 'virk'

    assert.deepEqual(user.toJSON(), { theUsername: 'virk' })
  })

  test('add computed properties to toJSON result', async (assert) => {
    class User extends BaseModel {
      @column()
      public username: string

      @computed()
      public get fullName () {
        return this.username.toUpperCase()
      }
    }

    const user = new User()
    user.username = 'virk'

    assert.deepEqual(user.toJSON(), { username: 'virk', fullName: 'VIRK' })
  })
})

test.group('BaseModel | cache', () => {
  test('cache getter value', (assert) => {
    let invokedCounter = 0

    class User extends BaseModel {
      @column()
      public get username () {
        return this.$getAttributeFromCache('username', (value) => {
          invokedCounter++
          return value.toUpperCase()
        })
      }
    }

    const user = new User()
    user.$attributes = { username: 'virk' }

    assert.equal(user.username, 'VIRK')
    assert.equal(user.username, 'VIRK')
    assert.equal(user.username, 'VIRK')
    assert.equal(user.username, 'VIRK')
    assert.equal(user.username, 'VIRK')
    assert.equal(invokedCounter, 1)
  })

  test('re-call getter function when attribute value changes', (assert) => {
    let invokedCounter = 0

    class User extends BaseModel {
      @column()
      public get username () {
        return this.$getAttributeFromCache('username', (value) => {
          invokedCounter++
          return value.toUpperCase()
        })
      }
    }

    const user = new User()
    user.$attributes = { username: 'virk' }

    assert.equal(user.username, 'VIRK')

    user.$attributes.username = 'Prasanjit'
    assert.equal(user.username, 'PRASANJIT')
    assert.equal(user.username, 'PRASANJIT')
    assert.equal(user.username, 'PRASANJIT')
    assert.equal(user.username, 'PRASANJIT')

    assert.equal(invokedCounter, 2)
  })
})

test.group('BaseModel | fill/merge', () => {
  test('fill model instance with bulk attributes', (assert) => {
    class User extends BaseModel {
      @column()
      public username: string
    }

    const user = new User()
    user.fill({ username: 'virk', isAdmin: true })
    assert.deepEqual(user.$attributes, { username: 'virk' })
  })

  test('set extra properties via fill', (assert) => {
    class User extends BaseModel {
      @column()
      public username: string
    }

    const user = new User()
    user.fill({ username: 'virk', isAdmin: true })
    assert.deepEqual(user.$attributes, { username: 'virk' })
    assert.deepEqual(user.$extras, { isAdmin: true })
  })

  test('overwrite existing values when using fill', (assert) => {
    class User extends BaseModel {
      @column()
      public username: string

      @column()
      public age: number
    }

    const user = new User()
    user.age = 22

    assert.deepEqual(user.$attributes, { age: 22 })
    user.fill({ username: 'virk', isAdmin: true })
    assert.deepEqual(user.$attributes, { username: 'virk' })
  })

  test('merge to existing when using merge instead of fill', (assert) => {
    class User extends BaseModel {
      @column()
      public username: string

      @column()
      public age: number
    }

    const user = new User()
    user.age = 22

    assert.deepEqual(user.$attributes, { age: 22 })
    user.merge({ username: 'virk', isAdmin: true })
    assert.deepEqual(user.$attributes, { username: 'virk', age: 22 })
  })

  test('invoke setter when using fill', (assert) => {
    class User extends BaseModel {
      @column()
      public username: string

      @column()
      public get age (): number {
        return this.$getAttribute('age')
      }

      public set age (age: number) {
        this.$setAttribute('age', age + 1)
      }
    }

    const user = new User()
    user.age = 22

    assert.deepEqual(user.$attributes, { age: 23 })
    user.fill({ username: 'virk', age: 22 })
    assert.deepEqual(user.$attributes, { username: 'virk', age: 23 })
  })
})

test.group('Base | apdater', () => {
  test('pass model constructor and custom options to find method', (assert) => {
    const adapter = new FakeAdapter()

    class User extends BaseModel {
      @column()
      public username: string
    }

    User.$adapter = adapter
    User.findBy('foo', 'bar', { connection: 'foo' })
    assert.deepEqual(adapter.operations, [{
      type: 'find',
      key: 'foo',
      value: 'bar',
      options: { connection: 'foo' },
      model: User,
    }])
  })

  test('pass model constructor and custom options to findAll method', (assert) => {
    const adapter = new FakeAdapter()

    class User extends BaseModel {
      @column()
      public username: string
    }

    User.$adapter = adapter
    User.findAll({ connection: 'foo' })

    assert.deepEqual(adapter.operations, [{
      type: 'findAll',
      options: { connection: 'foo' },
      model: User,
    }])
  })

  test('pass model instance with attributes to the adapter insert method', async (assert) => {
    const adapter = new FakeAdapter()

    class User extends BaseModel {
      @column()
      public username: string
    }

    User.$adapter = adapter
    const user = new User()
    user.username = 'virk'
    user.$options = { connection: 'foo' }

    await user.save()

    assert.deepEqual(adapter.operations, [{
      type: 'insert',
      instance: user,
      attributes: { username: 'virk' },
    }])
  })

  test('pass model instance with attributes to the adapter update method', async (assert) => {
    const adapter = new FakeAdapter()

    class User extends BaseModel {
      @column()
      public username: string
    }

    User.$adapter = adapter
    const user = new User()
    user.username = 'virk'
    user.$options = { connection: 'foo' }

    await user.save()

    user.username = 'nikk'
    await user.save()

    assert.deepEqual(adapter.operations, [
      {
        type: 'insert',
        instance: user,
        attributes: { username: 'virk' },
      },
      {
        type: 'update',
        instance: user,
        attributes: { username: 'nikk' },
      },
    ])
  })

  test('pass model instance to the adapter delete method', async (assert) => {
    const adapter = new FakeAdapter()

    class User extends BaseModel {
      @column()
      public username: string
    }

    User.$adapter = adapter
    const user = new User()
    user.username = 'virk'
    user.$options = { connection: 'foo' }

    await user.save()
    await user.delete()

    assert.deepEqual(adapter.operations, [
      {
        type: 'insert',
        instance: user,
        attributes: { username: 'virk' },
      },
      {
        type: 'delete',
        instance: user,
      },
    ])
  })
})

test.group('Base Model | sideloaded', () => {
  test('define sideloaded properties using $consumeAdapterResults method', (assert) => {
    class User extends BaseModel {
      @column()
      public username: string
    }

    const user = new User()
    user.$consumeAdapterResult({ username: 'virk' }, { loggedInUser: { id: 1 } })

    assert.deepEqual(user.$attributes, { username: 'virk' })
    assert.deepEqual(user.$sideloaded, { loggedInUser: { id: 1 } })
  })

  test('define sideloaded properties using $createFromAdapterResult method', (assert) => {
    class User extends BaseModel {
      @column()
      public username: string
    }

    const user = User.$createFromAdapterResult({ username: 'virk' }, { loggedInUser: { id: 1 } })!
    assert.deepEqual(user.$attributes, { username: 'virk' })
    assert.deepEqual(user.$sideloaded, { loggedInUser: { id: 1 } })
  })

  test('define sideloaded properties using $createMultipleFromAdapterResult method', (assert) => {
    class User extends BaseModel {
      @column()
      public username: string
    }

    const users = User.$createMultipleFromAdapterResult(
      [{ username: 'virk' }, { username: 'nikk' }],
      { loggedInUser: { id: 1 } },
    )

    assert.deepEqual(users[0].$attributes, { username: 'virk' })
    assert.deepEqual(users[0].$sideloaded, { loggedInUser: { id: 1 } })

    assert.deepEqual(users[1].$attributes, { username: 'nikk' })
    assert.deepEqual(users[1].$sideloaded, { loggedInUser: { id: 1 } })
  })
})
