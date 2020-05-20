import { getCounterDays, getTrippDuration } from './helper';

describe("Testing counter days", () => {
  test("Testing for today", () => {
    const day = new Date()
    expect(getCounterDays(day)).toBe(0)
  })
  test("Testing for tomorrow", () => {
    const day = new Date(Date.now() + 24 * 60 * 60 * 1000)
    expect(getCounterDays(day)).toBe(1)
  })
  test("Testing for 12 days from today", () => {
    const day = new Date(Date.now() + 12 * 24 * 60 * 60 * 1000)
    expect(getCounterDays(day)).toBe(12)
  })
  test("Testing for 33 days from today", () => {
    const day = new Date(Date.now() + 33 * 24 * 60 * 60 * 1000)
    expect(getCounterDays(day)).toBe(33)
  })
  test("Testing for 380 days from today", () => {
    const day = new Date(Date.now() + 380 * 24 * 60 * 60 * 1000)
    expect(getCounterDays(day)).toBe(380)
  })
  test("Testing for 2 days before today", () => {
    const day = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    expect(getCounterDays(day)).toBe(-2)
  })
})

describe("Testing tripp duration", () => {
    test("Testing for today", () => {
      const start = new Date()
      expect(getTrippDuration(start,start)).toBe(1)
    })
    test("Testing for tomorrow", () => {
      const start = new Date()  
      const end = new Date(Date.now() + 24 * 60 * 60 * 1000)
      expect(getTrippDuration(start,end)).toBe(2)
    })
})