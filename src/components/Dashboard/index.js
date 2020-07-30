import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles';
import PropsType from 'prop-types'
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { bindActionCreators, compose } from 'redux';
import * as uiActions from './../../actions/ui';
import { connect } from 'react-redux';
import cn from 'classnames';
class Dashboard extends Component {

    handleToggleSidebar = value => {
        const { uiActionCreators } = this.props;
        const { showSidebar, hideSidebar } = uiActionCreators;
        if (value === true) {
            showSidebar();
        } else {
            hideSidebar();
        }
    }

    render() {
        const { children, classes, name, showSidebar } = this.props;
        return (
            <div className={classes.dashBoard}>
                <Header name={name} showSidebar={showSidebar} onToggleSidebar={this.handleToggleSidebar} />
                <div className={classes.wrapper}>
                    <Sidebar showSidebar={showSidebar} onToggleSidebar={this.handleToggleSidebar} />
                    <div className={cn(
                        classes.wrapperContent, {
                        [classes.shiftLeft]: showSidebar === false
                    })}>
                        {children}
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    children: PropsType.object,
    classes: PropsType.object,
    name: PropsType.string,
    showSidebar: PropsType.bool,
    uiActionCreators: PropsType.shape({
        showSidebar: PropsType.func,
        hideSidebar: PropsType.func
    })
}

const mapStateToProps = state => {
    return {
        showSidebar: state.ui.showSidebar
    };
}

const mapDispatchToProps = dispatch => {
    return {
        uiActionCreators: bindActionCreators(uiActions, dispatch)
    }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
    withConnect,
    withStyles(styles)
)(Dashboard)