import React from "react";
import {Avatar} from 'antd'
import { UserOutlined } from '@ant-design/icons';
import './friendlistitem.css'
import Item from "antd/lib/list/Item";
import './chatlistitem.css'
const img="http://139.196.48.129:12345/uploads/avatars/"
const image="http://139.196.48.129:12345/uploads/images/"
class ChatListItem extends React.Component{
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
               if(this.props.chat.senderid!=this.props.account._id){
                return (
                    <div style={{textAlign:'left',paddingTop:'10px'}} >
                            <div style={{display:'inline-block',width:50,height:60,verticalAlign:'top'}}> 
                            <Avatar src={img+this.props.currentchat.avatar} />&nbsp;</div>
                     
                            <div style={{display:'inline-block',verticalAlign:'top'}} className='chatMsgItem'>
                            <img src={image+content.substring(7)} className="image" width="100px" height="100px"/>
                            </div>
                    </div>
                )
            
            }else {
                return (
                    <div style={{textAlign:'right'}}>                
                            <div className="chatMsgItemimg" style={{display:'inline-block',verticalAlign:'top'}}>
                            <img src={image+content.substring(7)} className="image" width="100px" height="100px"/>
                            </div>
                            <div style={{display:'inline-block',width:50,height:60,marginRight:'20px',verticalAlign:'top'}}> 
                            <Avatar src={img+this.props.account.avatar} /></div>
                    </div>
                )
            }
        }else{
            if(this.props.chat.senderid!=this.props.account._id){
                return (
                    <div style={{textAlign:'left',paddingTop:'10px'}} >
                            <div style={{display:'inline-block',width:50,height:60,verticalAlign:'top'}}> 
                            <Avatar src={img+this.props.currentchat.avatar} />&nbsp;</div>
                     
                            <div style={{display:'inline-block',verticalAlign:'top'}} className='chatMsgItem'>
                                      {this.props.chat.content}
                            </div>
                    </div>
                )
            
            }else {
                return (
                    <div style={{textAlign:'right'}}>                
                            <div className="chatMsgItem" style={{display:'inline-block',verticalAlign:'top'}}>
                                {this.props.chat.content}
                            </div>
                            <div style={{display:'inline-block',width:50,height:60,marginRight:'20px',verticalAlign:'top'}}> 
                            <Avatar src={img+this.props.account.avatar} /></div>
                    </div>
                )
            }
        }
    }
}
export default ChatListItem