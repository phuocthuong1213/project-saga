import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles';
import PropsType from 'prop-types'
import Header from './components/Header';
import Sidebar from './components/Sidebar';
class Dashboard extends Component {
    render() {
        const { children, classes } = this.props;
        return (
            <div className={classes.dashBoard}>
                <Header />
                <Sidebar/>
                {children}
            </div>
        )
    }
}

Dashboard.propTypes = {
    children: PropsType.object,
    classes: PropsType.object
}
export default withStyles(styles)(Dashboard)