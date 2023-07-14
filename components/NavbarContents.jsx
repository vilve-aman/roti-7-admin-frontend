import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Select } from 'antd';




const navItems = [
    {
        key: '1',
        icon: <UserOutlined />,
        label: (
            <Link href="/" >
                Home
            </Link>
        ),
    },
    {
        key: '2',
        icon: <VideoCameraOutlined />,
        label: (
            <Link href="/drops" >
                Routes And Locations
            </Link>
        ),
    },
    {
        key: '3',
        icon: <UploadOutlined />,
        label: (
            <Link href="/maps" >
                Generate Maps
            </Link>

        ),
    },
    {
        key: '4',
        icon: <UploadOutlined />,
        label: (
            <Link href="/tracking" >
                Tracking
            </Link>

        ),
    },
]



const NavbarContents = (props) => {
    // console.log(props)
    return (
        <>
            <div className='h-2/3'>
                <div className='flex items-center justify-center'>
                <div className={`logo ${props.brandIcon}  `} >
                    <Image src={'/sandwich.png'} width={256} height={256} alt='brandIcoon' priority={false}/>
                </div>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[`${props.activeIndex}`]}

                    items={navItems}
                >
                </Menu>

            </div>
            <div className='h-1/6 bg-slate-500 flex items-center justify-center'>
                {React.createElement(props.collapsevar ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: () => props.collapsefn(!props.collapsevar),
                })}
            </div>
        </>
    )
}

export default NavbarContents