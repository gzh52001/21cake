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
          <i key="1" className="city"></i>
        ]}
        onLeftClick={() => console.log('onLeftClick')}
        rightContent={[
          <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
          <Icon key="1" type="ellipsis" />,
        ]}
      >
      <i className="iconfont icon-header-center" type="left"></i>
    </NavBar>
    </div>
  );
}

export default App;
