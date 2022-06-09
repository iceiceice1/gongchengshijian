import React from "react";
import { Button , Avatar } from "antd";
import { joingroup } from "../../../webapi/friends/group";

const img="http://139.196.48.129:12345/uploads/avatars/"

export default class GroupItem extends React.Component{


    constructor(props){
        super(props)
        
        this.token = sessionStorage.getItem("token")
        this.state = {
            visible : false,
            token: this.token
        }
    }

    add = () => {
        console.log(this.props.group._id);
        joingroup(this.state.token, this.props.group._id).then((res)=>{
            console.log(res);
            if (res.data.Message != null) {
                alert(res.data.Message)
            }
            else{
                alert(res.data.result)
            }
            
        })
    }
    onClick = () => {
        this.props.onshow()
        this.props.setdata(this.props.group)
    }

    render(){
        
        return (
             <div  onClick={this.onClick} className="item">
                 <span  className="span1"><Avatar size={40} src={img+this.props.group.avatar} />&nbsp;</span>
                 
                 <span >{this.props.group.groupnickname}</span>

                 <Button className="btn" onClick={this.add}>添加群</Button>
                
             </div>
        )
    }
}