import React from 'react'
import { Link,Route } from 'react-router-dom'
import './friend.css'
import { Layout, Menu } from 'antd';
import Person from './person'
import Groupu from './groupu';
import Groupm from './gourpm';
import SubMenu from 'antd/lib/menu/SubMenu';
import PubSub from 'pubsub-js';

const { Content, Sider } = Layout;

class Friend extends React.Component{
    componentDidMount(){
        this.props.history.push('/main/friend/person')
        PubSub.subscribe('friendsendmsg',(msg,data)=>{
            PubSub.publish('chatsendmsg',data)
            this.props.history.push('/main/chat')
        })
    }
    render(){
        return (
            <div>
                <Sider className='sider' width={200}>
                    <div className='friendRoute'>
                        <Menu mode='inline'>
                            <SubMenu title="好友">
                                <Menu.Item>
                                <Link to="/main/friend/person">我的好友</Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu title="群">
                                <Menu.Item>
                                    <Link to="/main/friend/group1" >我加入的群</Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link to="/main/friend/group2" >我管理的群</Link>
                    
                                </Menu.Item>
                            </SubMenu>

                        </Menu>
                    </div>
                </Sider>
                <Layout className='content'>
                    <Content>
                        <div>
                            <Route path="/main/friend/person" component={Person}/>
                            <Route path="/main/friend/group1" component={Groupu}/>
                            <Route path="/main/friend/group2" component={Groupm}/>
                        </div>
                    </Content>
                </Layout>
            </div>
        )
    }
}

export default Friend