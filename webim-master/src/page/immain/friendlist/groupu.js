import React from "react";
import {Input, List} from 'antd'
import GroupListItem from "./groupListItem";
import { getMyNormalGroups } from "../../../webapi/friends/group";
import GroupDialogU from "./groupdialogu";
import { getuserById } from "../../../webapi/user";
import PubSub from "pubsub-js";
// import './groupu.css'

const {Search} = Input
export default class Groupu extends React.Component{

    constructor(props){
        super(props)
        this.token = sessionStorage.getItem("token")
        this.state={
            visible:false,
            groups:[],
            token: this.token,
            detailgroup: {
                groupnickname : ''
            },
            owner : ''
        }
        this.getData()
    }
    getData = () => {
        getMyNormalGroups(this.state.token).then((res)=>{
            console.log(res.data);
            if (res.data.errCode != null) {
                alert(res.data.errMessage);
            }
            else {
                this.setState({
                    groups: res.data.result[0].normalgroups
                })
            }
        })
    }
    show = () => {
        this.setState({
            visible:true
        })
    }
    close = () => {
        this.setState({
            visible:false
        })
    }
    setdata = (group) => {
        this.setState({
            detailgroup : group
        })
        getuserById(group.owner).then((res)=>{
            console.log(res);
            if (res.data.result === null) {

            }
            else {
                this.setState({
                    owner : res.data.result.nickname
                })
            }
        })
    }
    getchange = (e) => {
        this.setState({
            content : e.target.value
        })
    }
    onSearch = () => {

    }
    sendmsg=(props)=>{
        PubSub.publish('friendsendmsg',props)
    }
    render(){
        
        return (
            <div>
                <Search className="searchInput" placeholder="搜索群" onSearch={this.onSearch} />
                <div className='friendlist'>
                    <List
                    style={{width:100}}
                    itemLayout="horizontal"
                    dataSource={this.state.groups}
                    renderItem={item => (
                    <List.Item >
                            <GroupListItem group={item} onshow={this.show} setdata={this.setdata}></GroupListItem>
                    </List.Item>
                    )}
                    /> 
                    <GroupDialogU visible={this.state.visible} onclose={this.close} 
                        group={this.state.detailgroup} 
                        owner={this.state.owner}
                        getdata={this.getData}
                        send={this.sendmsg}></GroupDialogU>
                </div>
            </div>
        )
    }
}