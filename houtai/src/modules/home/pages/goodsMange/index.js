import React,{ useState,Component} from 'react';
import { Breadcrumb,Input,Button,Modal,Form,Radio,Table } from 'antd';
import { HomeOutlined, UserOutlined  } from '@ant-design/icons';
import http from '../../../../http'


const { Search } = Input;


// 样式
const style={
    padding:'8px'
}

// 添加功能的弹窗
const CollectionCreateForm = ({ visible, onCreate, onCancel }) =>{
    const [form] = Form.useForm();
    return(
        <Modal
            visible={visible}
            title="添加商品"
            okText="添加"
            cancelText="取消"
            onCancel={onCancel}
            onOk={() =>{
                form 
                  .validateFields()
                  .then(values =>{
                      console.log(values.price);
                      http.post('/good/addgoods',{title:values.title,price:values.price,weight:values.weight}).then(res=>{
                          console.log(res);
                          if(res.flag){
                            // visible=false;
                            alert("添加成功")
                          }else{
                            alert("添加失败")
                          }
                      })
                    //   form.resetFields();
                    //   onCreate(values);
                  })
                  .catch(info =>{
                      console.log('Validate Faled:',info);
                  });
            }}>
            <Form
            form = {form}
            layout="vertical"
            name="form_in_modal"
            initialValues={{
                modifier:'添加商品',
            }}>
                <Form.Item
                    name="title"
                    label="商品名称"
                    rules={[
                        {
                            required:true,
                            message:'请填写内容',
                        },]}>
                    <Input />
                </Form.Item>
                <Form.Item 
                name="price" 
                label="价钱">
                    <Input type="textarea" />
                </Form.Item>
                <Form.Item 
                name="weight" 
                label="规格">
                    <Input type="textarea" />
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
    egtitle:'商品英文名称',
    chtitle:'商品中文名称',
    price:'商品价格',
    weight:'库存',
    gid:'id'
}

export default class GoodsMange extends Component{
    state = {
        dataSource:[],
        columns:[],
        total:0,
        visible:false,
        data_id:'',//用于动态获取删除的商品的id
        page:1,
        size:14
    }
    // 点击时出现对话窗口
    showModal = (e)=>{
        let id = e.target.parentNode.parentNode.parentNode.parentNode.getAttribute("data-row-key")
        console.log('点击删除时当前行的id',id);
        this.setState({
          visible: true,
          data_id:id
        });
        console.log(id,this.state.data_id);
    };

    //点击确定时的执行操作
    handleOk() {
        let idx = this.state.data_id
        console.log('点击OK要删除的行的idx',idx);
       http.remove(`/good/delgood/${idx}`,{
          id:idx
        }).then(res=>{
            console.log(res);
            if(res.flag){
                let {dataSource}=this.state;
                let data =dataSource.filter(item=>item.gid!=idx);
                console.log(data);
                this.setState({
                    visible: false,
                    dataSource:data
                   });
            }
        })
        //  console.log(res);
         
      }
      //点击取消时的操作
      handleCancel = e => {
        this.setState({
          visible: false,
        });
      };
    //查询功能
    Search=(goodsname)=>{
        //发送请求到
        // console.log(goodsname);
        http.get('/good/searchgoods',{goodsname}).then(res=>{
            console.log(res);
            if(res.flag){
                this.setState({dataSource:res.data.p,page:res.data.p.length,total:res.data.p.length});
            }else{
                alert("抱歉！没有找到！")
            }
            
            // console.log(res.data.p.length,this.state.size);
        })
    }
       

    // 请求数据商品数据
    componentDidMount(){
        let {size}=this.state;
        http.get('/good/goodslist',{page:1,size}).then(data=>{
            // console.log(data);
            const data2 = data.data;
            const all = data2.length;
            // console.log(data2);
            // 切割数据的标题
            const columnsKey = Object.keys(data2[0]).filter(item => item === "egtitle" ||  item === "chtitle" || item === "price" || item === "weight" || item === "gid")
            // console.log(columnsKey);

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
        return (
            <div className="mainInfo" style={{ width:"100%" }}>
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
                    <div className="HeaderInfo" style={{float: "left"}}>
                        {/* 搜索框 */}
                        <Search placeholder="商品名称" onSearch={value => this.Search(value)} enterButton style={{ width:200,marginLeft:10 }} />
                        {/* 添加功能 */}
                        <div className="BtnWin"  style={{marginLeft:10,float:"right"}}>
                            <CollectionsPage />    
                        </div>                             
                    </div>
                    {/* 底部跳转表单 */}
                    <div className="FormDemo" style={{width:"100%",paddingTop:54}}> 
                        <Table
                            dataSource={this.state.dataSource}
                            columns={this.state.columns}
                            rowKey={record => record.gid}
                            width={'120'}
    
                            pagination={
                                {
                                    position: ['bottomCenter'],
                                    total: this.state.total,//数据总数
                                    defaultPageSize:  5,//默认每页条数
                                    // pageSize:  this.page,//每页条数

                                    hideOnSinglePage: true,//只有一页时是否隐藏分页器
                                    showQuickJumper: true,//是否可以快速跳转至某页
                                }
                            }
                        />
                        <Modal
                            title="该操作不可逆，请谨慎执行！"
                            visible={this.state.visible}
                            onOk={() => this.handleOk()}
                            onCancel={this.handleCancel.bind(this)}
                            >
                            <p>确定删除这条数据吗？</p>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
    
}

// export default GoodsMange;