"use client";

import React, { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { Timeline } from 'antd';
import { Collapse } from 'antd';

import MapPageContent from '@/components/MapPageContent';
import BaseTemplate from '@/components/BaseTemplate';
import { Menu } from 'antd';
import Map from '@/components/Map';

import { AppContext } from '@/context/AppContext';
import LoginRedirect from '@/components/LoginPage';

import { fetchRoutes, } from '@/admin-scripts/api';



const text = (
    <p
        style={{
            paddingLeft: 24,
        }}
    >
        A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
        as a welcome guest in many households across the world.
    </p>
);

const items = [
    {
        key: '1',
        label: 'This is panel header 1',
        children: text,
    },
    {
        key: '2',
        label: 'This is panel header 2',
        children: text,
    },
    {
        key: '3',
        label: 'This is panel header 3',
        children: text,
    },
];


const getDropsList = (_data) => {
    const Para = (props) => {
        return (
            <p>{props.text}</p>
        )
    }
    let list = _data.map((ele,idx)=>{
        return {  key: idx, label: ele.dropoffs[0].split("$")[1], children: <Para text={ele.location+ "         food order detail"}/>,}
    })
    // console.log(list)
    return list
}





const Routelist = (props) => {

    // useEffect(() => {
    //     console.log('propchanged')
    // }, [props.selected])


    return (
        <div className='h-full w-full overflow-y-scroll px-2 cursor-pointer'>
            {props.routesArray.map((e, index) => {

                const bgcolor = props.selected == index + 1 ? "bg-blue-600" : 'bg-slate-50'
                const textcolor = props.selected == index + 1 ? 'text-white' : 'text-black'
                // console.log(bgcolor, textcolor)

                return (
                    <div className={` w-full ${bgcolor} rounded-2xl my-3 `} key={e.key}
                        onClick={() => { props.setselected(index + 1) }}
                    >
                        <div className='w-full h-18 flex justify-between p-4'>

                            <div className='w-1/3 flex p-1'>
                                <p className={`${textcolor} text-lg`}>Route Id : {index + 1}</p>
                            </div>
                            <div className='border-solid border-2 border-green-400 rounded-lg px-2  flex items-center justify-center'>
                                <span className={`${textcolor} `}>Active</span>
                            </div>
                        </div>
                        <div className=' h-1 bg-slate-100 m-2 mx-4 rounded-lg'></div>
                        <div className='h-fit w-full p-4 pl-10'>
                            <Timeline mode='left'
                                className='p-0'
                                items={[
                                    // {
                                    //     children: <span className={`${textcolor} min-h-8`}>Create on : {index + 1}</span>,
                                    // },
                                    {
                                        children: <span className={`${textcolor} min-h-8`}>Total Drops : {e.stops.length}</span>,
                                    },
                                    {
                                        children: <span className={`${textcolor} min-h-8`}>Distance : {e.stops[e.stops.length-1].odometer/1000} Km</span>,
                                    },
                                    {
                                        children: <span className={`${textcolor} min-h-8`}>Expected Time : {e.stops[e.stops.length-1].eta.split("T")[1]}</span>,
                                    },
                                ]}
                            />
                        </div>
                    </div>
                )
            })}
        </div>

    )

}









const MapPageLayout = () => {

    const [selected, setselected] = useState(1)
    const [routes, setroutes] = useState('loading')


    useEffect(() => {
        fetchRoutes()
            .then((r) => setroutes(r))
            .catch((err) => setroutes('error'))
    }, [])


    return (

        <main className="h-full">
            <BaseTemplate
                pageTitle={"Routes And Locations"}
                activeIndex={2}
            >
                <div className='w-full h-full  flex '>
                    <div className='w-2/5 h-full  bg-gradient-to-tr from-slate-400 to-slate-50 p-2 pt-4  flex-column justify-end ' >
                        <div className='text-2xl h-[5%] my-auto mb-2 font-[400] flex items-center justify-center'>List of all Routes</div>
                        <div className='h-[95%] bg-inherit'>
                            {
                                typeof (routes) == 'string' ?
                                    <div>loading</div>
                                    :
                                    <Routelist selected={selected} setselected={setselected} routesArray={routes.routesV2} />
                            }
                        </div>


                    </div>
                    <div className='w-3/5 h-full '>
                        <div className='w-full h-3/5 pl-4 pb-2'>
                            <div className='w-full h-full '>

                                {/* Map will reside here */}
                                {
                                    typeof (routes) == 'string' ?
                                        <div>loading</div>
                                        :
                                        <Map className='w-full h-full ' name={routes.routesV2[selected - 1].rName}
                                            start={routes.start}
                                            routesArray={[routes.routesV2[selected - 1]]}
                                        />
                                }
                            </div>

                        </div>
                        <div className='w-full h-2/5 pl-4 pt-2 '>
                            <div className='w-full h-full bg-slate-100 p-4 overflow-scroll'>
                                {/* Drop details will reside here */}
                                {
                                    typeof (routes) == 'string' ?
                                        <div>loading</div>
                                        :
                                        <>
                                            <div className='text-xl font-[400] mb-4'>Drops in run : {routes.routesV2[selected - 1].rName}</div>
                                            <Collapse items={getDropsList(routes.routesV2[selected - 1].stops)} bordered={true} defaultActiveKey={['0']} />
                                        </>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </BaseTemplate>
        </main>
    )
}



export default MapPageLayout