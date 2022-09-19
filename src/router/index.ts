import router from './router'
import NProgress from '@/config/nprogress'

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
