import React from 'react'
import { Input , List } from 'antd'
import './addperson.css'
import PersonItem from './personItem'
import { searchAll } from '../../../webapi/friends/friends'
import PersonDialog from './personDialog'

const {Search} = Input

export default class AddPerson extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            visible : false,
            token: '',
            detailuser : {
                account : '',
                nickname : '',
                imgUrl : ''
            }
        }
        this.token = sessionStorage.getItem("token");
        this.state = {
            token: this.token
        }
    }

    getdata = (content) => {
        searchAll(content, this.state.token).then((res)=>{
            console.log(res.data.result.users);
            this.setState({
                users : res.data.result.users
            })
        })
    }
    
    add = (user) => {
        this.setState({
            detailuser: user
        })
    }
    onSearch = () => {
        
        console.log(this.state.content);
        if (this.state.content == null || this.state.content === "") {
            this.setState({
                users : []
            })
            alert("搜索信息不为空");
        }
        else {
            this.getdata(this.state.content)
        }
    }
    onclose = () => {
        this.setState({
            visible : false
        })
    }
    onshow = () => {
        this.setState({
            visible : true
        })
    }
    getchange = (e) => {
        this.setState({
            content : e.target.value
        })
        if (this.state.content === '' || this.state.content === null) {
            this.getdata()
        }
    }

    render(){
        return (
            <div>
                <Search className='searchinput' allowClear placeholder="搜索好友" onSearch={this.onSearch}  onChange={this.getchange}/>
                <div className='searchlist'>
                    <List
                    className='list'
                    // style={{width:200}}
                    itemLayout="horizontal"
                    dataSource={this.state.users}
                    renderItem={item => (
                    <List.Item >
                        <PersonItem onshow={this.onshow} user={item} add={this.add}/>
                    </List.Item>
                    )}
                    /> 
                </div>
                <PersonDialog visible={this.state.visible} onclose={this.onclose} user={this.state.detailuser}></PersonDialog>
            </div>
        )
    }
}