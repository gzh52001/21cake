import React from 'react';
import { Breadcrumb,Input,Select,Button } from 'antd';
import { HomeOutlined, UserOutlined,AudioOutlined  } from '@ant-design/icons';


const { Option } = Select;
const { Search } = Input;
// 搜索框
const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
);

// 下拉框
function handleChange(value) {
    console.log(`selected ${value}`);
}
const style={
    padding:'8px'
}
function GoodsMange(){
    return (
        <div className="mainInfo">
            <div className="BreadClass">
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
                <div style={style}></div>
            </div>
            <div className="FromClass">
                <div className="HeaderInfo" style={{float: "right"}}>
                {/* 搜索框 */}
                <Search placeholder="查询" onSearch={value => console.log(value)} enterButton style={{ width:200,marginLeft:10 }} />
                {/* 下拉式 */}
                <Select defaultValue="lucy" style={{ width: 120,marginLeft:10}} onChange={handleChange}>
                    <Option value="jack">删除</Option>
                    <Option value="lucy">上架</Option>
                    <Option value="Yiminghe">清空</Option>
                </Select>
                {/* 添加功能 */}
                <Button type="primary" style={{marginLeft:10}} onClick={() =>{
                    
                }}>添加商品</Button>
                
                </div>
            </div>
        </div>
    )
    
}

export default GoodsMange;