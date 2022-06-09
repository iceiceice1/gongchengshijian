import React from "react";
import {Avatar,Divider} from 'antd'
import { UserOutlined } from '@ant-design/icons';
import './friendlistitem.css'
import Item from "antd/lib/list/Item";

const img="http://139.196.48.129:12345/uploads/avatars/"
class FriendListItem extends React.Component{
    componentDidMount(){
        console.log(this.props.chat)
    }

    onshow=(e)=>{
        this.props.click(this.props.chat.sender)
    }
    
    render(){
        if(this.props.chat.sender.groupnickname){
            if(this.props.chat.content.sender){
                return ( <div className='friendlistItem' onClick={this.onshow}>
                <div style={{display:'inline-block',width:50,height:60,verticalAlign:'top'}} > 
                <Avatar  src={img+this.props.chat.sender.avatar}/>&nbsp;</div>
                
                <div style={{display:'inline-block',width:100,height:60,verticalAlign:'top'}}>
                           <p style={{padding:'0px',margin:'0px'}}> {this.props.chat.sender.groupnickname}</p>
                           <p className="friendchatMsg" style={{fontSize:10}}>
                           {this.props.chat.content.sender.nickname}: {this.props.chat.content.content}
                           </p>
    
                </div>
                </div>)
            }else{
                return ( <div className='friendlistItem' onClick={this.onshow}>
                <div style={{display:'inline-block',width:50,height:60,verticalAlign:'top'}} > 
                <Avatar  src={img+this.props.chat.sender.avatar}/>&nbsp;</div>
                
                <div style={{display:'inline-block',width:100,height:60,verticalAlign:'top'}}>
                           <p style={{padding:'0px',margin:'0px'}}> {this.props.chat.sender.groupnickname}</p>
                           <p className="friendchatMsg" style={{fontSize:10}}>
                               </p>
    
                </div>
                </div>)
            }
                
            
        }
        return (
             <div className='friendlistItem' onClick={this.onshow}>
                 <div style={{display:'inline-block',width:50,height:60,verticalAlign:'top'}} > 
                 <Avatar  src={img+this.props.chat.sender.avatar}/>&nbsp;</div>
                 
                 <div style={{display:'inline-block',width:100,height:60,verticalAlign:'top'}}>
                            <p style={{padding:'0px',margin:'0px'}}> {this.props.chat.sender.nickname}</p>
                            <p className="friendchatMsg" style={{fontSize:10}}> {this.props.chat.content.content}</p>
                 </div>
             </div>
        )
    }
}
export default FriendListItem