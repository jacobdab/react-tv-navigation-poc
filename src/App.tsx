import React, {useEffect} from 'react';
import {Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {Dispatch} from "redux";

import Menu from './Menu/Menu';
import Content1 from '../src/Content1/Content1';
import Content2 from '../src/Content2/Content2';
import {initDefaultFocus} from "./redux/navigation/actions";

import './App.css';





const App = (props: any) => {

  useEffect(() => {
    props.initDefaultFocus();
  }, []);

  return (
    <div className="App">
      <Menu className={'Menu'} />
        <Switch>
        <Route path={'/'} exact component={Content1}/>
        <Route path={'/content2'} component={Content2}/>
        </Switch>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  initDefaultFocus: () => dispatch(initDefaultFocus())
});


export default connect(null, mapDispatchToProps)(App);
