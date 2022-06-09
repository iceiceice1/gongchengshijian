import React from "react";
import ChatListItem from "./chatlistitem";
import GroupChatListItem from "./groupchatlistitem";
import './chatlog.css'
import Changehi from "./changehi";
import GroupChangehi from "./groupchangehi";
import { Input ,Button,Divider,Popover} from "antd";
import axios from "axios";
import PubSub from 'pubsub-js';
import {Scrollbars} from 'react-custom-scrollbars'
import store from "../../../redux/store";

const {TextArea} =Input


class ChatLog extends React.Component{
  state={
      input:'',
      chatLog:[],
      currentchat:{},
      account:{},
  }
  bottom=React.createRef()
    componentDidMount(){
        let token="Bearer"+" "+localStorage.getItem('token')
        //挂载时根据token从后端获取账号头像、昵称
        axios.get('/api/getAcc',{headers:{Authorization: `${token}`}}).then((res)=>{
             this.setState({account:res.data.result},()=>{
             })
        })

        var varupdate=PubSub.subscribe('chatmsg',(msg,data)=>{
             this.setState({chatLog:[...this.state.chatLog,data]})
         })

         this.setState({chatLog:this.props.chatLog},()=>{
         })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
           console.log('current chat',nextProps)
           return {
               currentchat:nextProps.currentchat,
               chatLog:nextProps.chatLog
           }
    }

    componentDidUpdate(){
        if(this.bottom.current){
            this.bottom.current.scrollIntoView({behavior:"smooth"})
        }
    }

    send=()=>{
       if(this.state.input){
        var senddata={
            _id:this.props.currentchat._id,
            content:this.state.input,
            time:new Date().getTime()
        }
        console.log('senddata',senddata,'currentchat',this.state.currentchat._id)
        let socket=store.getState().socket
        console.log('chat store socket',store.getState())
        this.props.socket.emit('message_friend',senddata,(res)=>{
            let sendres=res.result
            console.log('sendresult',res)
            let sendresult={
                content:sendres.content,
                time:sendres.time,
                _id:sendres._id,
                senderid:this.state.account._id
            }
            let {chatMsg,chatList}=store.getState()
            chatMsg[this.state.currentchat._id].messages.push(sendresult)
            for(let i=0;i<chatList.length;i++){
                if(chatList[i].sender._id==this.state.currentchat._id){
                    console.log(chatList[i])
                    chatList[i].content=sendresult
                }
            }
            store.dispatch({type:'change',
                  data:{
                      "chatMsg":chatMsg,
                      "chatList":chatList,
                        "socket":socket}})

          })
          this.setState({input:''})
    }else{
        alert('please input')
    }
    }
    imgsend=(props)=>{
        let imgcontent="[image]"+props
         var senddata={
             _id:this.props.currentchat._id,
             content:imgcontent,
             time:new Date().getTime()
         }
         console.log('senddata',senddata,'currentchat',this.state.currentchat._id)
         let socket=store.getState().socket
         console.log('chat store socket',store.getState())
         this.props.socket.emit('message_friend',senddata,(res)=>{
             let sendres=res.result
             console.log('sendresult',res)
             let sendresult={
                 content:sendres.content,
                 time:sendres.time,
                 _id:sendres._id,
                 senderid:this.state.account._id
             }
             let {chatMsg,chatList}=store.getState()
             chatMsg[this.state.currentchat._id].messages.push(sendresult)
             for(let i=0;i<chatList.length;i++){
                 if(chatList[i].sender._id==this.state.currentchat._id){
                     console.log(chatList[i])
                     chatList[i].content=sendresult
                 }
             }
             store.dispatch({type:'change',
                   data:{
                       "chatMsg":chatMsg,
                       "chatList":chatList,
                         "socket":socket}})
 
           })
           this.setState({input:''})
     
     }
    groupSend=()=>{
        
        if(this.state.input){
            var senddata={
                _id:this.props.currentchat._id,
                content:this.state.input,
                time:new Date().getTime()
            }
            console.log('senddata',senddata,'currentchat',this.state.currentchat._id)
            let socket=store.getState().socket
            console.log('chat store socket',store.getState())
            this.props.socket.emit('message_group',senddata,(res)=>{
                
                let sendres=res.result
                console.log('sendresult',res)
              })
              this.setState({input:''})
        }else{
            alert('please input')
        }
    }

