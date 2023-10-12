import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import About from '../components/About.vue'
import Contact from '../components/Contact.vue'
import Product from '../components/Product.vue'
import Products from '../components/Products.vue'
import Sidebar from '../components/Sidebar.vue'
import Protected from '../components/Protected.vue'
import Login from '../components/Login.vue'
import Cart from '../components/Cart.vue'

import { authStore } from '../store/store'

const routes = [
    {
        path: '/', components: {
            default: Home,
            LeftSideBar: Sidebar
        }
    },
    {
        path: '/login', components: {
            default: Login,
            LeftSideBar: Sidebar
        }
    },
    {
        path: '/about', components: {
            default: About,
            LeftSideBar: Sidebar
        }
    },
    {
        path: '/contact', components: {
            default: Contact,
            LeftSideBar: Sidebar
        }
    },
    {
        path: '/products', components: {
            default: Products,
            LeftSideBar: Sidebar
        }
    },
    {
        path: '/product/:id', components: {
            default: Product,
            LeftSideBar: Sidebar
        },
        name: 'product',
    },
    {
        path: '/cart', components: {
            default: Cart,
            LeftSideBar: Sidebar
        },
        name: 'cart',
    },
    {
        path: '/protected', components: {
            default: Protected,
            LeftSideBar: Sidebar,
        },
        meta: {
            requiresAuth: true
        }
    }
]

// const isAuthenticated = () => {
//     return localStorage.getItem('token')=='123'
// }

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next('/login')
    } else {
        next()
    }
})

export default router
