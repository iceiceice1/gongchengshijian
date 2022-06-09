import Modal from "antd/lib/modal/Modal";
import React from "react";
import './dialog.css'
import { Avatar, Button , Popconfirm} from 'antd';
import { deleteFriend } from "../../../webapi/friends/friends";
import PubSub from "pubsub-js";

const img="http://139.196.48.129:12345/uploads/avatars/"


export default class DetailDialog extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            param: props
        }
    }

    confirm = () => {
        const token = sessionStorage.getItem("token")
        deleteFriend(token, this.props.user._id).then((res)=>{
            console.log(1);
            console.log(res);
            this.props.onclose()
            this.props.getdata(token)
        }).catch((err)=>{
            console.log(2);
            console.log(err);
        })
    }

    cancel = () => {

    }

    sendmsg = () => {
        console.log('hello',this.props)
        this.props.send(this.props.user)
        this.props.onclose()
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
                    
                    <div className="btncontainer">
                    <Button className="msgbtn" onClick={this.sendmsg}>
                        发消息
                    </Button>
                    
                    <Popconfirm
                        title = "确认删除好友？"
                        onCancel = {this.cancel}
                        onConfirm = {this.confirm}
                        okText = "确认"
                        cancelText = "取消"
                    >
                        <Button type="text" danger className="delbtn">
                            删除好友
                        </Button>
                    </Popconfirm>
                    </div>
                </Modal>
            </div>
        )
    }
}