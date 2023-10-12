import { ref, reactive } from 'vue'

import router from '../router/router';

import {cart} from './cart'

const authStore = reactive({
    isAuthenticated: localStorage.getItem('auth') == 1,
    user: JSON.parse(localStorage.getItem('user')),

    authenticate(email, password) {

        fetch('http://localhost:8000/api/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            }
        ).then(res => res.json())
            .then(res => {
                if (res.error == 0) {
                    authStore.isAuthenticated = true;
                    authStore.user = res;
                    localStorage.setItem('auth', 1)
                    localStorage.setItem('user', JSON.stringify(res))
                    router.push('/protected')
                }
            })

        authStore.isAuthenticated = true
    },
    logout() {
        localStorage.setItem('auth', 0)
        localStorage.setItem('user', null)
        authStore.isAuthenticated = false
        authStore.user.value = {}
        cart.items = {}
        cart.totalPrice = 0;
        cart.saveCartInLocalStorage()
        router.push('/login')
    }
})

export { authStore }