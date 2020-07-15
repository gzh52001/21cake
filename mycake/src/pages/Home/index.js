import React, { Component } from 'react'
import { Carousel,WingBlank} from 'antd-mobile';
import './home.css'
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
      }
      componentDidMount() {
        // simulate img loading
        setTimeout(() => {
          this.setState({
            data: ['https://static.21cake.com//upload/images/8dd6c441b4acda5e0651af43a81b9731.jpg',
            'https://static.21cake.com//upload/images/f85354a7eb45dc3725b5b595a393d6ae.jpg',
            'https://static.21cake.com//upload/images/350655c7460cc54297919171f6ebae9c.jpeg',
            'https://static.21cake.com//upload/images/ca9e0211b2910589238cd68ed38dc3c3.jpg',
            'https://static.21cake.com//upload/images/ce9c53ee52de5d6bcb1e6747e8e25dd7.jpg'],
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
              </div>
          </div>
        );
      }
}

export default Home
