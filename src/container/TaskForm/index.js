import React, { Component } from 'react';
import styles from './styles';
import TextField from '@material-ui/core/TextField';
import { withStyles, Grid, Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as modalActions from './../../action/modal';
import { bindActionCreators, compose } from 'redux';
class TaskForm extends Component {
    render() {
        const { classes, modalActionCreator } = this.props;
        const { hideModal} = modalActionCreator;
        return (
            <form>
                <Grid container>
                    <Grid item md={12}>
                        <TextField
                            id="standard-name"
                            label="Tiêu đề"
                            className={classes.textField}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item md={12}>
                        <TextField
                            id="standard-multiline-flexible"
                            label="Mô tả"
                            className={classes.textField}
                            rowsMax="4"
                            margin="normal"
                        />
                    </Grid>
                    <Grid item md={12}>
                        <Box display="flex" flexDirection="row-reverse" mt={2}>
                            <Box ml={1}>
                                <Button variant="contained" onClick={hideModal}>Exit</Button>
                            </Box>
                            <Button variant="contained" color="primary">Save</Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

TaskForm.propTypes = {
    classes: PropTypes.object,
    modalActionCreator: PropTypes.shape({
        hideModal: PropTypes.func
    })
};


const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
    modalActionCreator: bindActionCreators(modalActions, dispatch)
})

const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose(
    withStyles(styles),
    withConnect
)(TaskForm);