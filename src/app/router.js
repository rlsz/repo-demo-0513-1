import Vue from 'vue'
import VueRouter from 'vue-router'
import main from './main/router'

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        redirect: '/main'
    },
    main
]

function menuAdapter(menus, path = '') {
    if(!menus || !menus.length) {
        return []
    }
    return menus.reduce((arr, c) => {
        let p = path + c.path
        if(c.path.startsWith('/')) {
            p = c.path
        }
        const title = c.meta?.title
        const p1 = (p + '/').replace(/\/{2,}$/, '/')
        if(title) {
            arr.push({
                path: p,
                text: title,
                children: menuAdapter(c.children, p1)
            })
        } else {
            arr.push(...menuAdapter(c.children, p1))
        }

        return arr
    }, [])
}
export const menus = menuAdapter(routes)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
const originalTitle = document.title
router.afterEach(to => {
    document.title = to.meta && to.meta.title || originalTitle
})

export default router
