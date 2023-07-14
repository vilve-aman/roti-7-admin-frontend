'use client';
import React from 'react'
import BaseTemplate from '@/components/BaseTemplate';
import SideCard from '@/components/SideCard';
import { fetchDashboardData } from '@/admin-scripts/api';
import { useState, useEffect } from 'react';

const genCards = (dash, setterfn) => {
    let cards = [
        {
            key: 1,
            title: "On Going",
            value: dash.on_going.active,
            icon: '/package.png',
            color: "bg-slate-200"
        },
        {
            key: 2,
            title: "Avg. Time",
            value: dash.avg_time.active,
            icon: '/stopwatch.png',
            color: "bg-orange-200"
        },
        {
            key: 3,
            title: "Completed",
            value: dash.completed.active,
            icon: '/approved.png',
            color: "bg-purple-200"
        },
        {
            key: 4,
            title: "Active Orders",
            value: dash.deliverying_locations.active,
            icon: '/timeline.png',
            color: "bg-green-200"
        },
    ]

    setterfn(cards)
    
}

const page = () => {
    const [cards, setCards] = useState('loading')

    useEffect(() => {
        fetchDashboardData()
            .then((r) => {genCards(r, setCards)})
            .catch((err) => setCards('error'))
    }, [])




    return (

        <main className="h-full">
            <BaseTemplate
                pageTitle={"Home Page"}
                activeIndex={1}
            >
                <div className=' w-full h-full p-0 m-0 '>
                    <div className='h-1/5 w-full flex items-center pl-12'>
                        <span className='font-[450] text-2xl text-white'>Hi Admin studio,</span>
                    </div>
                    <div className='h-3/4 w-full flex flex-col items-center'>
                        <div className='h-2/3 w-3/4 grid grid-cols-3  gap-4 p-4'>

                            {
                                typeof(cards) == 'string' ?
                                <div>loading</div>
                                :
                                cards.map((c) => {
                                    return (
                                        <SideCard color={c.color} title={c.title} value={c.value} icon={c.icon} key={c.key} />
                                    )
                                })
                            }
                        </div>
                    </div>

                </div>


            </BaseTemplate>


        </main>
    )
}


export default page