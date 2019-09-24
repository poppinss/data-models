/*
 * @poppinss/data-models
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import test from 'japa'

import { ModelContract } from '../src/Contracts'
import { BaseModel } from '../src/Model/BaseModel'
import { column, hasOne, hasMany, manyToMany } from '../src/Decorators'
import { FakeAdapter } from '../test-helpers'

test.group('Model | relations', () => {
  test('consume payload for a hasOne relation', (assert) => {
    class Profile extends BaseModel {
      @column()
      public username: string
    }

    class User extends BaseModel {
      @column({ primary: true })
      public id: number

      @hasOne({ relatedModel: () => Profile })
      public profile: Profile
    }

    const user = new User()
    user.$consumeAdapterResult({
      id: 1,
      profile: {
        username: 'virk',
      },
    })

    assert.deepEqual(user.profile.username, 'virk')
    assert.instanceOf(user.$preloaded.profile, Profile)
  })

  test('return null for hasOne when not defined', (assert) => {
    class Profile extends BaseModel {
      @column()
      public username: string
    }

    class User extends BaseModel {
      @column({ primary: true })
      public id: number

      @hasOne({ relatedModel: () => Profile })
      public profile: Profile
    }

    const user = new User()
    user.$consumeAdapterResult({
      id: 1,
    })

    assert.isNull(user.profile)
    assert.deepEqual(user.$preloaded, {})
  })

  test('consume payload for hasMany relationship', (assert) => {
    class Posts extends BaseModel {
      @column()
      public title: string
    }

    class User extends BaseModel {
      @column({ primary: true })
      public id: number

      @hasMany({ relatedModel: () => Posts })
      public posts: Posts[]
    }

    const user = new User()
    user.$consumeAdapterResult({
      id: 1,
      posts: [{
        id: 1,
        title: 'Hello world 101',
      }],
    })

    assert.lengthOf((user.$preloaded.posts as ModelContract[]), 1)
    assert.instanceOf(user.$preloaded.posts[0], Posts)

    assert.lengthOf(user.posts, 1)
    assert.equal(user.posts[0].title, 'Hello world 101')
  })

  test('consume nested relations', (assert) => {
    class SocialProfile extends BaseModel {
      @column()
      public handle: string
    }

    class Profile extends BaseModel {
      @column()
      public username: string

      @hasOne({ relatedModel: () => SocialProfile })
      public social: SocialProfile
    }

    class User extends BaseModel {
      @column({ primary: true })
      public id: number

      @hasOne({ relatedModel: () => Profile })
      public profile: Profile
    }

    const user = new User()
    user.$consumeAdapterResult({
      id: 1,
      profile: {
        username: 'virk',
        social: {
          handle: '@virk',
        },
      },
    })

    assert.deepEqual(user.profile.username, 'virk')
    assert.deepEqual(user.profile.social.handle, '@virk')
    assert.instanceOf(user.$preloaded.profile, Profile)
    assert.instanceOf((user.$preloaded.profile as ModelContract).$preloaded.social, SocialProfile)
  })

  test('consume relations from a top level array', async (assert) => {
    const adapter = new FakeAdapter()
    class Profile extends BaseModel {
      @column()
      public username: string
    }

    class User extends BaseModel {
      @column({ primary: true })
      public id: number

      @hasOne({ relatedModel: () => Profile })
      public profile: Profile
    }

    User.$adapter = adapter
    adapter.on('findAll', (model) => {
      return model.$createMultipleFromAdapterResult([
        {
          id: 1,
          profile: {
            username: 'virk',
          },
        },
        {
          id: 2,
          profile: {
            username: 'nikk',
          },
        },
      ])
    })

    const users = await User.findAll()

    assert.lengthOf(users, 2)
    assert.equal(users[0].profile.username, 'virk')
    assert.equal(users[1].profile.username, 'nikk')
  })

  test('raise error when trying to set relationship manually', async (assert) => {
    assert.plan(1)

    class Profile extends BaseModel {
      @column()
      public username: string
    }

    class User extends BaseModel {
      @column({ primary: true })
      public id: number

      @hasOne({ relatedModel: () => Profile })
      public profile: Profile
    }

    const user = new User()

    try {
      user.profile = new Profile()
    } catch ({ message }) {
      assert.equal(message, 'E_CANNOT_DEFINE_RELATIONSHIP: Cannot set relationships locally')
    }
  })

  test('consume payload for manyToMany relationship with pivot attributes', (assert) => {
    class Subject extends BaseModel {
      @column()
      public title: string
    }

    class User extends BaseModel {
      @column({ primary: true })
      public id: number

      @manyToMany({ relatedModel: () => Subject })
      public subjects: Subject[]
    }

    const user = new User()
    user.$consumeAdapterResult({
      id: 1,
      subjects: [{
        title: 'Maths',
        pivot: {
          id: 1,
          enrolled: true,
        },
      }],
    })

    assert.lengthOf((user.$preloaded.subjects as ModelContract[]), 1)
    assert.instanceOf(user.$preloaded.subjects[0], Subject)

    assert.lengthOf(user.subjects, 1)
    assert.equal(user.subjects[0].title, 'Maths')
    assert.deepEqual(user.subjects[0].$sideloaded.pivot, { id: 1, enrolled: true })
  })

  test('serialize relation toJSON', (assert) => {
    class Profile extends BaseModel {
      @column()
      public username: string
    }

    class User extends BaseModel {
      @column({ primary: true })
      public id: number

      @hasOne({ relatedModel: () => Profile })
      public profile: Profile
    }

    const user = new User()
    user.$consumeAdapterResult({
      id: 1,
      profile: {
        username: 'virk',
      },
    })

    assert.deepEqual(user.toJSON(), {
      id: 1,
      profile: {
        username: 'virk',
      },
    })
  })

  test('serialize relation toJSON with custom serializeAs key', (assert) => {
    class Profile extends BaseModel {
      @column()
      public username: string
    }

    class User extends BaseModel {
      @column({ primary: true })
      public id: number

      @hasOne({ relatedModel: () => Profile, serializeAs: 'social' })
      public profile: Profile
    }

    const user = new User()
    user.$consumeAdapterResult({
      id: 1,
      profile: {
        username: 'virk',
      },
    })

    assert.deepEqual(user.toJSON(), {
      id: 1,
      social: {
        username: 'virk',
      },
    })
  })

  test('pass model options to one to many related models', (assert) => {
    class Subject extends BaseModel {
      @column()
      public title: string
    }

    class User extends BaseModel {
      @column({ primary: true })
      public id: number

      @manyToMany({ relatedModel: () => Subject })
      public subjects: Subject[]
    }

    const user = new User()
    user.$options = { connection: 'foo' }
    user.$consumeAdapterResult({
      id: 1,
      subjects: [{
        title: 'Maths',
        pivot: {
          id: 1,
          enrolled: true,
        },
      }],
    })

    assert.lengthOf((user.$preloaded.subjects as ModelContract[]), 1)
    assert.instanceOf(user.$preloaded.subjects[0], Subject)

    assert.lengthOf(user.subjects, 1)
    assert.equal(user.subjects[0].title, 'Maths')
    assert.deepEqual(user.subjects[0].$options, { connection: 'foo' })
    assert.deepEqual(user.subjects[0].$sideloaded.pivot, { id: 1, enrolled: true })
  })

  test('pass model options to one to one related models', (assert) => {
    class Profile extends BaseModel {
      @column()
      public username: string
    }

    class User extends BaseModel {
      @column({ primary: true })
      public id: number

      @hasOne({ relatedModel: () => Profile })
      public profile: Profile
    }

    const user = new User()
    user.$options = { connection: 'foo' }
    user.$consumeAdapterResult({
      id: 1,
      profile: {
        username: 'virk',
      },
    })

    assert.deepEqual(user.profile.username, 'virk')
    assert.instanceOf(user.$preloaded.profile, Profile)
    assert.deepEqual((user.$preloaded.profile as Profile).$options, { connection: 'foo' })
  })
})
