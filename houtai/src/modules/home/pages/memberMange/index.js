import React,{ useState,Component}  from 'react';
import {  Breadcrumb,Input,Button,Modal,Form,Radio,Table } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import http from '../../../../http';

const { Search } = Input;


// 样式
const style ={
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

// 设置表格标题
const titleDisplayMap={
  username:'账号',
  psw:'密码',
  sex:'性别',
  birthday:'生日',
  balance: "余额",
  uid:'id'
}


export default class MemberMange extends Component{
  state={
      dataSource:[],
      columns:[],
      total:0,
      visible:false,
      data_id:'',// 用于动态获取删除的商品的id
      page:1,
      size:14
  }
  // 点击时出现对话窗口
  showModal = (e)=>{
      let id = e.target.parentNode.parentNode.parentNode.parentNode.getAttribute("data-row-key")
      // console.log('点击删除时当前行的id',id);
      this.setState({
        visible: true,
        data_id:id
      });
      // console.log(id,this.state.data_id);
  };

  // 点击确定时的执行操作
  handleOk(){
    let idx = this.state.data_id
    // console.log('点击OK要删除的行的idx',idx);
    http.remove(`/user/del/${idx}`,{
      id:idx
    }).then(res =>{
        console.log(res);
        if(res.code){
          let {dataSource} =this.state;
          let data =dataSource.filter(item=>item.uid!=idx);
          // console.log(data);
          this.setState({
            visible:false,
            dataSource:data
          });
        }
    })
  }
  // 点击取消时的操作
  handleCancel = e => {
    this.setState({
      visible:false
    });
  };

  // 请求数据商品数据
  componentDidMount(){
      let {size} = this.state;
      http.get('/user/userslist',{page:1,size}).then(data=>{
        const data2 = data.data;
        const all = data2.length;

        // 切割数据的标题
        const columnsKey = Object.keys(data2[0]).filter(item => item ==="username" || item === "psw" || item === "sex" || item === "birthday" || item === "balance" || item === "uid")

        // 设置数据格式
        const columns = columnsKey.map(item =>{
          return {
            dataIndex:item,
            title:titleDisplayMap[item],
            key:item
          }
        })
        // 增加编辑删除列
        columns.push({
          title:'操作',
          key:'handle',
          render:(text,record) =>{
            return (
              <div>
                <Button>编辑</Button>
                <Button onClick={(e) => this.showModal(e)}>删除</Button>
              </div>
            )
          }
        })

        // 设置数据
        this.setState({
          total:all,
          columns,
          dataSource:data2
        })
      })

  }
    render(){
      const {userlist}=this.state
      console.log(userlist);
        return (
            <div className="mainInfo" style={{ width:"100%" }}>
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
                    <div className="HeaderInfo" style={{float: "left"}}>
                        {/* 搜索框 */}
                        <Search placeholder="查询" onSearch={value => console.log(value)} enterButton style={{ width:200,marginLeft:10 }} />
    
                        {/* 添加功能 */}
                        <div className="BtnWin"  style={{marginLeft:10,float:"right"}}>
                            <CollectionsPage />    
                        </div>                                               
                    </div>
                    {/* 表单 */}
                    <div className="FormDemo" style={{width:"100%",paddingTop:54}}> 
                      <Table 
                        dataSource = { this.state.dataSource }
                        columns = { this.state.columns }
                        rowKey = { record => record.uid }
                        width = { '120' }

                        pagination ={
                          {
                            position : ['bottomCenter'],
                            total : this.state.total,//数据总数
                            defaultPageSize: 5, // 默认每页条数
                            hideOnSinglePage: true,//只有一页时是否隐藏分页器
                            showQuickJumper: true,// 是否可以快速跳转至某也
                          }
                        }
                      />
                      <Modal
                        title="该操作不可逆，请谨慎执行！"
                        visible = {this.state.visible}
                        onOk = {() => this.handleOk()}
                        onCancel = {this.handleCancel.bind(this)}
                      >
                          
                      </Modal>
                        
                    </div>
                </div>
            </div>
        )
    }
}
