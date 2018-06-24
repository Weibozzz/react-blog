import React from 'react';
import {Spin} from 'antd';
import './index.css'
const Loading = (props)=> (
  <div className="loading-wrapper" style={{ display: !props.data.length? 'flex' : 'none'}}>
    <div className="spin-wrapper">
      <Spin size="large"/>
    </div>
  </div>
)
export default Loading