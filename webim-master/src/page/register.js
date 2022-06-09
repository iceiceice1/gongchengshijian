

import React from 'react';
import { Button,Input,Form } from 'antd';
import './Register.css'
import {userRegister} from '../webapi/user'

class Register extends React.Component{
    registerForm=(values)=>{
        var regex= /[0-9a-zA-Z]/
        function isLegal(account){
            let flag=0
            for(var i=0;i<account.length;i++){
                if(!account.charAt(i).match(regex)){
                     flag=1;
                     break;
                }
            }
            return flag
        }
        // console.log(values);
        if (values.registerpassword !== values.rgpswagain) {
            alert("两次密码输入不一致")
        }
        else if(isLegal(values.registerccount)===1){
            alert("account is not legal")
        }else if(isLegal(values.registerpassword)===1){
            alert("password is not legal")
        }
        else{
            let user = {
                username: values.registerccount,
                password: values.registerpassword,
                email: values.registeremail,
                avatar: null
            }
            let res=userRegister(user).then((res)=>{
                console.log(res.data)
                if(res.data.errCode){
                    alert(res.data.errMessage)
                }else{
                    this.props.history.push('/login')
                }
            })
            console.log(res);
            console.log(user);

        }
    }
    

   render(){
    return (
        <div className='webbody'>
        <Form id='registerform' className='Register'  onFinish={this.registerForm} autoComplete="off">
            <div className='headline'> Web IM</div>

            <Form.Item className='account' name='registerccount' label='账号' >
            <Input placeholder='请输入英文或字母' className='input' />
            </Form.Item>

            <Form.Item className='email' name='registeremail' label='邮箱' >
                <Input placeholder='请输入邮箱' className='input' type='email' />
            </Form.Item>

           <Form.Item className='password' name='registerpassword' label='密码'>
             <Input placeholder='请输入英文或字母' className='input' type='password' />
           </Form.Item>

           <Form.Item className='passwordagain' name='rgpswagain' label='确认密码' >
              <Input placeholder='请再次输入密码' className='input' type='password' />
           </Form.Item>
                <Button className='registerbutton' type="primary" htmlType="submit">注册</Button>
        </Form>
        </div>
    )
   }
}

export default Register;