import React from 'react';
import { NavBar,Icon} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
// import './icon/iconfont/iconfont'
import './App.css'
function App() {
  return (
    <div className="container">
      <NavBar
        mode="light"
        // icon={<i className="iconfont icon-title" ></i>}
        leftContent={[
          <i key="0" className="iconfont icon-title" ></i>,
          <i key="1" className="city"></i>,
          <span style={{ fontSize:'12px',color:'#442818' }}>广州</span>
        ]}
        onLeftClick={() => console.log('onLeftClick')}
        rightContent={[
          <i key="0" className="top-message" ></i>,
          <i key="1" className="top-cart"></i>
        ]}
      >
      <i className="iconfont icon-header-center" type="left" style={{ width:"30px" }}></i>
    </NavBar>
    </div>
  );
}

export default App;
