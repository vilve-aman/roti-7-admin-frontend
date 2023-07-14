import React from 'react'
import Image from 'next/image';


function Loading() {
  return (
    <div className='bg-white w-full h-full flex items-center justify-center'>
        <Image src={'/loading.gif'} width={256} height={256} alt={'loading-animation'}/>
    </div>
  )
}

export default Loading