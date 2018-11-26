import React from 'react';
import {Provider} from './context';
export default class BrowserRouter extends React.Component{
  state = {
    location:{
      pathname: window.location.pathname || '/',
    }
  }
  componentWillMount(){
    window.addEventListener('popstate',()=>{
      let pathname = window.location.pathname;
      this.handleChangeState(pathname);
    },false);
  }
  handleChangeState(pathname){
    this.setState({
      location:{
        ...this.state.location,
        pathname
      }
    })
  }
  render(){ // a
    let that = this;
    let value = {
      ...this.state,
      history:{
        push(pathname){
          window.history.pushState({},null,pathname);
          that.handleChangeState(pathname);
        }
      }
    }
    return <Provider value={value}>
      {this.props.children}
    </Provider>
  }
}