const url = 'https://vue3-course-api.hexschool.io';
const path = 'patrickapi';
const app = {
data:{
        products:[],
},
    getData(){
    //取得商品列表    
    axios.get(`${url}/api/${path}/admin/products`)   
    .then((res)=>{
        console.log(res);
        if(res.data.success){
        this.data.products = res.data.products;
        this.data.products.use = true; 
        // this.data.products[key].use = true;
        // console.log(this.data.products);
        this.render();
        }       
    })      
},
render(){
    const Dom = document.querySelector('#productList');
    let template = '';
    this.data.products.forEach((item)=>{
     console.log(item);
    //    template =  template + `
    // <tr>
    //     <td>${item.title}</td>
    //     <td>
    //     <img src="${item.imageUrl}" style=" width:150px; height:100px ">
    //     </td>
    //     <td>${item.origin_price}</td>
    //     <td>${item.price}</td>
    //     <td>
    //         <input data-id="${item.id}" class="form-check-input transfer" type="checkbox" 
    //           ${ item.use? 'checked' : ''} > 
    //         <label class="form-check-label" for=" ${item.id} " > ${item.use? '啟用' : '未啟用'} </label>
    //     </td>
    //     <td>
    //         <button type="button" data-id="${item.id}" class="btn btn-sm btn-outline-danger delect" ">  刪除  </button>
    //     </td>    
    // </tr>
    // `;
        const template = this.data.products.map( (item) =>
        `<tr>
            <td>${item.title}</td>
            <td> <img src="${item.imageUrl}" style=" width:150px; height:100px "> </td>
            <td>${item.origin_price}</td>
            <td>${item.price}</td>            
            <td> 
            <input data-id="${item.id}" class="form-check-input transfer" type="checkbox" 
            ${ item.use? 'checked' : ''} >  
            <label class="form-check-label" for=" ${item.id} " > ${item.use? '啟用' : '未啟用'} </label>
            </td>
            <td>
            <button type="button" data-id="${item.id}" class="btn btn-sm btn-outline-danger delect" ">  刪除  </button> 
            </td>
        </tr>
        `).join('');
        console.log(template);
        Dom.innerHTML = template;
    })    

    const delect = document.querySelectorAll('.delect');
    delect.forEach((item)=>{
        console.log(item);
        item.addEventListener('click',this.delete);
    })

    const transfer = document.querySelectorAll('.transfer');
    transfer.forEach((item)=>{
        console.log(item);
        item.addEventListener('click',this.transfer);
    })

    const count = document.querySelector('#productCount');
    count.textContent = app.data.products.length;
},
delete(evt){
    console.log(evt);    
    const id = evt.target.dataset.id;
    axios.delete(`${url}/api/${path}/admin/product/${id}`)
    .then((res)=>{
        console.log(res);
        app.getData();
    })
    app.render();
},
transfer(evt){
    const isTrusted = evt.isTrusted;
    const id = evt.target.dataset.id;
    //app.getData();  
    app.data.products.forEach((item)=>{
        if(item.id==id){
           item.use = !item.use; 
        }
     })
    console.log(this.data)
    app.render();    
},
init(){
        //取出token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        //token存到heders
        axios.defaults.headers.common['Authorization'] = token; 
        //console.log(token);
        //檢查用戶是否持續登入
        // axios.post(`${url}/api/user/check`)
        // .then((res)=>{
        //     console.log(res);
        // })
        this.getData();
}
}
app.init();