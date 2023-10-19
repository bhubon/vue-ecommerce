import { reactive } from 'vue';

import { authStore } from './store';

const wishlist = reactive({
    items: [],
    isWishlisted(product) {
        return this.items.includes(product.id);
    },
    async fetchWishlist() {
        let apiUrl = 'http://localhost:8000/api/wishlist';
        const token = authStore.getUserToken();
        if(!token){
            return;
        }
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new error('Network response was not ok')
            }

            const wishlistData = await response.json();
            this.items = wishlistData.wishlist

        } catch (error) {

        }
    },
    async toggleWishlist(product) {
        let apiUrl = 'http://localhost:8000/api/wishlist';
        let method = 'POST';
        let payload = {
            product_id: product.id
        }
        const token = authStore.getUserToken();

        if(!token){
            return;
        }

        if (!this.isWishlisted(product)) {
            // add item to wishlist
            this.items.push(product.id)
        } else {
            // remove from wishlist
            this.items = this.items.filter(id => id != product.id)
            apiUrl = `http://localhost:8000/api/wishlist/${product.id}`;
            method = 'DELETE';
            payload = {}
        }

        try {
            const response = await fetch(apiUrl, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })

            if (!response.ok) {
                throw new error('Network response was not ok')
            }

            const data = await response.JSON();
            console.log(data)

        } catch (error) {

        }


    },
    getIcon(product) {
        if (this.isWishlisted(product)) {
            return '//img.icons8.com/?size=90&id=59805&format=png';
        } else {
            return '//img.icons8.com/?size=90&id=85038&format=png';
        }
    },
    clearWishlist() {
        this.items = [];
    }
})
export { wishlist }