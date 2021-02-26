import { renderHook, act } from "@testing-library/react-hooks";

import { usePasswordValidator } from './use-password-validator';


describe('Password validator', () => {
  it('Simple rule: min: 6, max 10', () => {
    const { result } = renderHook( () => usePasswordValidator({max: 10}) ) 
    expect( result.current[0] ).toBe(false)
    
    act( () => {
      result.current[1]( 'test' )
    })
    expect(result.current[0]).toBe(false)
    act( () => {
      result.current[1]( 'password' )
    })
    expect(result.current[0]).toBe(true)
    act( () => {
      result.current[1]( 'passwordpassword' )
    })
    expect(result.current[0]).toBe(false)
  })
  it('Rule: min: 5, must include lowercase, digit, uppercase, symbols, spaces ', () => {
    const { result } = renderHook( 
      () => usePasswordValidator({
        spaces: true,
        lowercase: true,
        digits: true,
        uppercase: true,
        symbols: true,
        min: 5
      }) 
    ) 
    
    act( () => {
      result.current[1]( '0aA @' )
    })
    expect(result.current[0]).toBe(true)
    act( () => {
      result.current[1]( ' aA @' )
    })
    expect(result.current[0]).toBe(false)
    act( () => {
      result.current[1]( '0AA @' )
    })
    expect(result.current[0]).toBe(false)
    act( () => {
      result.current[1]( '0aa @' )
    })
    expect(result.current[0]).toBe(false)
    act( () => {
      result.current[1]( '0aAa@' )
    })
    expect(result.current[0]).toBe(false)
    act( () => {
      result.current[1]( '0aA a' )
    })
    expect(result.current[0]).toBe(false)
  })
  it('Rule: min: 10, must include multi lowercase, digits, uppercase, symbols, spaces ', () => {
    const { result } = renderHook( 
      () => usePasswordValidator({
        spaces: 2,
        lowercase: 2,
        digits: 2,
        uppercase: 2,
        symbols: 2,
        min: 10
      }) 
    ) 
    
    act( () => {
      result.current[1]( '0aA @0aA @' )
    })
    expect(result.current[0]).toBe(true)
    act( () => {
      result.current[1]( '0aaaAA  @@' )
    })
    expect(result.current[0]).toBe(false)
    act( () => {
      result.current[1]( '00aAAA  @@' )
    })
    expect(result.current[0]).toBe(false)
    act( () => {
      result.current[1]( '00aaaA  @@' )
    })
    expect(result.current[0]).toBe(false)
    act( () => {
      result.current[1]( '00aaAAa @@' )
    })
    expect(result.current[0]).toBe(false)
    act( () => {
      result.current[1]( '00aaAA  a@' )
    })
    expect(result.current[0]).toBe(false)
  })
})
