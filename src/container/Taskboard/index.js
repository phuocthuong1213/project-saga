import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import styles from './styles.js';
import TaskList from './../../components/TaskList';
import { STATUSES } from './../../constants/index';
import TaskForm from '../../components/TaskForm/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as taskActions from './../../action/task';
class TaskBoard extends Component {
    state = {
        open: false,
    };

    componentDidMount() {
        const { taskActionCreators } = this.props;
        const { fetchListTaskRequest } = taskActionCreators
        fetchListTaskRequest();
    }

    openForm = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    renderBoard() {
        const { listTask } = this.props;
        let xhtml = null;
        xhtml = (
            <Grid container spacing={2}>
                {STATUSES.map((status, index) => {
                    const taskFiltered = listTask.filter(
                        (task) => task.status === status.value,
                    );
                    return <TaskList key={index} tasks={taskFiltered} status={status} />;
                })}
            </Grid>
        );
        return xhtml;
    }

    renderForm() {
        let xhtml = null;
        const { open } = this.state;
        xhtml = <TaskForm open={open} onClose={this.handleClose} />;
        return xhtml;
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.taskBoard}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.openForm}
                >
                    <AddIcon />
                </Button>
                {this.renderBoard()}
                {this.renderForm()}
            </div>
        );
    }
}

TaskBoard.propTypes = {
    class: PropTypes.object,
    taskActionCreators: PropTypes.shape({
        fetchListTaskRequest: PropTypes.func
    }),
    listTask: PropTypes.array
}

const mapStateToProps = state => {
    return {
        listTask: state.task.listTask
    }
};


const mapDispatchToProps = dispatch => {
    return {
        taskActionCreators: bindActionCreators(taskActions, dispatch),
    };
};
export default withStyles(styles)(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(TaskBoard),
);