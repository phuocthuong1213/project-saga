import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import styles from './styles.js';
import TaskList from './../../components/TaskList';
import SearchBox from './../../components/SearchBox';
import { STATUSES } from './../../constants/index';
import TaskForm from '../TaskForm/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as taskActions from './../../action/task';
import * as modalActions from './../../action/modal';
class TaskBoard extends Component {
    state = {
        open: false,
    };

    componentDidMount() {
        const { taskActionCreators } = this.props;
        const { fetchListTask } = taskActionCreators;
        fetchListTask();
    }

    openForm = () => {
        const { modalActionCreator } = this.props;
        const { showModal, changeModalTitle, changeModalContent } = modalActionCreator;
        showModal();
        changeModalTitle('Thêm mới công việc');
        changeModalContent(<TaskForm />);
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

    loadData = () => {
        const { taskActionCreators } = this.props;
        const { fetchListTask } = taskActionCreators;
        fetchListTask();
    }

    handleFilter = e => {
        const { value } = e.target;
        const { taskActionCreators } = this.props;
        const { filterTask } = taskActionCreators;
        filterTask(value);
    }

    renderSearchBox() {
        let xhtml = null;
        xhtml = <SearchBox handleChange={this.handleFilter} />
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
                    onClick={this.loadData}
                >
                    Load Data
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.openForm}
                >
                    <AddIcon />
                </Button>
                {this.renderSearchBox()}
                {this.renderBoard()}
            </div>
        );
    }
}

TaskBoard.propTypes = {
    class: PropTypes.object,
    taskActionCreators: PropTypes.shape({
        fetchListTask: PropTypes.func,
        filterTask: PropTypes.func
    }),
    modalActionCreator: PropTypes.shape({
        showModal: PropTypes.func,
        hideModal: PropTypes.func,
        changeModalTitle: PropTypes.func,
        changeModalContent: PropTypes.func,
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
        modalActionCreator: bindActionCreators(modalActions, dispatch)
    };
};
export default withStyles(styles)(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(TaskBoard),
);