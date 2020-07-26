import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import styles from './styles'
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Clear';
import { connect } from 'react-redux';
import * as modalActions from './../../action/modal';
import { bindActionCreators, compose } from 'redux';
import { Modal } from '@material-ui/core';
class CommonModal extends Component {
    render() {
        const { classes, open, component, modalActionCreator, title } = this.props;
        const { hideModal } = modalActionCreator;
        return (
            <Modal open={open} onClose={hideModal}>
                <div className={classes.modal}>
                    <div className={classes.header}>
                        <span className={classes.title}>{title}</span>
                        <CloseIcon className={classes.icon} onClick={hideModal} />
                    </div>
                    <div className={classes.content}>{component}</div>
                </div>
            </Modal>
        )
    }
}
CommonModal.propTypes = {
    classes: PropTypes.object,
    open: PropTypes.bool,
    title: PropTypes.string,
    component: PropTypes.object,
    modalActionCreator: PropTypes.shape({
        hideModal: PropTypes.func
    })
}

const mapStateToProps = state => ({
    open: state.modal.showModal,
    component: state.modal.component,
    title: state.modal.title
});

const mapDispatchToProps = dispatch => ({
    modalActionCreator: bindActionCreators(modalActions, dispatch)
})

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
    withStyles(styles),
    withConnect
)(CommonModal);