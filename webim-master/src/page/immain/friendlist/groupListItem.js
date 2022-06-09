import React from "react";
import { Avatar } from "antd";
import './groupListItem.css'

const img="http://139.196.48.129:12345/uploads/avatars/"


export default class GroupListItem extends React.Component{


    onClick = () => {
        console.log(this.props.group);
        this.props.setdata(this.props.group)
        this.props.onshow()
    }

    render(){
        const {group} = this.props
        return (
            <div>
                <div  onClick={this.onClick} className="item">
                    <span style={{display:'inline-block',width:50}}> <Avatar src={img+group.avatar}/>&nbsp;</span>
                    
                    <span style={{display:'inline-block',overflow:'hidden'}}>{group.groupnickname}</span>
                </div>
            </div>
        )
    }
}
