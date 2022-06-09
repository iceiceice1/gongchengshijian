import React from "react";
import { Input , Form , Button} from "antd";
import { createGroup } from "../../../webapi/friends/group";

export default class CreateGroup extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            token: sessionStorage.getItem("token")
        }
    }

    changeForm = (values) => {
        console.log(values);
        createGroup(this.state.token, values.nickname).then((res)=>{
            console.log(res);
            if (res.data.errMessage != null) {
                alert(res.data.errMessage)
            }
            else{
                alert(res.data.result)
            }
        })
    }

    render(){
        return (
            <div>
            <Form id='changeform' className='change'  onFinish={this.changeForm} autoComplete="off"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            >
                <Form.Item name='nickname' label='群名' className='changeStyle' >
                    <Input  className='input' placeholder={""}/>
                </Form.Item>

                <Button className='registerbutton' type="primary" htmlType="submit">确认创建</Button>
           </Form>
            </div>
        )
    }
}