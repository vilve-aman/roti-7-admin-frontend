"use client";

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Select } from 'antd';
import React, { useState, useContext } from 'react';
import TextArea from 'antd/es/input/TextArea';
const { Header, Sider, Content } = Layout;

import SideCard from '@/components/SideCard';
import InputField from '@/components/InputField';
import { Button, Space } from 'antd';
import HeaderContent from '@/components/HeaderContent';
import MapPageContent from '@/components/MapPageContent';
import NavbarContents from '@/components/NavbarContents';



import { AppContext } from '@/context/AppContext';
// import { RouteContext } from "@/context/routeContext";

import LoginRedirect from '@/components/LoginPage';
import { redirect } from 'next/navigation';
import { useRouter, usePathname } from 'next/navigation';
import useLocalStorage from "use-local-storage";


const BaseTemplate = (props) => {
    // const { routeData, setrouteData } = useContext(RouteContext)

    // console.log({ url: usePathname() })


    const [collapsed, setCollapsed] = useState(false);
    const { appData, setData } = useContext(AppContext);

    if (!appData) {
        redirect('/')
        // return <LoginRedirect/>
    }



    return (
        <div className='w-full h-full absolute base-background'>

            <Layout className="layout h-full">
                <Sider trigger={null} collapsible collapsed={collapsed}
                    className='sider'>
                    <NavbarContents collapsevar={collapsed} collapsefn={setCollapsed} activeIndex={props.activeIndex} brandIcon={collapsed ? "w-16" : "w-20"} />
                </Sider>

                <Layout className="site-layout">
                    <Header className="site-layout-background bg-slate-100">
                        <HeaderContent title={props.pageTitle} />
                    </Header>
                    <Content
                        className="site-layout-background base-background"
                        style={{
                            // margin: '24px 16px',
                            padding: 16,
                        }}
                    >

                        {props.children}

                    </Content>


                </Layout>
            </Layout>
        </div>
    )
}

export default BaseTemplate

