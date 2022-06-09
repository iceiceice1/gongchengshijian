import React from 'react';
import './main.css'
import { Avatar } from 'antd';
import {CommentOutlined,UserOutlined,ExportOutlined,AuditOutlined,UserAddOutlined,UsergroupAddOutlined } from '@ant-design/icons'
import { Route,Link } from 'react-router-dom';
import Chat from './chat/chat';
import Change from './changinfo/change';
import Friend from './friendlist/friend';
import Msg from './msg/msg';
import axios from 'axios';
import PubSub from 'pubsub-js';
import Add from './add/addfriend';
import store from '../../redux/store';

const socket=require('socket.io-client')('http://139.196.48.129:12345')
const img="http://139.196.48.129:12345/uploads/avatars/"

class Main extends React.Component{
   state={
       account:{
       },
       imgUrl:'',
       chatList:[
            
       ],//单聊时保存发送者信息和最新消息content，群聊时保存群聊信息、最新消息和最新消息发送者
        chatMsg:{},//所有消息按对{sender/group;message}，单聊为sender信息群聊为group信息
               //message单聊时包括发送者id、发送的消息，群聊时包括发送者信息、发送的消息
   }
   
   componentDidMount(){
      let token="Bearer"+" "+localStorage.getItem('token')
       //挂载时根据token从后端获取账号头像、昵称
       axios.get('/api/getAcc',{headers:{Authorization: `${token}`}}).then((res)=>{
            console.log(res)
            this.setState({account:res.data.result},()=>{
            })
       })

       var changeimgUrl=PubSub.subscribe('changeUrl',(msg,data)=>{
           this.setState({
               imgUrl:'http://'+data
           })
       })
       var changenickname=PubSub.subscribe('nickname',(msg,data)=>{
           console.log(data)
           this.setState({account:data})
       })

       socket.on('connect',(res)=>{})
       socket.emit('authorization',localStorage.getItem('token'),(res)=>{console.log(res)})
       socket.on('unread',(res)=>{
        console.log('socket message',res.result)
        let result=res.result.friend
        //保存所有聊天信息
        let chatMsg=result
        for(let Object in chatMsg){
            let messages=chatMsg[Object].messages
            let messagesres=[]
            let n=messages.length
            for(let i=0;i<messages.length;i++){
                messagesres[i]={...messages[n-1-i],senderid:chatMsg[Object].sender._id}
            }
            chatMsg[Object].messages=messagesres
        }

        //处理未读消息列表chatMsg得到会话列表
        let chatList=[]
        for(let Object in result){
          //目前为单聊信息处理（拉取的未读消息为单聊）
          let item=result[Object]
          let n=item.messages.length
            chatList.push({
                sender:item.sender,
                content:item.messages[n-1]//显示最新消息
            })
        }
       store.dispatch({type:'change',
       data:{
           "chatMsg":chatMsg,
           "chatList":chatList,
           "socket":socket}})

           let groupres=res.result.group
           let groupChatMsg={}
           console.log('socket rec groupres',groupres)
           for(let Object in groupres){
            //目前为单聊信息处理（拉取的未读消息为单聊）
            let item=groupChatMsg[Object]
            console.log('-----------------',item)
            groupChatMsg[Object]={
                "sender":groupres[Object].group,
                 "messages":groupres[Object].messages.reverse()
            }
          }
          console.log('socket rec groupchatMsg',groupChatMsg)
     
           let groupChatList=[]
           for(let Object in groupChatMsg){
            //目前为单聊信息处理（拉取的未读消息为单聊）
            let item=groupChatMsg[Object]
            console.log('----',item.messages)
            let n=item.messages.length
              groupChatList.push({
                  sender:item.sender,
                  content:item.messages[n-1]//显示最新消息
              }) 
              console.log('---------',groupChatList)
          }
          store.dispatch({type:'change',
          data:{
              "chatMsg":{...chatMsg,...groupChatMsg},
              "chatList":[...chatList,...groupChatList],
              "socket":socket}})
       }
       )
       
       socket.on('message_friend',(res)=>{
          console.log('chat socket rec',res)
           let result=res
           let recdata={
               "content":result.content,
                "time":result.time,
                "_id":result._id,
                "senderid":result.sender._id
            }
            let chatMsg=store.getState().chatMsg
            let chatList=store.getState().chatList
            let id=`${result.sender._id}`
              console.log('chat socket rec--------',id in chatMsg)
              if(id in chatMsg){
                  chatMsg[`${id}`].messages.push(recdata)
                  for(let i=0;i<chatList.length;i++){
                      if(chatList[i].sender._id==recdata.senderid){
                          chatList[i].content=recdata
                      }
                  }
                  store.dispatch({type:'change',
                  data:{
                      "chatMsg":chatMsg,
                      "chatList":chatList,
                       "socket":socket}})
              }
              else{
                  chatMsg[`${id}`]={
                      "sender":res.sender,
                       "messages":[
                           recdata
                       ]
                  }
                  chatList=[{"sender":res.sender,
                            "content":recdata},...chatList]
                            store.dispatch({type:'change',
                            data:{
                                "chatMsg":chatMsg,
                                "chatList":chatList,
                                 "socket":socket}})
              }
        })
        socket.on('message_group',(res)=>{
            console.log('chat socket rec',res)
             let result=res
             
             let recdata={
                 "content":result.content,
                  "time":result.time,
                  "_id":result._id,
                  "senderid":result.group._id,
                   "sender":result.sender
              }
              let chatMsg=store.getState().chatMsg
              let chatList=store.getState().chatList
              let id=`${result.group._id}`
                console.log('chat socket rec--------',id in chatMsg)
                if(id in chatMsg){
                    chatMsg[`${id}`].messages.push(recdata)
                    console.log('socket rec main',chatMsg)
                    for(let i=0;i<chatList.length;i++){

                        if(chatList[i].sender._id==recdata.senderid){
                            chatList[i].content=recdata
                        }
                    }
                    console.log('socket rec main',chatList)
                    store.dispatch({type:'change',
                    data:{
                        "chatMsg":chatMsg,
                        "chatList":chatList,
                         "socket":socket}})
                } else{
                    chatMsg[`${id}`]={
                        "sender":res.group,
                         "messages":[
                             recdata
                         ]
                    }
                    chatList=[{"sender":res.group,
                              "content":recdata},...chatList]
                              store.dispatch({type:'change',
                              data:{
                                  "chatMsg":chatMsg,
                                  "chatList":chatList,
                                   "socket":socket}})
                }                
          })
   
    setTimeout(()=>{
        this.props.history.push('/main/chat')
    },1)
   
   }
   exit(){
      
    window.localStorage.removeItem('token')
       this.props.history.push('/login')
   }
   render(){
    return (
        <div className='main'>
            <ul className='mainlist'>
                <li>
                    <div onClick={this.exit.bind(this)}>
                    <ExportOutlined style={{fontSize:30}}/>exit
                    </div>
                
                </li>
                <li>
                <Link to='/main/chat'><CommentOutlined style={{fontSize:30}}/>chat</Link>
                </li>
                <li>
                <Link to='/main/friend/person'><UserOutlined style={{fontSize:30}}/>friend</Link>
                </li>
                <li>
                <Link to='/main/change'>
                    <AuditOutlined style={{fontSize:30}}/>change</Link>
                </li>
                <li>
                    <Link to='/main/Addfriend'>
                    <UserAddOutlined style={{fontSize:30}}/>Add</Link>
                </li>
               
            </ul>
            <div className='header'>
                <div className='accounthi'>
                <Avatar size={40} src={(this.state.imgUrl)?(this.state.imgUrl):(img+this.state.account.avatar)} />
                </div>
                <div className='nickName'>
                    {this.state.account.nickname?(this.state.account.nickname):(this.state.account.username)}
                </div>
            </div>
            <div className='mainbody'>
               <Route path="/main/chat" component={Chat}/>
               <Route path="/main/friend" component={Friend}/>
               <Route path="/main/change" component={Change} />
               <Route path="/main/Addfriend" component={Add} />
               <Route path="/main/AddGroup" component={Msg} />
            </div>
        </div>
    )
   }
}

export default Main;

