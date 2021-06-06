//ES模組
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

const obj = createApp({
    data() {
        return {
            url: 'https://vue3-course-api.hexschool.io',
            path: 'patrickapi',
            products: [],
            isNew: false, //判斷新增或編輯
            tempProduct: {
                imagesurl: [],
            }
        }
    },
    methods: {
        openModal(type, item) {
            if (type == 'new') {
                this.tempProduct = {
                    imagesurl: [],
                };
                // productModal.show();
            }
        },


    },
    mounted() {

    }
}).mount('#app');

