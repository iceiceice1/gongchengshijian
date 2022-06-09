import { Components } from "antd/lib/date-picker/generatePicker";
import Modal from "antd/lib/modal/Modal";
import React from "react";
import './groupdialog.css'
import { Avatar, Button , Popconfirm} from 'antd';

export default class GroupDialog extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            param: props
        }
    }

    confirm = () => {

    }

    cancel = () => {
        
    }

    sendmsg = () => {
        
    }

    render(){
        const {visible, onclose} = this.props

        return (
            <div>
                <Modal
                    footer = {null}
                    visible = {visible}
                    onOk = {onclose}
                    onCancel = {onclose}
                >
                    <Avatar size={40}/>
                    <p>group name:{}</p>
                    <p>master:{}</p>
                    <p>create time:{}</p>
                    <p>members:{}</p>
                    <div className="btncontainer">
                    <Button className="msgbtn" onClick={this.sendmsg}>
                        发消息
                    </Button>
                    
                    <Popconfirm
                        title = "确认解散群？"
                        onCancel = {this.cancel}
                        onConfirm = {this.confirm}
                        okText = "确认"
                        cancelText = "取消"
                    >
                        <Button type="text" danger className="delbtn">
                            解散群
                        </Button>
                    </Popconfirm>
                    </div>
                </Modal>
            </div>
        )
    }
}