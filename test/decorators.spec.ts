/*
* @poppinss/data-models
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import test from 'japa'

import { mapToObj } from '../test-helpers'
import { BaseModel } from '../src/Model/BaseModel'
import { column, computed, hasOne, manyToMany } from '../src/Decorators'
import { ColumnNode, ComputedNode, ManyToManyNode } from '../src/Contracts'

test.group('columns', () => {
  test('add multiple columns', (assert) => {
    class User extends BaseModel {
      @column()
      public username: string

      @column()
      public age: number
    }

    assert.deepEqual(mapToObj<{ [name: string]: ColumnNode }>(User.$columns), {
      username: {
        serializeAs: 'username',
        castAs: 'username',
        hasGetter: false,
        hasSetter: false,
        nullable: false,
        primary: false,
      },
      age: {
        serializeAs: 'age',
        castAs: 'age',
        hasGetter: false,
        hasSetter: false,
        nullable: false,
        primary: false,
      },
    })
  })

  test('add columns as getters/setters', (assert) => {
    class User extends BaseModel {
      @column()
      public get username (): string {
        return 'username'
      }

      public set username (_username: string) {
      }
    }

    assert.deepEqual(mapToObj<{ [name: string]: ColumnNode }>(User.$columns), {
      username: {
        serializeAs: 'username',
        castAs: 'username',
        hasGetter: true,
        hasSetter: true,
        nullable: false,
        primary: false,
      },
    })
  })

  test('define custom props for column', (assert) => {
    class User extends BaseModel {
      @column({
        serializeAs: 'userName',
        castAs: 'user_name',
        nullable: true,
      })
      public username: string
    }

    assert.deepEqual(mapToObj<{ [name: string]: ColumnNode }>(User.$columns), {
      username: {
        serializeAs: 'userName',
        castAs: 'user_name',
        hasGetter: false,
        hasSetter: false,
        nullable: true,
        primary: false,
      },
    })
  })

  test('set primary key based on primary value of a column', (assert) => {
    class User extends BaseModel {
      @column({
        primary: true,
      })
      public username: string
    }

    assert.equal(User.$primaryKey, 'username')
    assert.deepEqual(mapToObj<{ [name: string]: ColumnNode }>(User.$columns), {
      username: {
        serializeAs: 'username',
        castAs: 'username',
        hasGetter: false,
        hasSetter: false,
        nullable: false,
        primary: true,
      },
    })
  })
})

test.group('computed', () => {
  test('mark properties as computed properties', (assert) => {
    class User extends BaseModel {
      @computed()
      public fullname: number
    }

    assert.deepEqual(mapToObj<{ [name: string]: ComputedNode }>(User.$computed), {
      fullname: {
        serializeAs: 'fullname',
      },
    })
  })
})

test.group('relations', () => {
  test('mark properties as relations', (assert) => {
    class Profile extends BaseModel {
    }

    class User extends BaseModel {
      @hasOne({ relatedModel: () => Profile })
      public profile: Profile
    }

    const profile = User.$relations.get('profile')!

    assert.equal(User.$relations.size, 1)
    assert.deepEqual(profile.relatedModel(), Profile)
    assert.equal(profile.type, 'hasOne')
    assert.equal(profile.serializeAs, 'profile')
  })

  test('define manyToMany relation', (assert) => {
    class Subject extends BaseModel {
    }

    class User extends BaseModel {
      @manyToMany({ relatedModel: () => Subject })
      public subjects: Subject[]
    }

    const subjects = User.$relations.get('subjects')! as ManyToManyNode

    assert.equal(User.$relations.size, 1)
    assert.deepEqual(subjects.relatedModel(), Subject)
    assert.equal(subjects.type, 'manyToMany')
    assert.equal(subjects.serializeAs, 'subjects')
  })

  test('define hasOneThrough relation', (assert) => {
    class Subject extends BaseModel {
    }

    class User extends BaseModel {
      @manyToMany({ relatedModel: () => Subject })
      public subjects: Subject[]
    }

    const subjects = User.$relations.get('subjects')! as ManyToManyNode

    assert.equal(User.$relations.size, 1)
    assert.deepEqual(subjects.relatedModel(), Subject)
    assert.equal(subjects.type, 'manyToMany')
    assert.equal(subjects.serializeAs, 'subjects')
  })
})
