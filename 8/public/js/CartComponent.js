Vue.component('cart', {
    data() {
        return {
            cartUrl: '/userCart.json',
            cartItems: [],
            imgCart: 'https://placehold.it/50x100',
            showCart: false,
            totalSum: 0,
            totalQty: 0
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    this.$data.cartItems.push(item);
                }
                this.getTotalSum();
            });
    },
    methods: {
        addProduct(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++
                        }
                        this.totalSum += find.price;
                        this.totalQty += 1;
                    })
            } else {
                const prod = Object.assign({ quantity: 1 }, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                            this.totalSum += prod.price;
                            this.totalQty += 1;
                        }
                    })
            }
            this.getTotalSum();
        },
        getTotalSum() {
            this.totalQty = 0;
            this.totalSum = 0;
            this.cartItems.forEach(el => {
                this.totalSum += el.price * el.quantity;
                this.totalQty += el.quantity;
            });
        },
        remove(item) {
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            console.log(`/api/cart/${item.id_product}`);
                            this.$parent.putJson(`/api/cart/${item.id_product}`, { quantity: -1 });
                            item.quantity--;
                        } else {
                            this.$parent.delJson(`/api/cart/${item.id_product}/${item.product_name}`, item);
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                        this.getTotalSum();
                    }
                })
        },
    },
    template: `
    <div class="cartWrapper">
        <a href="#" class="header__cart" @click.prevent="showCart = !showCart">
            <img src="/assets/img/cart.png" alt="cart">
            <div class="cart-quantity">{{ totalQty }}</div>
        </a>
        <a href="#" class="button-pink header__account-bar">
            My Account <i class="fas fa-caret-down my-account-caret"></i>
        </a>
        <div class="basket" v-show="showCart">
            <i class="fas fa-angle-up basket__border-up"></i>
            <div class="basket-list">
                <cart-item v-for="item of cartItems" :key="item.id_product" :img="item.img" :cart-item="item" @remove="remove">
                </cart-item>
            </div>
            <div class="basket_total">
                <div>total</div>
                <div class="basket_total_push">$ {{ totalSum }}</div>
            </div>
            <div class="basket__checkout">checkout</div>
            <div class="basket__cart">go to cart</div>
        </div>
    </div>
    `
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
    <div class="basket__item">
        <img :src=cartItem.img alt="picture">
        <div class="basket__item-info">
            <h4>{{ cartItem.product_name }}</h4>
            <div class="product-stars" style="display: flex;">
                <img src="/assets/img/starYellow.png" alt="star">
                <img src="/assets/img/starYellow.png" alt="star">
                <img src="/assets/img/starYellow.png" alt="star">
                <img src="/assets/img/starYellow.png" alt="star">
                <img src="/assets/img/starYellow.png" alt="star">
            </div>
            <div class="basket__quantity-block">
                <span class="spanQty">{{ cartItem.quantity }}</span> x <span>$ {{ cartItem.price }}</span>
            </div>
        </div>
        <a href="#" class="basket__item-delete" @click.prevent="$emit('remove', cartItem)">
            <i class="fas fa-times-circle forDeleteEvent" :data-name=cartItem.product_name></i>
        </a>
    </div>
    `
})