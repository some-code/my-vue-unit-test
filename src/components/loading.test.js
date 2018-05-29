const mount = require('@vue/test-utils').mount
const Loading = require('./Loading.vue').default

describe('is render', () => {
  test('content正确渲染', () => {
    const instance = mount(Loading, {
      propsData: {
        content: '加载中'
      }
    })
    expect(instance.html()).toContain('加载中')
  })

  test('slot正确渲染', () => {
    const instance = mount(Loading, {
      slots: {
        default: '<div class="aaa">加载中</div>'
      }
    })
    expect(instance.html()).toContain('<div class="aaa">加载中</div>')
  })
})

describe('is close', () => {
  test('dialog正确关闭', () => {
    const instance = mount(Loading)
    instance.find('.dialog-close').trigger('click')
    expect(instance.html()).toBe(undefined)
  })
})
