import React from 'react';
import { Breadcrumb  } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';


function GoodsMange(){
    return (
        <div>
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item href="">
                    <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="">
                    <UserOutlined />
                    <span>GoodsMange</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>商品管理</Breadcrumb.Item>
                </Breadcrumb>
            </div>
        </div>
    )
    
}

export default GoodsMange;