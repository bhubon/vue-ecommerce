//create home component
<script setup>
import { useRoute } from 'vue-router';
import { ref, reactive, onBeforeMount } from 'vue'
import axios from 'axios'
import { cart } from '../store/cart';

const route = useRoute()
const id = route.params.id
const product = reactive({})
onBeforeMount(() => {
    axios.get(`http://localhost:8000/api/products/${id}`)
        .then(res => {
            product.id = res.data.id
            product.title = res.data.title
            product.image = res.data.image
            product.price = res.data.price
            product.description = res.data.description
        })
})
</script>
<template>
    <div class="bg-white">
        <div class="mx-auto">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900">Productsed</h2>

            <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                <div class="group relative">
                    <div
                        class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <img :src="product.image" :alt="product.imageAlt"
                            class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                    </div>
                    <div class="mt-4 flex justify-between">
                        <div>
                            <h3 class="text-sm text-gray-700">
                                <router-link :to="{ name: 'product', params: { id: product.id } }">
                                    {{ product.title }}
                                </router-link>
                            </h3>
                        </div>
                        <p class="text-sm font-medium text-gray-900">${{ product.price }}</p>
                    </div>
                    <button @click="cart.addToCart(product)" class="bg-blue-500 text-white p-2 rounded mt-2">
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>