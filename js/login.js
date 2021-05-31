const usernameinput = document.querySelector('#userid');
const passwordinput = document.querySelector('#passwordid');
const url = 'https://vue3-course-api.hexschool.io';
const path = 'patrickapi';
const loginButton = document.querySelector('#loginbutton');
loginButton.addEventListener('click',login); 

function login(){    
    const username = usernameinput.value;
    const password = passwordinput.value;
    const data = {  username, password  };
    console.log(data);

    axios.post(`${url}/admin/signin`, data)
    .then((res) => {
    console.log(res);
    if(res.data.success){
        const {token,expired} = res.data;
        console.log(token,expired);
        document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
        window.location = "ProductList.html";
      }
      else{
         alert('帳號或密碼錯誤');
      }    
     })
    .catch(()=>{
    alert('連線失敗');
     })  
} 