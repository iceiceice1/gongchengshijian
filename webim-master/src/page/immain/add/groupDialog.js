import React from "react";
import { Avatar , Modal } from "antd";

const img="http://139.196.48.129:12345/uploads/avatars/"

export default class GroupDialog extends React.Component{
    
    constructor(props){
        super(props);
        
        this.state = {
            param: props,
        }
    }


    render(){
        const {visible, onclose, group} = this.props

        return (
            <div>
                <Modal
                    footer = {null}
                    visible = {visible}
                    onOk = {onclose}
                    onCancel = {onclose}
                >
                    <Avatar size={40} src={img+group.avatar}/>
                    <p>group name : {group.groupnickname}</p>
                    <p>master : {this.props.owner}</p>
                    <p>create time : {group.createday}</p>
                 
                    
                </Modal>
            </div>
        )
    }

}