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
        res.data.products.forEach((item,key)=>{
        this.data.products[key] = res.data.products[key];
        this.data.products[key].use = true;
        console.log(this.data.products);
        this.render();

        })       
      }        
    })    
},
render(){
    const Dom = document.querySelector('#productList');
    let template = '';
    this.data.products.forEach((item)=>{
        console.log(item);
       template =  template + `
    <tr>
        <td>${item.title}</td>
        <td>
        <img src="${item.imageUrl}" style=" width:150px; height:100px ">
        </td>
        <td>${item.origin_price}</td>
        <td>${item.price}</td>
        <td>
            <input data-id="${item.id}" class="form-check-input transfer" type="checkbox"   ${ item.use? 'checked' : ''} > 
            <label class="form-check-label" for=" ${item.id} " > ${item.use? '啟用' : '未啟用'} </label>
        </td>
        <td>
            <button type="button" data-id="${item.id}" class="btn btn-sm btn-outline-danger delect" ">  刪除  </button>
        </td>    
    </tr>
    `;
    })
    console.log(template);
    Dom.innerHTML = template;

    const delect = document.querySelectorAll('.delect');
    delect.forEach((item,key)=>{
        console.log(item);
        item.addEventListener('click',this.delete);
    })

    const transfer = document.querySelectorAll('.transfer');
    transfer.forEach((item,key)=>{
        console.log(item);
        item.addEventListener('click',this.transfer);
    })
},
delete(evt){
    console.log(evt);    
    const id = evt.target.dataset.id;
    axios.delete(`${url}/api/${path}/admin/product/${id}`)
    .then((res)=>{
        console.log(res);
        app.getData();
    })
},
transfer(evt){
    const isTrusted = evt.isTrusted;
    const id = evt.target.dataset.id;
    console.log(id);
    axios.put(`${url}/api/${path}/admin/product/${id}`)
     .then((res)=>{
         console.log(res);
     })
    
},
init(){
        //取出token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        //token存到heders
        axios.defaults.headers.common['Authorization'] = token; 
        //console.log(token);
        //檢查是否正確登入
        // axios.post(`${url}/api/user/check`)
        // .then((res)=>{
        //     console.log(res);
        // })
        this.getData();
}
}
app.init();