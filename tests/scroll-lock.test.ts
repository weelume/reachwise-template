import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createScrollLock } from '../src/features/site-templates/catalog/reachwise/motion/scrollLock.ts'

test('preloader finishes before menu: background stays locked until menu closes', () => {
 const style={overflow:''}, lock=createScrollLock(style), preloader=lock.acquire(), menu=lock.acquire()
 preloader(); assert.equal(style.overflow,'hidden')
 menu(); assert.equal(style.overflow,'')
})
test('menu closes before preloader: preloader still owns the lock', () => {
 const style={overflow:'auto'}, lock=createScrollLock(style), preloader=lock.acquire(), menu=lock.acquire()
 menu(); assert.equal(style.overflow,'hidden')
 preloader(); assert.equal(style.overflow,'auto')
})
test('repeated cleanup cannot unlock another active owner', () => {
 const style={overflow:''}, lock=createScrollLock(style), first=lock.acquire(), second=lock.acquire()
 first(); first(); assert.equal(style.overflow,'hidden')
 second(); assert.equal(style.overflow,'')
})
test('an existing lock is restored and a later independent session takes a fresh baseline', () => {
 const style={overflow:'hidden'}, lock=createScrollLock(style), first=lock.acquire()
 first(); assert.equal(style.overflow,'hidden')
 style.overflow='scroll'; const second=lock.acquire(); second(); assert.equal(style.overflow,'scroll')
})
