//ES模組
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
let productModal = '';
let delProductModal = '';
let alertdom = '';

const obj = createApp({
    data() {
        return {
            apiurl: 'https://vue3-course-api.hexschool.io/api',
            apipath: 'patrickapi',
            products: [],
            isnew: false,
            tempProduct: {
                imagesUrl: [],
            },
            alertInfo: ''
        }
    },



    methods: {
        openModal(type, item) {
            //--------------新增
            if (type == 'new') {
                this.tempProduct = {
                    imagesUrl: [],
                };
                console.log(this.tempProduct);
                this.isnew = true;
                productModal.show();

            }
            //--------------編輯
            else if (type == 'edit') {
                this.tempProduct = { ...item }; //複製
                console.log(this.tempProduct);
                this.isnew = false;
                productModal.show();
            }
            //--------------刪除
            else if (type == 'delete') {
                this.tempProduct = { ...item };
                delProductModal.show();
            }
        },
        delProduct() {
            const url = `${this.apiurl}/${this.apipath}/admin/product/${this.tempProduct.id}`;

            axios.delete(url).then((response) => {
                if (response.data.success) {
                    alert(response.data.message);
                    delProductModal.hide();
                    this.getData();
                } else {
                    this.alertInfo = response.data.message;
                    openalert();
                }
            });
        },
        getData(page = 1) {
            const url = `${this.apiurl}/${this.apipath}/admin/products?page=${page}`;
            axios.get(url)
                .then((res) => {
                    console.log(res)
                    if (res.data.success) {
                        this.products = res.data.products;
                    }
                    else {
                        this.alertInfo = '你的url或者path錯誤';
                        this.openalert();
                    }
                })
                .catch((erro) => { })
        },
        openalert() {
            alertdom.show();
            setTimeout(() => { alertdom.hide() }, 2000);
            setTimeout(() => { window.location = 'login.html'; }, 2500);
        },
        createimages() {
            this.tempProduct.imagesUrl = [];
            this.tempProduct.imagesUrl.push('');
        },
        confirm() {
            //新增
            let url = `${this.apiUrl}/${this.apiPath}/admin/product`;
            let http = 'post';

            //編輯
            if (!this.isnew) {
                url = `${this.apiUrl}/${this.apiPath}/admin/product/${this.tempProduct.id}`;
                http = 'put'
            }

            axios[http](url, { data: this.tempProduct })
                .then((response) => {
                    if (response.data.success) {
                        alert(response.data.message);
                        productModal.hide();
                        this.getData();
                    } else {
                        alert(response.data.message);
                    }
                })
                .catch(() => { })
        }
    },
    mounted() {
        productModal = new bootstrap.Modal(document.querySelector('#productModal'));
        delProductModal = new bootstrap.Modal(document.querySelector('#delProductModal'));
        alertdom = new bootstrap.Modal(document.querySelector('#alert'));

        //取token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        console.log(token);
        if (token == '') {
            this.alertInfo = '您尚未登入請重新登入。';
            alertdom.show();
            setTimeout(() => { alertdom.hide() }, 2000);
            setTimeout(() => { window.location = 'login.html'; }, 2500);
        }
        axios.defaults.headers.common.Authorization = token;
        this.getData();
    }
}).mount('#app');

