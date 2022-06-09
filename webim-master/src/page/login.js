import React from 'react';
import { Button, Input, Form} from 'antd';
import './Login.css'
import { userLogin } from '../webapi/user';
import {getAllUser} from '../webapi/user' 
// import Password from 'antd/lib/input/Password';

class Login extends React.Component{
   
    loginform = React.createRef();

    onFinish=(values)=>{
        // console.log(values);
        let user = {
            account: values.loginaccount,
            password: values.loginpassword,
            loginType: "0"
        }
        let account=values.loginaccount;
        if((account!=null)&&(account.indexOf('@')>0)){
          user = {  
            account: values.loginaccount,
            password: values.loginpassword,           
            loginType: "1"
           }
        }
        console.log(user);
        console.log(1);
        // this.props.history.push('/main')
        console.log(userLogin(user).then((res)=>{
            console.log(123);          
            console.log(res.data)
            if(res.data.errCode){
                alert(res.data.errMessage)
            }else{
                localStorage.setItem('token',res.data.token)
                let token=localStorage.getItem('token')
                console.log(token);
                sessionStorage.setItem("useraccount", res.data.result.username)
                sessionStorage.setItem("token", res.data.token)
                this.props.history.push('/main')
            }
            
        }));
    }

   register=()=>{
        // console.log(getAllUser());
       this.props.history.push('/register')
   }

   render(){
    return (
        <div className='webbody'>
        <Form id='loginform' className='Login' ref={this.loginform}  onFinish={this.onFinish} autoComplete="off">
            <div className='headline'> Web IM</div>
            <Form.Item className='account' name='loginaccount' label='账号'>
            <Input placeholder='请输入账号或邮箱' className='accinput'/>
            </Form.Item>
           <Form.Item className='password' name='loginpassword' label='密码:' >
             <Input  placeholder='请输入密码' type='password' className='pwdinput' />
           </Form.Item>
                <Button className='button' type="primary" htmlType="submit">登录</Button>
                <Button onClick={this.register} className='button' type="primary">注册</Button>
        </Form>
        </div>
    )
   }
}

export default Login;