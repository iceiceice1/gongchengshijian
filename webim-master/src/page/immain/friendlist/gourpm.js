import React from "react";
import { List , Input } from 'antd'
import GroupListItem from "./groupListItem";
import GroupDialogM from "./groupdialogm";
import { getMyManageGroups } from "../../../webapi/friends/group";
import { getuserById } from "../../../webapi/user";
import PubSub from "pubsub-js";
import './groupm.css'
const {Search} = Input

export default class Groupm extends React.Component{
    constructor(props){
        super(props)
        this.token = sessionStorage.getItem("token")
        this.state={
            visible : false,
            groups : [],
            token : this.token ,
            detailgroup: {},
            owner : ""
        }
        this.getdata()
    }
    getdata = () => {
        getMyManageGroups(this.state.token).then((res)=>{
            console.log(res);
            if (res.data.errCode != null) {
                alert(res.data.errMessage);
            }
            else {
                this.setState({
                    groups: res.data.result[0].managegroups
                })
                console.log(this.state.groups);
            }
        })
    }
    setdata = (group) => {
        this.setState({
            detailgroup : group
        })
        // console.log(1111);
        // console.log(group.owner);
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
                    <GroupDialogM visible={this.state.visible} 
                        onclose={this.close} 
                        group={this.state.detailgroup} 
                        owner={this.state.owner}
                        getdata={this.getdata}
                        send={this.sendmsg}></GroupDialogM>
                </div>
            </div>
        )
    }
}