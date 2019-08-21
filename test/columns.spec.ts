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
import { column, computed } from '../src/Decorators'
import { ColumnNode, ComputedNode } from '../src/Contracts'

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
