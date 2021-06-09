import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
let alertdom = null;
const object = createApp({
    data() {
        return {
            url: 'https://vue3-course-api.hexschool.io',
            path: 'patrickapi',
            data: {
                username: '',  //用v-model 把dom元素雙向綁定到這裡
                password: '',
            },
            alertInfo: ''
        }
    },
    methods: {
        login() {
            axios.post(`${this.url}/admin/signin`, this.data)
                .then((res) => {
                    console.log(res);
                    if (res.data.success) {
                        const { token, expired } = res.data;
                        //取出token
                        document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;

                        alert('6/9版本');
                        window.location = 'VueProduct.html';
                    }
                    else {
                        this.alertInfo = '帳號或密碼錯誤';
                        this.openalert();
                    }
                })
                .catch((err) => {
                    this.alertInfo = '連線失敗';
                    this.openalert();
                })
        },
        openalert() {
            alertdom.show();
            setTimeout(() => { alertdom.hide() }, 1200);
        }
    },
    mounted() {
        alertdom = new bootstrap.Modal(document.querySelector('#alert'));
    }
}).mount('#app');



