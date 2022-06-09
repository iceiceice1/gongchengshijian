import React from "react";
import {Avatar} from 'antd'

const img="http://139.196.48.129:12345/uploads/avatars/"

class FriendListItem extends React.Component{

    
    constructor(props){
        super(props)
        this.state = {
            visible : true
        }
    }

    onClick=()=>{
        console.log(this.props.user);
        console.log(this.props.user.nickname);
        this.props.onshow()
        this.setState({
            visible : !this.state.visible
        })
        this.props.add(this.props.user)
    }

    render(){
        
        return (
             <div  onClick={this.onClick} className="item">
                 <span style={{display:'inline-block',width:50}}><Avatar size={40} src={img+this.props.url} />&nbsp;</span>
                 
                 <span style={{display:'inline-block',overflow:'hidden'}}>{this.props.user.nickname}</span>
             </div>
        )
    }
}
export default FriendListItem