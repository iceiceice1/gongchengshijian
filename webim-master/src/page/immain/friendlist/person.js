import React from 'react'
import {List , Input ,Divider } from 'antd'
import './person.css'
import FriendListItem from './friendlistItem/friendlistItem';
import DetailDialog from './dialog';
import { getFriends, searchFriends } from '../../../webapi/friends/friends';
import InfiniteScroll from 'react-infinite-scroll-component';
import PubSub from 'pubsub-js';

const {Search}=Input
export default class Person extends React.Component{

    constructor(props){
        super(props)
        
        this.token = sessionStorage.getItem("token")
        this.state={
            visible:false,
            token: this.token,
            users: []
        }
        // this.userinfo = JSON.parse(sessionStorage.getItem("userinfo"))
        // console.log(this.token)
        this.getdata(this.token)
    }

    getdata = (token) => {
        getFriends(token).then((res)=>{
            let data = res.data.result.friends
            console.log(data);
            this.setState({
                friends: data,
                detailuser : {
                    username : '',
                    nickName : '',
                    imgUrl : '',
                    _id : 0
                }
            })
        })
    }
    onSearch=(values)=>{
        console.log(this.state.content);
        searchFriends(this.state.content, this.token).then((res)=>{
            let data = res.data.result.friends
            console.log(data);
            this.setState({
                friends: data
            })
        })
    }

    show=()=>{
        // alert('hello')
        this.setState({visible : true})
        console.log(this.state)
    }
    onClose=()=>{
        this.setState({visible : false})
    }
    add = (user) => {
        this.setState({
            detailuser: user
        })
    }
    getchange = (e) => {
        this.setState({
            content : e.target.value
        })
        // if (this.state.content === '' || this.state.content === null) {
        //     this.getdata(this.state.token)
        // }
    }
    sendmsg=(props)=>{
        PubSub.publish('friendsendmsg',props)
    }
    render(){
        return (
            <div>
                <Search allowClear className='searchinput' placeholder="搜索好友" onSearch={this.onSearch} onChange={this.getchange}/>
                <div className='friendlist'>
                    {/* <InfiniteScroll
                        dataLength={1}
                        // next={loadMoreData}
                        // hasMore={data.length < 50}
                        // loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                        // endMessage={<Divider plain className='endmsg'>It is all, nothing more 🤐</Divider>}
                        scrollableTarget="friendlist"
                    > */}
                        <List
                        itemLayout="horizontal"
                        dataSource={this.state.friends}
                        renderItem={item => (
                        <List.Item >
                            <FriendListItem onshow={this.show} user={item} add={this.add} nickName={item.nickName} url={item.avatar}/>
                        </List.Item>
                        )}
                        />         
                    {/* </InfiniteScroll>       */}
                </div>
                <DetailDialog visible={this.state.visible} user={this.state.detailuser} 
                    // username={this.state.detailuser.username}
                    // url={this.state.detailuser.imgUrl} 
                    // nickName={this.state.detailuser.nickName}
                    // _id = {this.state.detailuser.id}
                    onclose={this.onClose} 
                    getdata={this.getdata}
                    send={this.sendmsg}/>
            </div>
        )
    }
}

