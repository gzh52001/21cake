import React from 'react';
import { Breadcrumb,Input  } from 'antd';
import { HomeOutlined, UserOutlined,AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

const suffix = (
    <AudioOutlined 
        style={{
            fontSize:16,
            color:'#1890ff'
        }}
    />
);

const style ={
    padding:'8px'
}

function MemberMange(){
    return (
        <div className="mainInfo">
            <div className="BreadClass">
                <Breadcrumb>
                    <Breadcrumb.Item href="">
                    <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="">
                    <UserOutlined />
                    <span>MenberMange</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                </Breadcrumb>
                <div style={style}></div>
            </div>
            <div className="FromClass">
                <Search placeholder="查询" onSearch={value => console.log(value)} enterButton />
            </div>
        </div>
    )
}

export default MemberMange;