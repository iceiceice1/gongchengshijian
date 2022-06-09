import React from "react";
import {Avatar} from 'antd'
import { UserOutlined } from '@ant-design/icons';
import './friendlistitem.css'
import Item from "antd/lib/list/Item";
import './groupchatlistitem.css'
const img="http://139.196.48.129:12345/uploads/avatars/"
const image="http://139.196.48.129:12345/uploads/images/"
class GroupChatListItem extends React.Component{
    state={
          chat:{}
    }
    componentDidMount(){
    }
    static getDerivedStateFromProps (props, state) {
        return {
            chat:props.chat
        }
    }
    render(){
         let content=this.props.chat.content
         if(content.substring(0,7)==="[image]"){
            if(this.props.chat.sender){
                if(this.props.chat.sender.username!=this.props.account.username){
                    return (
                      <div style={{textAlign:'left',paddingTop:'10px'}} >
                      <div style={{display:'inline-block',width:50,height:60,verticalAlign:'top'}}> 
                      <Avatar src={img+this.props.chat.sender.avatar} />&nbsp;</div>
               
                      <div style={{display:'inline-block',verticalAlign:'top',color:'red'}} className='chatMsgItem'>
                                {this.props.chat.sender.nickname}
                                <div style={{display:'inline-block',color:'black'}} className='chatMsgItem'>
                                <img src={image+content.substring(7)} className="image" width="100px" height="100px"/>
                                </div>
                      </div>
                      
                      </div>
                    )
                }
                else {
                    return (
                  <div style={{textAlign:'right'}}>                
                  <div className="chatMsgItem" style={{display:'inline-block',verticalAlign:'top',color:'blue'}}>
                      {this.props.account.nickname}
                      <div style={{display:'inline-block',color:'black'}} className='chatMsgItem'>
                      <img src={image+content.substring(7)} className="image" width="100px" height="100px"/>
                                </div>
                  </div>
                  <div style={{display:'inline-block',width:50,height:60,marginRight:'20px',verticalAlign:'top'}}> 
                  <Avatar src={img+this.props.account.avatar} /></div>
                   </div>
                   )
                }
              }else{
                  return (<div></div>)
              }
         }else{
               if(this.props.chat.sender){
                  if(this.props.chat.sender.username!=this.props.account.username){
                      return (
                        <div style={{textAlign:'left',paddingTop:'10px'}} >
                        <div style={{display:'inline-block',width:50,height:60,verticalAlign:'top'}}> 
                        <Avatar src={img+this.props.chat.sender.avatar} />&nbsp;</div>
                 
                        <div style={{display:'inline-block',verticalAlign:'top',color:'red'}} className='chatMsgItem'>
                                  {this.props.chat.sender.nickname}
                                  <div style={{display:'inline-block',color:'black'}} className='chatMsgItem'>
                                        {this.props.chat.content}
                                  </div>
                        </div>
                        
                        </div>
                      )
                  }
                  else {
                      return (
                    <div style={{textAlign:'right'}}>                
                    <div className="chatMsgItem" style={{display:'inline-block',verticalAlign:'top',color:'blue'}}>
                        {this.props.account.nickname}
                        <div style={{display:'inline-block',color:'black'}} className='chatMsgItem'>
                                        {this.props.chat.content}
                                  </div>
                    </div>
                    <div style={{display:'inline-block',width:50,height:60,marginRight:'20px',verticalAlign:'top'}}> 
                    <Avatar src={img+this.props.account.avatar} /></div>
                     </div>
                     )
                  }
                }else{
                    return (<div></div>)
                }
            }
       }
    }
export default GroupChatListItem