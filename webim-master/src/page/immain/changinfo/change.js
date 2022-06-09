
import { Button,Input,Form,DatePicker} from 'antd';
import './change.css'
import React from 'react';
import Changehi from './changehi';
import axios from 'axios';
import PubSub from 'pubsub-js';

class Change extends React.Component{
    state={
        accountdetail:{
            account:"",
            nickname:"请输入昵称",
            houseplace:"请输入居住地",
            birthday:"请选择出生日期",
        },
        accimgUrl:"",
        account:{

        }
    }
    componentDidMount(){
        //获取个人信息
        let token="Bearer"+" "+localStorage.getItem('token')
       //挂载时根据token从后端获取账号头像、昵称
       axios.get('/api/getAcc',{headers:{Authorization: `${token}`}}).then((res)=>{
            console.log(res.data.result)
            this.setState({account:res.data.result},()=>{
                console.log(this.state.account)
            })
       })
    }

    getImgUrl(imgUrl){
        this.setState({accimgUrl:imgUrl})
        PubSub.publish('changeUrl',imgUrl)
    }
    changeForm=(values)=>{
        let imgUrl=this.state.accimgUrl
        let accInform ={...values,imgUrl}
        console.log(this.state.accimgUrl)
        console.log(accInform)
        //修改个人信息
        let token="Bearer"+" "+localStorage.getItem('token')
        axios.post('/api/changeAccInform',accInform,{headers:{Authorization: `${token}`}})
        .then((res)=>{
            console.log('-----------------------')
              console.log(res.data.result)
              this.setState({account:res.data.result})
              alert('修改成功')
              PubSub.publish('nickname',this.state.account)
        })
    }
    render(){
        return (
            <div>
                <Changehi getImgUrl={this.getImgUrl.bind(this)}/>
            <div>
                <Form id='changeform' className='change'  onFinish={this.changeForm} autoComplete="off"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                >
               
              
               <Form.Item name='username' label='账号' className='changeStyle' >
               <div style={{color:"red"}}>
                   {this.state.account.username}
               </div>
            </Form.Item>

            <Form.Item name='nickname' label='昵称' className='changeStyle' >
                <Input  className='input' placeholder={this.state.account.nickname}/>
            </Form.Item>

            <Form.Item name='houseplace' label='居住地' >
                <Input  className='input' placeholder={this.state.account.houseplace} />
            </Form.Item>
            <Form.Item name='birthday' label='出生日期'>
                 <DatePicker placeholder={this.state.account.birthday}/>
            </Form.Item>
                <Button className='registerbutton' type="primary" htmlType="submit">确认修改</Button>
           </Form>
                </div>
            </div>
        )
    }
}

export default Change