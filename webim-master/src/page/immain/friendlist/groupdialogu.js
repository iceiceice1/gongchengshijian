import { Components } from "antd/lib/date-picker/generatePicker";
import Modal from "antd/lib/modal/Modal";
import React from "react";
import './groupdialog.css'
import { Avatar, Button , Popconfirm} from 'antd';
import { getuserById } from "../../../webapi/user";
import { exitgroup } from "../../../webapi/friends/group";

const img="http://139.196.48.129:12345/uploads/avatars/"

export default class GroupDialogM extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            param: props,
            token : sessionStorage.getItem("token")
        }
    }

    confirm = () => {
        exitgroup(this.state.token, this.props.group._id).then((res)=>{
            console.log(res);
            if (res.data.errMessage != null) {
                alert(res.data.errMessage)
            }
            else {
                alert(res.data.result)
                this.props.getdata()
                this.props.onclose()
            }
        })
    }

    cancel = () => {
        
    }

    sendmsg = () => {
        console.log(1);
        console.log(this.props.group);
        this.props.send(this.props.group)
        this.props.onclose()
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
                    
                    <div className="btncontainer">
                    <Button className="msgbtn" onClick={this.sendmsg}>
                        发消息
                    </Button>
                    
                    <Popconfirm
                        title = "确认退出？"
                        onCancel = {this.cancel}
                        onConfirm = {this.confirm}
                        okText = "确认"
                        cancelText = "取消"
                    >
                        <Button type="text" danger className="delbtn">
                            退出群
                        </Button>
                    </Popconfirm>
                    </div>
                </Modal>
            </div>
        )
    }
}