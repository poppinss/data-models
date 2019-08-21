/*
* @poppinss/data-models
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import test from 'japa'
import { column, computed } from '../src/Decorators'
import { BaseModel } from '../src/Model/BaseModel'
import { FakeAdapter } from '../test-helpers'

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

    assert.deepEqual(user.$dirty, {})
    assert.isFalse(user.$isDirty)
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
        return this.$attributes.username.toUpperCase()
      }
    }

    const user = new User()
    user.username = 'virk'

    assert.deepEqual(user.toJSON(), { username: 'virk', fullName: 'VIRK' })
  })
})
