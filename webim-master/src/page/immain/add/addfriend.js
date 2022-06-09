import React from 'react'
import { Link,Route } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import AddGroup from './addgroup';
import SubMenu from 'antd/lib/menu/SubMenu';
import './addfriend.css'
import AddPerson from './addperson';
import CreateGroup from './creategroup';

const { Content, Sider } = Layout;

export default class Add extends React.Component{
    render(){
        return (
            <div>
                <Sider className='sider' width={200}>
                    <div className='friendRoute'>
                        <Menu mode='inline'>
                            <SubMenu title="好友">
                                <Menu.Item>
                                <Link to="/main/addfriend/person">添加好友</Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu title="群">
                                <Menu.Item>
                                    <Link to="/main/addfriend/group" >加入群</Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link to="/main/addfriend/creategroup" >创建群</Link>
                                </Menu.Item>
                            </SubMenu>

                        </Menu>
                    </div>
                </Sider>
                <Layout className='content'>
                    <Content>
                        <div>
                            <Route path="/main/addfriend/person" component={AddPerson}/>
                            <Route path="/main/addfriend/group" component={AddGroup}/>
                            <Route path="/main/addfriend/creategroup" component={CreateGroup}></Route>
                        </div>
                    </Content>
                </Layout>
            </div>
        )
    }
}