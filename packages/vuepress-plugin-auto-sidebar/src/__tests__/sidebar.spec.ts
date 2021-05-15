import { titleReg } from '../utils/sidebar'

describe('sidebar', () => {
  it('title should be ok', () => {
    expect('hello'.match(titleReg)).toBeTruthy()
    expect('hello world'.match(titleReg)).toBeTruthy()
    expect('hello\tworld'.match(titleReg)).toBeTruthy()
    expect('hello-world'.match(titleReg)).toBeTruthy()
    expect('hello_world'.match(titleReg)).toBeTruthy()
    expect('hello.world'.match(titleReg)).toBeTruthy()
  })

  it('title should be false', () => {
    expect('你好'.match(titleReg)).toBeFalsy()
    expect('こんにちは'.match(titleReg)).toBeFalsy()
    expect('안녕하십니까'.match(titleReg)).toBeFalsy()
    expect('hello你好'.match(titleReg)).toBeFalsy()
    expect('hello🔥'.match(titleReg)).toBeFalsy()
  })
})
