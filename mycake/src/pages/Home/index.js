import React, { Component } from 'react'
import { Carousel,WingBlank} from 'antd-mobile';
import './home.css'
import {withRouter} from 'react-router-dom';

import Bread from '../Type/Bread';
import Cake from '../Type/Cake';
import CCake from '../Type/CCake';
import Gift from '../Type/Gift';
import IceCream from '../Type/IceCream';
import Tea from '../Type/Tea'

 class Home extends Component {
    state = {
        data: [
        'https://static.21cake.com//upload/images/8dd6c441b4acda5e0651af43a81b9731.jpg',
        'https://static.21cake.com//upload/images/f85354a7eb45dc3725b5b595a393d6ae.jpg',
        'https://static.21cake.com//upload/images/350655c7460cc54297919171f6ebae9c.jpeg',
        'https://static.21cake.com//upload/images/ca9e0211b2910589238cd68ed38dc3c3.jpg',
        'https://static.21cake.com//upload/images/ce9c53ee52de5d6bcb1e6747e8e25dd7.jpg'
        ],
        imgHeight: 176,
        typedata:[
          {
            title:'蛋糕',
            path:'/cake',
            img:'https://static.21cake.com//upload/images/145995dff6c6458e0738ee2178a1a0df.png',
            component:Cake
          },
          {
            title:'面包',
            path:'/bread',
            img:'https://static.21cake.com//upload/images/561ca3d60f16a63299fd16d3e9e0c3c4.png',
            component:Bread
          },
          {
            title:'下午茶',
            path:'/tea',
            img:'https://static.21cake.com//upload/images/3b70ed637c61fc696faa7e983726ed7d.png',
            component:Tea
          },
          {
            title:'企业专区',
            path:'/qiye',
            img:'https://static.21cake.com//upload/images/760d7a2fe4c5e1bede87389fc843de7f.png',
            component:Gift
          }
        ]
      }
      goto=(path)=>{
        // console.log(this.props);
        this.props.history.push(path)
      }
      componentDidMount() {
        // simulate img loading
        setTimeout(() => {
          this.setState({
            // data: ['https://static.21cake.com//upload/images/8dd6c441b4acda5e0651af43a81b9731.jpg',
            // 'https://static.21cake.com//upload/images/f85354a7eb45dc3725b5b595a393d6ae.jpg',
            // 'https://static.21cake.com//upload/images/350655c7460cc54297919171f6ebae9c.jpeg',
            // 'https://static.21cake.com//upload/images/ca9e0211b2910589238cd68ed38dc3c3.jpg',
            // 'https://static.21cake.com//upload/images/ce9c53ee52de5d6bcb1e6747e8e25dd7.jpg'],
          });
        }, 100);
      }
      render() {
        return (
          <div>
              <WingBlank>
              <Carousel
                autoplay={true}
                infinite
                // slideWidth={1.1}
              //   beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
              //   afterChange={index => console.log('slide to', index)}
              >
                {this.state.data.map((val,index) => (
                  <a
                    key={val}
                    href=""
                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                  >
                    <img
                      src={this.state.data[index]}
                      alt=""
                      style={{ width: '100%', verticalAlign: 'top' }}
                      onLoad={() => {
                        // fire window resize event to change height
                        window.dispatchEvent(new Event('resize'));
                        this.setState({ imgHeight: 'auto' });
                      }}
                    />
                  </a>
                ))}
              </Carousel>
              </WingBlank>
              <div className="new-home-content">
                <ul className="right-box">
                  <li>
                    <i className="new-home-icon"></i>
                    新客满298元赠送切块蛋糕
                  </li>
                  <li>
                    <i className="new-home-icon"></i>
                    满100包邮 
                  </li>
                  <li>
                    <i className="new-home-icon"></i>
                    全程冷链配送
                  </li>
                </ul>
                <ul className="home-menu-box" id="home-menu">
                {this.state.typedata.map((val,index) => (
                  <li
                    key={val.title}
                    onClick={this.goto.bind(null,val.path)}
                  >
                    <a>
                      <img src={val.img} />
                      {val.title}
                    </a>
                  </li>))
                }
                  {/* <li>
                    <a>
                      <img src="https://static.21cake.com//upload/images/145995dff6c6458e0738ee2178a1a0df.png" />
                      蛋糕
                    </a>
                  </li>
                  <li>
                    <a>
                      <img src="https://static.21cake.com//upload/images/561ca3d60f16a63299fd16d3e9e0c3c4.png" />
                      面包
                    </a>
                  </li>
                  <li>
                    <a>
                      <img src="https://static.21cake.com//upload/images/3b70ed637c61fc696faa7e983726ed7d.png" />
                      下午茶
                    </a>
                  </li>
                  <li>
                    <a>
                      <img src="https://static.21cake.com//upload/images/760d7a2fe4c5e1bede87389fc843de7f.png" />
                      企业专区
                    </a>
                  </li> */}
                </ul>
              </div>
          </div>
        );
      }
}
Home = withRouter(Home)
export default Home
