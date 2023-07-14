import React, { useState, useContext } from 'react'
import { AppContext } from '@/context/AppContext';

import Image from 'next/image'
import { Button, Drawer } from 'antd';

const HeaderContent = (props) => {
    const { appData, setData } = useContext(AppContext);
    // console.log(appData)
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    return (
        <div className=' w-full h-full flex justify-between '>
            <div className='text-black text-2xl m-3 font-[600]'>{props.title}</div>
            <div className='bg-yellow-300 w-10 h-10 rounded-full m-3 cursor-pointer'
                onClick={() => { showDrawer() }}
            >
                <Image src={'/avatar.png'} width={256} height={256} alt='avatar' />
            </div>

            <Drawer
                title="Dashboard"
                placement="right"
                onClose={() => {
                    setOpen(false)
                }}
                open={open}>
                <div className=' w-full h-full flex flex-col items-center px-4'>
                    <div className='w-48 h-48 m-4 bg-slate-400 rounded-full'>
                        <Image src={'/avatar.png'} width={256} height={256} alt='avatar' />
                    </div>
                    <div className='w-full h-1/5 m-4  flex flex-col items-center'>
                        <div className='text-black font-[700] text-lg mb-1'>NAME</div>
                        <div className='text-black font-[400] text-lg mb-1'>{appData.email}</div>
                        <div className='text-black font-[500] text-sm mb-1'> ROLE : ADMIN</div>
                        <Button type="primary" key="console"
                            className='mt-4 bg-blue-500'
                            onClick={()=>{setData(null)}}>
                            Log-Out
                        </Button>,
                    </div>

                </div>

            </Drawer>

        </div>
    )
}

export default HeaderContent