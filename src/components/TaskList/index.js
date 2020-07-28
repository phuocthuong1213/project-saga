import React, { Component } from 'react';
import styles from './styles.js';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TaskItem from '../TaskItem/index.js';
import PropTypes from 'prop-types';
class TaskList extends Component {
  render() {
    const { classes, tasks, status, onClickEdit, onClickDelete } = this.props;
    return (
      <Grid item md={4} xs={12}>
        <Box mt={2} mb={2}>
          <div className={classes.status}>{status.label}</div>
        </Box>
        <div className={classes.wrapperListTask}>
          {tasks.map((task) => {
            return (
              <TaskItem
                classes={classes}
                task={task}
                status={status}
                key={task.id}
                onClickEdit={() => onClickEdit(task)}
                onClickDelete={() => onClickDelete(task)}
              />
            );
          })}
        </div>
      </Grid>
    );
  }
}
TaskList.propTypes = {
  classes: PropTypes.object,
  task: PropTypes.array,
  status: PropTypes.object,
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func
}
export default withStyles(styles)(TaskList);
