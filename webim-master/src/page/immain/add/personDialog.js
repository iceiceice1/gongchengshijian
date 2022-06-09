import React from "react";
import { Avatar , Modal } from "antd";

const img="http://139.196.48.129:12345/uploads/avatars/"

export default class PersonDialog extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            param: props
        }
    }

    render(){
        const {visible, onclose, user} = this.props
        if (user == null) {
            return (
                <div></div>
            )
        }
        return (
            <div>
                <Modal
                    footer = {null}
                    visible = {visible}
                    onOk = {onclose}
                    onCancel = {onclose}
                >
                    <Avatar size={40} src={img+user.avatar} />
                    <p>account : {user.username}</p>
                    <p>nickName : {user.nickname}</p>
                </Modal>
            </div>
        )
    }
}