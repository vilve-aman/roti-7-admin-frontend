import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Select } from 'antd';
import React, { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
const { Header, Sider, Content } = Layout;

import SideCard from './SideCard';
import InputField from './InputField';
import { Button, Space } from 'antd';


const navItems = [
    {
        key: '1',
        icon: <UserOutlined />,
        label: 'Home',
    },
    {
        key: '2',
        icon: <VideoCameraOutlined />,
        label: 'Locations & Routes',
    },
    {
        key: '3',
        icon: <UploadOutlined />,
        label: 'Generate Maps',
    },
    {
        key: '4',
        icon: <UploadOutlined />,
        label: 'Tracking',
    },
]

export default function HomeLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout className="layout h-full">
            <Sider trigger={null} collapsible collapsed={collapsed}
                className='sider'>
                <div className='h-2/3'>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={navItems}
                    />
                </div>
                <div className='h-1/6 bg-slate-500 flex items-center justify-center'>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </div>
            </Sider>

            <Layout className="site-layout">
                <Header
                    className="site-layout-background p-0">
                    <div className='bg-slate-300 w-full h-full pl-8 pr-16 pt-2 flex justify-between '>
                        <div>Page HEADING</div>
                        <div className='bg-yellow-300 w-12 h-12 rounded-full'></div>
                    </div>
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                    }}
                >
                    <div className='bg-slate-400 w-full h-full flex '>
                        <div className='h-full w-full pr-4 '>
                            <div className='h-5/6 w-full bg-slate-700'>
                                Map
                            </div>
                            <div className='w-full h-1/6 bg-yellow-400 '>
                                <div className='flex items-center justify-evenly w-2/3 h-full'>

                                    <div className='w-1/2 h-14'>
                                        Vehicles Bandwidth
                                        <InputField placeholder="Input Numbers . . " />
                                    </div>
                                    <div className='w-1/4 h-14 pt-2 pb-2'>
                                        <Button type="primary" loading={false} onClick={() => enterLoading(0)}
                                        className='w-full h-full bg-slate-600'>
                                            Get Maps !!
                                        </Button>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className='bg-green-500 h-full w-1/6 flex flex-col justify-evenly p-1'>
                            <SideCard />
                            <SideCard />
                            <SideCard />
                        </div>

                    </div>

                </Content>
            </Layout>

        </Layout>
    )
}