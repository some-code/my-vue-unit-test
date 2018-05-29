const mount = require('@vue/test-utils').mount
const shallowMount = require('@vue/test-utils').shallowMount
const Header = require('./Header.vue').default

describe('is render title', () => {
  test('title正确渲染', () => {
    const instance = mount(Header, {
      propsData: {
        title: '首页'
      }
    })
    expect(instance.html()).toContain('<span class="page-header--title">首页</span>')
  })
})

describe('is render slot', () => {
  test('slot正确渲染', () => {
    const instance = mount(Header, {
      slots: {
        title: '<div class="aaa">首页</div>'
      }
    })
    expect(instance.html()).toContain('<div class="page-header--middle flex flex-align-center"><!----> <div class="aaa">首页</div></div>')
  })
})

describe('is render right', () => {
  test('right正确渲染', () => {
    const instance = mount(Header, {
      slots: {
        right: '<div class="aaa">right</div>'
      }
    })
    expect(instance.html()).toContain('<div class="page-header--right flex"><div class="aaa">right</div></div>')
  })
})

describe('is route', () => {

  test('能够跳转', () => {
    const handler = jest.fn()
    const instance = shallowMount(Header, {
      mocks: {
        $router: {
          go: handler
        },
      },
    })

    instance.find('.page-header--left').trigger('click');
    expect(handler).toBeCalled()
  })

  test('能够自定义跳转', () => {
    const handler = jest.fn()
    const instance = shallowMount(Header, {
      propsData: {
        back: 'back',
      },
      mocks: {
        $emit: handler,
      },
    })

    instance.find('.page-header--left').trigger('click');
    expect(handler).toBeCalled()
  })

  test('阻断跳转', () => {
    const handler = jest.fn(function(hideArrow){
      if(hideArrow) return false
    })
    const instance = shallowMount(Header, {
      propsData: {
        hideArrow: false
      },
      mocks: {
        goback: handler
      }
    })

    instance.setData({
      hideArrow: true
    })

    instance.find('.page-header--left').trigger('click');
    expect(handler(instance.vm.hideArrow)).toBe(false)
  })

})
