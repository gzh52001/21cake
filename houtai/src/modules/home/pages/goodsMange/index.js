import React,{ useState} from 'react';
import { Breadcrumb,Input,Select,Button,Modal,Form,Radio,DatePicker,Table,Tag,Space } from 'antd';
import { HomeOutlined, UserOutlined  } from '@ant-design/icons';


const { Option } = Select;
const { Search } = Input;


// 下拉框
function handleChange(value) {
    console.log(`selected ${value}`);
}
// 样式
const style={
    padding:'8px'
}

// 点击弹窗
const CollectionCreateForm = ({ visible, onCreate, onCancel }) =>{
    const [form] = Form.useForm();
    return(
        <Modal
            visible={visible}
            title="添加商品"
            okText="添加"
            canceText="退出"
            onCancel={onCancel}
            onOk={() =>{
                form 
                  .validateFields()
                  .then(values =>{
                      form.resetFields();
                      onCreate(values);
                  })
                  .catch(info =>{
                      console.log('Validate Faled:',info);
                  });
            }}
        >
            <Form
                form = {form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier:'加冰',
                }}
            >
            <Form.Item
                name="title"
                label="不知道"
                rules={[
                    {
                        required:true,
                        message:'请填写内容',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item name="description" label="选填">
                <Input type="textarea" />
            </Form.Item>
            <Form.Item name="modifier" className="collection-create-form_last-form-item">
                <Radio.Group>
                <Radio value="public">加冰</Radio>
                <Radio value="private">去冰</Radio>
                </Radio.Group>
            </Form.Item>
            </Form>
        </Modal>
    );
};
const CollectionsPage = () => {
    const [visible, setVisible] = useState(false);
  
    const onCreate = values => {
      console.log('Received values of form: ', values);
      setVisible(false);
    };
  
    return (
      <div>
        <Button
          type="primary"
          onClick={() => {
            setVisible(true);
          }}
        >
          添加
        </Button>
        <CollectionCreateForm
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
        />
      </div>
    );
};

// 日期
function onChange(date, dateString) {
    console.log(date, dateString);
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
                    <div className="BtnWin"  style={{marginLeft:10,float:"right"}}>
                        <CollectionsPage />    
                    </div>
                    {/* 日期 */}
                    <DatePicker onChange={onChange} style={{marginLeft:10}}/>                               
                </div>
            </div>
        </div>
    )
    
}

export default GoodsMange;