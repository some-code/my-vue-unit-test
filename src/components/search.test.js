const mount = require('@vue/test-utils').mount
const createLocalVue = require('@vue/test-utils').createLocalVue
const Search = require('./Search.vue').default

// 行覆盖率（line coverage）：是否每一行都执行了？
// 函数覆盖率（function coverage）：是否每个函数都调用了？
// 分支覆盖率（branch coverage）：是否每个if代码块都执行了？
// 语句覆盖率（statement coverage）：是否每个语句都执行了？

describe('is render', () => {
  test('正确渲染', () => {
    const instance = mount(Search)
    expect(instance.findAll('.page-search').length).toBe(1)
  })
})

describe('is clean', () => {
  test('能够清空', () => {
    const instance = mount(Search, {
      mocks: {
        data() {
          return {inputValue: '12345'}
        }
      }
    })
    instance.find('.search-next').trigger('click')
    expect(instance.vm.$data.inputValue).toBe('')
  })
})

describe('it can emit', () => {
  test('能够emit', () => {
    const handler = jest.fn()
    const instance = mount(Search,{
      mocks: {
        $emit: handler
      }
    })
    instance.find('.search-input').trigger('submit')
    expect(handler).toBeCalled()
  })
})
