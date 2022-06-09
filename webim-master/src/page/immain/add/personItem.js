import React from "react";
import { Avatar, Button } from "antd";
import './personItem.css'
import { addfriend } from "../../../webapi/friends/friends";

const img="http://139.196.48.129:12345/uploads/avatars/"

export default class PersonItem extends React.Component{

    constructor(props){
        super(props)
        
        this.token = sessionStorage.getItem("token")
        this.state = {
            visible : false,
            token: this.token
        }
    }

    add = () => {
        addfriend(this.state.token, this.props.user._id).then((res)=>{
            console.log(res.data);
            if (res.data.errMessage != null) {
                alert(res.data.errMessage)
            }
            else{
                alert(res.data.result)
            }
        })
    }

    onClick = () => {
        this.props.onshow()
        this.props.add(this.props.user)
    }
    render(){
        
        return (
             <div  onClick={this.onClick} className="item">
                 <span  className="span1"><Avatar size={40} src={img+this.props.user.avatar}/>&nbsp;</span>
                 
                 <span >{this.props.user.nickname}</span>

                 <Button className="btn" onClick={this.add}>添加好友</Button>
                
             </div>
        )
    }
}