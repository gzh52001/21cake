import React from 'react';
import {
    Form,
    Select,
    InputNumber,
    Switch,
    Radio,
    Slider,
    Button,
    Upload,
    Rate,
    Checkbox,
    Row,
    Col,
  } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
  
const { Option } = Select;
  

  
const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
};
  
// const Demo = () => {
//     const onFinish = values => {
//       console.log('Received values of form: ', values);
// };

    
function AboutMe(props){
   
    return (
    <div>
        <Form
            name="validate_other"
            onFinish={onFinish}
            initialValues={{
            ['input-number']: 3,
            ['checkbox-group']: ['A', 'B'],
            rate: 3.5,
            }}
        >
            <Form.Item label="Plain Text">
            <span className="ant-form-text">China</span>
            </Form.Item>
            <Form.Item
            name="select"
            label="Select"
            hasFeedback
            rules={[{ required: true, message: 'Please select your country!' }]}
            >
            <Select placeholder="性别">
                <Option value="man">男</Option>
                <Option value="woman">女</Option>
            </Select>
            </Form.Item>
    
            <Form.Item
            name="select-multiple"
            label="Select[multiple]"
            rules={[{ required: true, message: 'Please select your favourite colors!', type: 'array' }]}
            >
            <Select mode="multiple" placeholder="Please select favourite colors">
                <Option value="red">Red</Option>
                <Option value="green">Green</Option>
                <Option value="blue">Blue</Option>
            </Select>
            </Form.Item>
    
            <Form.Item label="InputNumber">
            <Form.Item name="input-number" noStyle>
                <InputNumber min={1} max={10} />
            </Form.Item>
            <span className="ant-form-text"> machines</span>
            </Form.Item>
    
            <Form.Item name="switch" label="Switch" valuePropName="checked">
            <Switch />
            </Form.Item>
    
            <Form.Item name="slider" label="Slider">
            <Slider
                marks={{
                0: 'A',
                20: 'B',
                40: 'C',
                60: 'D',
                80: 'E',
                100: 'F',
                }}
            />
            </Form.Item>
    
            <Form.Item name="radio-group" label="Radio.Group">
            <Radio.Group>
                <Radio value="a">item 1</Radio>
                <Radio value="b">item 2</Radio>
                <Radio value="c">item 3</Radio>
            </Radio.Group>
            </Form.Item>
    
            <Form.Item name="radio-button" label="Radio.Button">
            <Radio.Group>
                <Radio.Button value="a">item 1</Radio.Button>
                <Radio.Button value="b">item 2</Radio.Button>
                <Radio.Button value="c">item 3</Radio.Button>
            </Radio.Group>
            </Form.Item>
    
            <Form.Item name="checkbox-group" label="兴趣爱好">
            <Checkbox.Group>
                <Row>
                <Col span={8}>
                    <Checkbox value="A" style={{ lineHeight: '32px' }}>
                    唱
                    </Checkbox>
                </Col>
                <Col span={8}>
                    <Checkbox value="B" style={{ lineHeight: '32px' }} disabled>
                    敲代码
                    </Checkbox>
                </Col>
                <Col span={8}>
                    <Checkbox value="C" style={{ lineHeight: '32px' }}>
                    跳
                    </Checkbox>
                </Col>
                <Col span={8}>
                    <Checkbox value="D" style={{ lineHeight: '32px' }}>
                    Rap
                    </Checkbox>
                </Col>
                <Col span={8}>
                    <Checkbox value="E" style={{ lineHeight: '32px' }}>
                    打游戏
                    </Checkbox>
                </Col>
                <Col span={8}>
                    <Checkbox value="F" style={{ lineHeight: '32px' }}>
                    谈恋爱
                    </Checkbox>
                </Col>
                </Row>
            </Checkbox.Group>
            </Form.Item>
    
            <Form.Item name="rate" label="Rate">
            <Rate />
            </Form.Item>
    
            <Form.Item
            name="upload"
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="longgggggggggggggggggggggggggggggggggg"
            >
            <Upload name="logo" action="/upload.do" listType="picture">
                <Button>
                <UploadOutlined /> Click to upload
                </Button>
            </Upload>
            </Form.Item>
        </Form>
    </div> 
    );
  }

  
export default AboutMe;