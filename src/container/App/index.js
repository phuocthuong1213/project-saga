import React, { Component } from 'react';
import styles from './style.js';
import { withStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import TaskBoard from '../Taskboard/index.js';
import theme from '../commons/Theme/index.js';
import { Provider } from 'react-redux';
import configureStore from './../../redux/configureStore';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ToastContainer />
          <TaskBoard />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default withStyles(styles)(App);
