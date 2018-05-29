const mount = require('@vue/test-utils').mount
const MonthDays = require('./MonthDays.vue').default

describe('is render', () => {
  test('日期正确渲染', () => {

    for(let i = 1, len = 12;i < len;i++){
      const month = `2018/${i}`
      const instance = mount(MonthDays, {
        propsData: {
          month: month
        }
      })
      const days = new Date(2018, i, 0).getDate()
      const pan = new Date(`2018/${i}/1`).getDay()
      expect(instance.findAll('.has-date').length).toBe(days)
      expect(instance.findAll('.days>span').length).toBe(days+pan)
    }
  })

})


describe('it can emit', () => {
  test('能够emit', () => {
    const handler = jest.fn()
    const instance = mount(MonthDays,{
      propsData: {
        month: '2018/05'
      },
      mocks: {
        $emit: handler
      }
    })
    instance.findAll('.days span').at(20).trigger('click')
    expect(handler).toBeCalled()
  })
})
