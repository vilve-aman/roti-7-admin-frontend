import React from 'react'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import Image from 'next/image';

const SideCard = (props) => {
  // let bgcolor = `bg-[${}]` || `bg-[${'#3f8600'}]`
  let bgcolor = props.color
  return (
    // <Card bordered={props.border || false}
    // className={`${bgcolor} text-lg font-[500]`}
    // >
    //   <Statistic
    //     title={props.title || "Active"}
    //     value={props.value || 11.28 }
    //     precision={2}
    //     valueStyle={{ color: '#3f8600' }}
    //     prefix={props.icon || <ArrowUpOutlined />}
    //     suffix=""
    //   />
    // </Card>


    <Card bordered={props.border || false}
      className={`${bgcolor} text-2xl font-[600] `}
    >
      <div className='h-full w-full flex'>
        <div className='w-1/2 h-full ' >
          <Statistic
            title={props.title || "Active Users"}
            value={props.value || 11.28}
            valueStyle={{ fontSize: '2rem' }} />
        </div>
        <div className='w-1/2 h-full  flex justify-center item-center'>

          <Image src={props.icon} height={125} width={125} />
        </div>
      </div>
    </Card>

  )
}

export default SideCard