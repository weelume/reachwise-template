interface OverflowStyle { overflow: string }

/** 预加载与菜单共享租约，最后一位持有者退出时才恢复原滚动状态。 */
export function createScrollLock(style: OverflowStyle) {
  const owners = new Set<symbol>()
  let original = ''
  return {
    acquire() {
      if (owners.size === 0) original = style.overflow
      const token = Symbol('scroll-lock')
      owners.add(token)
      style.overflow = 'hidden'
      return () => {
        if (!owners.delete(token)) return
        if (owners.size === 0) style.overflow = original
      }
    },
  }
}

let bodyStyle: OverflowStyle | undefined
let controller: ReturnType<typeof createScrollLock> | undefined
export function acquireScrollLock() {
  if (bodyStyle !== document.body.style) {
    bodyStyle = document.body.style
    controller = createScrollLock(bodyStyle)
  }
  return controller!.acquire()
}
