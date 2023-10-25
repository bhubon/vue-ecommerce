import { reactive } from "vue";
import { authStore } from './store'
import { cart } from './cart'
const order = reactive({
    orders: [],
    async fetchOrders() {
        let apiUrl = 'http://localhost:8000/api/orders';
        const token = authStore.getUserToken();
        if (!token) {
            console.log('No token found');
            return;
        }


        try {

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify(payload)
            })

            if (!response.ok) {
                throw new error('Network response was not ok')
            }

            const ordersData = await response.json();

            this.orders = ordersData.map(order => ({
                id: order.id,
                userId: order.user_id,
                totalAmount: order.total_amount,
                showProducts: false,
                products: order.products.map(productInfo => ({
                    id: productInfo.id,
                    title: productInfo.title,
                    price: productInfo.price,
                    quantity: productInfo.pivot.quantity,
                    totalPrice: productInfo.pivot.price
                }))
            }));

        } catch (error) {
            throw new ('Something went wrong')
        }
    },
    async placeOrder(totalPrice, items) {
        let apiUrl = 'http://localhost:8000/api/orders';
        const token = authStore.getUserToken();
        if (!token) {
            alert('No token')
            return;
        }

        const productsPayload = Object.values(items).map(item => ({
            product_id: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
        }));

        let payload = {
            total_amount: totalPrice,
            products: productsPayload
        }

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
            if (!response.ok) {
                throw new error('Network response was not ok')
            }
            const data = response.json();
            this.fetchOrders();
            cart.emptyCart();
            console.log(data)
        } catch (error) {
            throw new ('Something went wrong')
        }
    },


});

export { order }