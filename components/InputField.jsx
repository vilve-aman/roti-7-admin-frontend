"use client";

import React from 'react'
import { Select } from 'antd';
import { useState } from 'react';
// import jsonp from 'fetch-jsonp';
// import qs from 'qs';



// let timeout;
// let currentValue;
// const fetch = (value, callback) => {
//   if (timeout) {
//     clearTimeout(timeout);
//     timeout = null;
//   }
//   currentValue = value;
//   const fake = () => {
//     const str = qs.stringify({
//       code: 'utf-8',
//       q: value,
//     });
//     jsonp(`https://suggest.taobao.com/sug?${str}`)
//       .then((response) => response.json())
//       .then((d) => {
//         if (currentValue === value) {
//           const { result } = d;
//           const data = result.map((item) => ({
//             value: item[0],
//             text: item[0],
//           }));
//           callback(data);
//         }
//       });
//   };
//   if (value) {
//     timeout = setTimeout(fake, 300);
//   } else {
//     callback([]);
//   }
// };





const InputField = (props) => {
    const [data, setData] = useState([]);
    const [value, setValue] = useState();
    const handleSearch = (newValue) => {
      fetch(newValue, setData);
    };
    const handleChange = (newValue) => {
      setValue(newValue);
    };
    return (
      <Select
        className='w-full h-full'
        showSearch
        value={value}
        placeholder={props.placeholder}
        style={props.style}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
        notFoundContent={null}
        options={(data || []).map((d) => ({
          value: d.value,
          label: d.text,
        }))}
      />
    );
}

export default InputField