import React, { Component } from 'react';
import styles from './style.js';
import { withStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
//import TaskBoard from '../Taskboard/index.js';
import theme from '../commons/Theme/index.js';
import { Provider } from 'react-redux';
import configureStore from './../../redux/configureStore';
import { ToastContainer } from 'react-toastify';
import GlobalLoading from '../../components/GlobalLoading/index.js';
import Modal from './../../components/Modal';
import { ADMIN_ROUTES } from '../../constants';
import { BrowserRouter, Switch } from "react-router-dom";
import AdminLayoutRoute from '../commons/Layout/AdminLayoutRoute/index.js';
import CssBaseline from '@material-ui/core/CssBaseline';
const store = configureStore();

class App extends Component {

  renderAdminRoute() {
    let xhtml = null;

    xhtml = ADMIN_ROUTES.map(route => {
      return (
        <AdminLayoutRoute key={route.path} component={route.component} exact={route.exact} path={route.path} name={route.name} />
        //<AdminLayoutRoute key={route.path} route={route} />
      );
    });

    return xhtml;
  }


  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ToastContainer />
            <GlobalLoading />
            <Modal />
            <Switch>
              {this.renderAdminRoute()}
            </Switch>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default withStyles(styles)(App);
