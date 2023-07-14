"use client";

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

import SideCard from '@/components/SideCard';
import InputField from '@/components/InputField';
import { Button, Space } from 'antd';
import Map from './Map';


import { fetchMapsMetaData, fetchRoutes, generateRoutes } from '@/admin-scripts/api';
import { useEffect } from 'react';
import Loading from './Loading';




const FormFill = (props) => {
    const [input, setInput] = useState('')


    const handleSubmit = () => {
        if (isNaN(input))
            alert("you entered is not a number")
        else if (input >= 20)
            alert("Input very long")
        else{
            props.loadingfn('loading')
            generateRoutes(input)
            .then((r)=> props.loadingfn(r))
            .catch((err)=> console.log(err))            
        }

    }

    return (
        <form className='w-full flex justify-evenly' onSubmit={(e) => { e.preventDefault() }}>

            <div className='w-1/2 h-14 font-[450] text-xl text-white '>
                <span className='mb-4'> Vehicles Bandwidth </span>
                <input type="text"
                    className='map_input'
                    onChange={(event) => setInput(event.target.value)} />
            </div>
            <div className='w-1/4 h-14 pt-2 pb-2 mt-5'>
                <Button type="primary" onClick={() => handleSubmit()}
                    className='w-full h-full bg-blue-500'>
                    Get Maps !!
                </Button>
            </div>
        </form>
    )

}


const MapsMetaCard = () => {
    
    const [Cards, setCards] = useState('loading')
    
    const genCards = (_data)=> {
        // _data.deliverying_locations.active
        // _data.total_locations.count
        let newUsers = (parseInt(_data.total_locations.count) - parseInt(_data.deliverying_locations.active))
        // console.log(newUsers)
        let _c = [
            {
                key: 1,
                title: "Total Users",
                value: _data.total_locations.count,
                icon: '/package.png',
                color: "bg-slate-200"
            },
            {
                key: 2,
                title: "Deliverying",
                value: _data.deliverying_locations.active,
                icon: '/package.png',
                color: "bg-slate-200"
            },
            {
                key: 3,
                title: "New Users",
                value: newUsers,
                icon: '/package.png',
                color: "bg-slate-200"
            }
        ]
        setCards(_c)
    }
    
    useEffect(() => {
        fetchMapsMetaData()
            .then((r) => {  genCards(r)})
            .catch((err) => setCards('error'))
    }, [])



    return (
        <>
            {
                typeof (Cards) == 'string' ?
                    <div>loading</div>
                    :
                    <div className='grid grid-rows-3 gap-2 overflow-scroll'>
                        {/* <SideCard /> */}
                        {
                            Cards.map((c) => {
                                return (
                                    <SideCard title={c.title} value={c.value} icon={c.icon} key={c.key} />
                                )
                            })

                        }
                    </div>
            }
        </>
    )

}

const MapPageContent = () => {
    const [routes, setroutes] = useState('loading')
    // console.log('rendering whole page')

    useEffect(() => {
        fetchRoutes()
            .then((r) => { setroutes(r); })
            .catch((err) => setroutes('error'))
    }, [])




    return (
        <div className=' w-full h-full flex '>
            <div className='h-full w-5/6 pr-4 '>
                <div className='h-5/6 w-full  pb-2'>
                    <div className='w-full h-full bg-slate-700 overflow-hidden'>

                        {
                            typeof (routes) == 'string' ?
                                <Loading/>
                                :
                                <Map
                                    start={routes.start}
                                    routesArray={routes.routesV2}
                                />
                        }
                    </div>
                </div>
                <div className='w-full h-1/6 pt-2'>
                    <div className='w-full h-full bg-slate-50/20'>

                        <div className='flex items-center justify-evenly w-2/3 h-full'>
                            <FormFill loadingfn={setroutes}/>
                        </div>

                    </div>


                </div>

            </div>
            <div className='bg-slate-400 h-full w-1/6  p-2 '>
                <div className='w-full h-fit font-[450] text-xl text-white mb-4' > Stats </div>
                        <MapsMetaCard/>
            </div>

        </div>
    )
}

export default MapPageContent