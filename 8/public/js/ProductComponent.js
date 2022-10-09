Vue.component('products', {
    data() {
        return {
            catalogUrl: '/products.json',
            filtered: [],
            products: [],
            imgProduct: 'https://placehold.it/200x150',
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    template: `
    <div class="products">
        <product v-for="item of filtered" 
        :key="item.id_product" 
        :img="item.img"
        :product="item"
        ></product>
    </div>
    `
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `
    <div class="featured-item">
        <div class="add-hover-div">
            <a class="add-hover-div__cart forAddToCart" href="#" :data-img="img" 
            :data-name="product.product_name" :data-price="product.price" @click.prevent="$parent.$parent.$refs.cart.addProduct(product)">
            <img class="forAddToCart" src="/assets/img/cart_white.png" alt="cart">Add to Cart
            </a>
        </div>
        <img :src="img" alt="picture">
        <a href="#">{{product.product_name}}</a>
        <div class="price-stars">
            <h3>$ {{ product.price }}</h3>
            <div class="product-stars">
                <img src="/assets/img/starYellow.png" alt="star">
                <img src="/assets/img/starYellow.png" alt="star">
                <img src="/assets/img/starYellow.png" alt="star">
                <img src="/assets/img/starYellow.png" alt="star">
                <img src="/assets/img/starYellow.png" alt="star">
            </div>
        </div>
    </div>
    `

})