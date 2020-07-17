import React, { Component } from 'react'
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import './type.css'
class Type extends Component {
    state={
        tabs:[
                { title: '蛋糕', sub: '1' },
                { title: '冰淇淋', sub: '2' },
                { title: '咖啡下午茶', sub: '3' },
                { title: '面包', sub: '4' },
                { title: '常温蛋糕', sub: '5' },
                { title: '设计师礼品', sub: '6' },
            ]
    }
    render() {
        return (
            <div className="type">
                <Tabs tabs={this.state.tabs}
                initialPage={0}
                //高亮字体颜色
                tabBarActiveTextColor={'#442818'}
                onChange={(tab, index) => { console.log('onChange', index, tab); }}
                onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                >
                {/* {this.state.tabs.map((item,index)=>{
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                        Content of first tab
                    </div>
                })} */}
                    <div className='list-pro-box'>
                        <div className='pro-list-title' id='list-title-1'>
                            <h2>
                                蛋糕
                                <span>新鲜乳脂奶油蛋糕</span>
                            </h2>
                        </div>
                        <div className='list-box'></div>
                    </div>
                {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                    Content of second tab
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                    Content of third tab
                </div> */}
                </Tabs>
            </div>
        )
    }
}


export default Type

