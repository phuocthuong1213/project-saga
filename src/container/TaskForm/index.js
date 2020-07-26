import React, { Component } from 'react';
import styles from './styles';
//import TextField from '@material-ui/core/TextField';
import { withStyles, Grid, Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as modalActions from './../../action/modal';
import { bindActionCreators, compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import renderTextField from '../../components/FormHelper/TextField';
import validate from './validate';
class TaskForm extends Component {

    handleSubmitForm = data => {
        console.log(data);
    }

    render() {
        const { classes, modalActionCreator, handleSubmit } = this.props;
        const { hideModal } = modalActionCreator;
        return (
            <form onSubmit={handleSubmit(this.handleSubmitForm)}>
                <Grid container>
                    <Grid item md={12}>
                        {/* <TextField
                            id="standard-name"
                            label="Tiêu đề"
                            className={classes.textField}
                            margin="normal"
                        /> */}
                        <Field
                            id="title"
                            label="Tiêu đề"
                            className={classes.textField}
                            margin="normal"
                            name="title"
                            component={renderTextField}
                        />
                    </Grid>
                    <Grid item md={12}>
                        {/* <TextField
                            id="standard-multiline-flexible"
                            label="Mô tả"
                            className={classes.textField}
                            rowsMax="4"
                            margin="normal"
                        /> */}
                        <Field
                            id="description"
                            label="Mô tả"
                            multiline
                            rowsMax="4"
                            className={classes.textField}
                            margin="normal"
                            name="description"
                            component={renderTextField}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <Box display="flex" flexDirection="row-reverse" mt={2}>
                            <Box ml={1}>
                                <Button variant="contained" onClick={hideModal}>Exit</Button>
                            </Box>
                            <Button variant="contained" color="primary" type="submit">Save</Button>
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
    }),
    handleSubmitForm: PropTypes.func
};


const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
    modalActionCreator: bindActionCreators(modalActions, dispatch)
})

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const FORM_NAME = 'TASK_MANAGEMENT';

const withReduxForm = reduxForm({
    // a unique name for the form
    form: FORM_NAME,
    validate
});

export default compose(
    withStyles(styles),
    withConnect,
    withReduxForm
)(TaskForm);