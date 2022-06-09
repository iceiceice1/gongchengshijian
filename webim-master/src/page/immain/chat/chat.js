import React from 'react'
import FriendListItem from './friendlistItem';
import './chat.css'
import axios from 'axios';
import ChatLog from './chatlog';
import PubSub, { publish } from 'pubsub-js';
import { io } from 'socket.io-client';
import { message } from 'antd';
import store from '../../../redux/store';

const img="http://139.196.48.129:12345/uploads/avatars/"

class Chat extends React.Component{
    state={
        currentchat:{
        },
       
        chatList:[
            
        ],//单聊时保存发送者信息和最新消息content，群聊时保存群聊信息、最新消息和最新消息发送者
        chatMsg:{},//所有消息按对{sender/group;message}，单聊为sender信息群聊为group信息
                   //message单聊时包括发送者id、发送的消息，群聊时包括发送者信息、发送的消息
        chatLog:[],
    }
   
    componentDidMount(){
        let token="Bearer"+" "+localStorage.getItem('token')
        if(store.getState().chatList){
            console.log('store-state',store.getState())
            this.setState({chatList:store.getState().chatList},()=>{
                console.log('store-get',this.state.chatList)
            })
            this.setState({chatMsg:store.getState().chatMsg},()=>{
                console.log('store-get',this.state.chatMsg)
            })
        }
        else{
        
        }

        store.subscribe(()=>{
            console.log('store change',store.getState())
            this.setState({chatList:store.getState().chatList})
            this.setState({chatMsg:store.getState().chatMsg})
        })
        
        //存储发送的信息
        PubSub.subscribe('sendmsg',(msg,data)=>{
            console.log('chat send chat',data)
            let chatMsg=this.state.chatMsg
            chatMsg[data.currentchat._id].messages.push(data.message)
            this.setState({chatMsg:chatMsg},()=>{
                console.log('chat test msg',this.state.chatMsg)
            })
            let chatList=this.state.chatList
            for(let i=0;i<chatList.length;i++){
                if(chatList[i].sender._id==this.state.currentchat._id){
                    console.log(chatList[i])
                    chatList[i].content=data.message
                }
            }
            this.setState({chatList:chatList})
            let socket=store.socket
            console.log('chatlog store socket',socket)
            store.dispatch({type:'change',
                  data:{
                      "chatMsg":chatMsg,
                      "chatList":chatList,
                       "socket":socket}})
        })   
        PubSub.subscribe('chatsendmsg',(msg,data)=>{
            console.log(data)
            this.setState({currentchat:data})
            let chatMsg=store.getState().chatMsg
            let chatList=store.getState().chatList
            let socket=store.getState().socket
            let id=`${data._id}`
            console.log('chatsendmsg',id in chatMsg)
              if(id in chatMsg){
                  console.log('chatsendmsg',chatMsg[`${id}`])
                  this.setState({chatLog:chatMsg[`${id}`].messages})
              }
              else{
                  chatMsg[`${id}`]={
                      "sender":data,
                       "messages":[
                       ]
                  }
                  chatList=[{"sender":data,
                            "content":{}},...chatList]
                  console.log('friend chat group',chatList)
                            
                            store.dispatch({type:'change',
                            data:{
                                "chatMsg":chatMsg,
                                "chatList":chatList,
                                 "socket":socket}})
                                
                   }
              
            })
            PubSub.subscribe('delete',(msg,data)=>{
                console.log(data)
                this.setState({currentchat:{}})
            })
    }

    click(props){
    //点击更换聊天对象,chatLog对应更换
        this.setState({currentchat:props},()=>{
            console.log('currentchat',this.state.currentchat)
            let id=this.state.currentchat._id
            this.setState({chatLog:this.state.chatMsg[id].messages},()=>{
            })
            let token="Bearer"+" "+localStorage.getItem('token')
            let _id=this.state.currentchat._id
            if(this.state.currentchat.groupnickname){
                axios.put('/api/messagesReadFromGroup',{_id:this.state.currentchat._id},{headers:{Authorization: `${token}`}})
                .then((res)=>{
                    console.log(res)
               })
            }
           axios.put('/api/messagesReadFrom',{_id:this.state.currentchat._id},{headers:{Authorization: `${token}`}})
            .then((res)=>{
             console.log(res)
            })

        })
    }
    
    render(){
       
        return (
            <div>
                <ul className='chatPerson'>
                    {
                        this.state.chatList.map((item,index)=>{
                            return <FriendListItem chat={item} click={this.click.bind(this)}/>
                        })
                    }
                </ul>
                <div className='chatLog'>
                       <ChatLog currentchat={this.state.currentchat} chatLog={this.state.chatLog} socket={store.getState().socket} />
                </div>
            </div>
        )
    }
    
     componentWillUnmount = () => {
        this.setState = (state,callback)=>{
          return;
          };
        }
}

export default Chat