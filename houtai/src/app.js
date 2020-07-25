import React from 'react';
import {Route,Switch,Redirect,withRouter} from 'react-router-dom';

//二级组件引入
import Login from './modules/login';
import Home from './modules/home';
import Sign from './modules/sign'


class App extends React.Component{
    render(){
        return (
            <div>
                <Switch>
                    <Route path="/home" component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/sign" component={Sign}/>
                    <Redirect from="/" to="/home" exact/>
                </Switch>   
            </div>
        );
    }
}

App = withRouter(App);
export default App;