    imggroupSend=(props)=>{
        let imgcontent="[image]"+props
            var senddata={
                _id:this.props.currentchat._id,
                content:imgcontent,
                time:new Date().getTime()
            }
            console.log('senddata',senddata,'currentchat',this.state.currentchat._id)
            let socket=store.getState().socket
            console.log('chat store socket',store.getState())
            this.props.socket.emit('message_group',senddata,(res)=>{
                
                let sendres=res.result
                console.log('sendresult',res)
              })
              this.setState({input:''})    
    }

    onchange = e => {
        this.setState({input:e.target.value})
      };
      onDelete=()=>{
          let _id=this.state.currentchat._id
          let chatMsg=store.getState().chatMsg
          let chatList=store.getState().chatList
          let socket=store.getState().socket
          let cchatList=chatList.filter((item,index)=>{
              return item.sender._id!=this.state.currentchat._id
          })
          store.dispatch({type:'change',
                  data:{
                      "chatMsg":chatMsg,
                      "chatList":cchatList,
                        "socket":socket}})
           PubSub.publish('delete',this.props.currentchat)
      }
  
    render(){   
        if(this.props.currentchat.groupnickname){
            return (
                (<div>
                    <div className="chatHead">
                        <div className="chatName">
                        {this.props.currentchat.groupnickname}
                        </div>
                       <button className="chatexit" onClick={this.onDelete} >
                           delete
                       </button>
                    </div >
                    <div className="chatMsg" >
                        <Scrollbars>      
                       <ul className='chatMsgList'>
                        {
                             this.state.chatLog.map((item,index)=>{
                                 console.log('chat log',this.state.chatLog)
                             return <GroupChatListItem key={index} chat={item} account={this.state.account} currentchat={this.state.currentchat}/>
                           })
                        }
                       </ul>
                       <div ref={this.bottom} style={{width:50,height:1,backgroundColor:'white'}}>
                       </div>   
                       </Scrollbars>               
                    </div>
                    <TextArea maxLength={140} style={{height:80}} onChange={this.onchange} className="Input" value={this.state.input}/>
                   
                    <div className="sendlan">
                        <span className="sendimg"> 
                           <GroupChangehi imggroupSend={this.imggroupSend.bind(this)}/>
                        </span>
                        <Button type="primary" ghost className="send" onClick={this.groupSend}>send</Button>
                    </div>
               
                </div>
                )
            )
        }else{
            if(this.props.currentchat._id){
                return    (<div>
                    <div className="chatHead">
                        <div className="chatName">
                        {this.props.currentchat.nickname}
                        </div>
                       <button className="chatexit" onClick={this.onDelete}>
                           delete
                       </button>
                    </div >
                    <div className="chatMsg" >
                        <Scrollbars>      
                       <ul className='chatMsgList'>
                        {
                             this.state.chatLog.map((item,index)=>{
                                 console.log('chat log',this.state.chatLog)
                             return <ChatListItem key={index} chat={item} account={this.state.account} currentchat={this.state.currentchat}/>
                           })
                        }
                       </ul>
                       <div ref={this.bottom} style={{width:50,height:1}}>
                       </div>   
                       </Scrollbars>               
                    </div>
                    <TextArea maxLength={140} style={{height:80}} onChange={this.onchange} className="Input" value={this.state.input}/>
                    <div className="sendlan">
                        <span className="sendimg"> 
                        
                        <Changehi imgsend={this.imgsend.bind(this)}/>
                        </span>
                        <Button type="primary" ghost className="send" onClick={this.send}>send</Button>
                    </div>
                </div>
                )
            }
            else {
                return (
                    <div>
                    </div>
                )
            }
        }
       
    
      
    }
}

export default ChatLog