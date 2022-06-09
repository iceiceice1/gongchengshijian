import React from 'react'
import { Input, List } from 'antd'
import GroupItem from './groupItem'
import { searchGroup } from '../../../webapi/friends/group'
import GroupDialog from './groupDialog'
import { getuserById } from '../../../webapi/user'

const {Search} = Input
export default class AddGroup extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            groups : [],
            token : sessionStorage.getItem("token"),
            content : "",
            visible : false,
            detailGroup: {
                groupnickname : '',
                owner : '',
                createDay : ''
            }
        }
    }
    
    getdata = ()=> {
        console.log(this.state.content);
        searchGroup(this.state.token, this.state.content, 0).then((res)=>{
            console.log(res);
            this.setState({
                groups : res.data.result
            })
        })
    }
    getchange = (e) => {
        this.setState({
            content : e.target.value
        })
    }
    onSearch = () => {
        this.getdata()
    }
    onshow = () => {
        this.setState({
            visible : true
        })
    }
    onclose = () => {
        this.setState({
            visible : false
        })
    }
    setdata = (group) => {
        this.setState({
            detailGroup : group
        })
        console.log(group.owner._id);
        getuserById(group.owner._id).then((res)=>{
            console.log(res.data);
            if (res.data.result === null) {

            }
            else {
                this.setState({
                    owner : res.data.result.nickname
                })
            }
        })
    }
    render(){
        return (
            <div>
                <Search className='searchinput' allowClear placeholder="搜索群" onSearch={this.onSearch}  onChange={this.getchange}/>
                <div className='searchlist'>
                    <List
                    className='list'
                    // style={{width:200}}
                    itemLayout="horizontal"
                    dataSource={this.state.groups}
                    renderItem={item => (
                    <List.Item >
                        <GroupItem onshow={this.onshow} group={item} setdata={this.setdata}/>
                    </List.Item>
                    )}
                    /> 
                </div>
                <GroupDialog group={this.state.detailGroup} 
                visible={this.state.visible} 
                onclose={this.onclose}
                owner={this.state.owner}></GroupDialog>
            </div>
        )
    }
}