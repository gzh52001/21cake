import React, { Component } from 'react'
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import './type.css'
class Type extends Component {
    state={
        // tabs: [
        //         { title: <Badge text={'3'}>First Tab</Badge> },
        //         { title: <Badge text={'今日(20)'}>Second Tab</Badge> },
        //         { title: <Badge dot>Third Tab</Badge> },
        //     ],
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
            // <div className='products-list-nav-box'>
            //     <div className='products-list-nav'>
            //         <ul className='list-nav'>
            //             <li>
            //                 <a></a>
                            
            //             </li>
            //         </ul>
            //     </div>
                
            // </div>

            <div>
                <Tabs tabs={this.state.tabs}
                initialPage={0}
                onChange={(tab, index) => { console.log('onChange', index, tab); }}
                onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                    Content of first tab
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                    Content of second tab
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                    Content of third tab
                </div>
                </Tabs>
            </div>
        )
    }
}


export default Type

