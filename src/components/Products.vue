//create home component
<script setup>
import { ref, reactive, onBeforeMount } from 'vue'
import axios from 'axios'
import { wishlist } from '../store/wishlist';
import { cart } from '../store/cart';
import WishlistIcon from './WishlistIcon.vue';

const products = ref([])

onBeforeMount(() => {
    axios.get('http://localhost:8000/api/products')
        .then(res => {
            products.value = res.data
        })


    wishlist.fetchWishlist();
})
</script>
<template>
    <div class="bg-white">
        <div class="mx-auto">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900">Productsed</h2>

            {{ wishlist.items }}

            <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                <div v-for="product in products" :key="product.id" class="group relative">
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
                    <div class="flex justify-center items-center">
                        <button @click="cart.addToCart(product)" class="bg-blue-500 text-white p-2 rounded mt-2 mr-4">
                            Add To Cart
                        </button>
                        <WishlistIcon :product="product" />
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<style></style>