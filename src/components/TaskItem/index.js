import React, { Component } from 'react';
import styles from './styles.js';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
class TaskItem extends Component {
    render() {
        const { classes, task, status, onClickEdit, onClickDelete } = this.props;
        const { id, title } = task;
        return (
            <Card key={id} className={classes.card}>
                <CardContent>
                    <Grid container justify="space-between">
                        <Grid item md={8}>
                            <Typography component="h2">{title}</Typography>
                        </Grid>
                        <Grid item md={4}>
                            {status.label}
                        </Grid>
                        {task.description}
                    </Grid>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Fab
                        color="primary"
                        aria-label="Edit"
                        className={classes.fab}
                        size="small"
                        onClick={onClickEdit}
                    >
                        <Icon fontSize="small">edit_icon</Icon>
                    </Fab>
                    <Fab
                        color="primary"
                        aria-label="Delete"
                        className={classes.fab}
                        size="small"
                        onClick={onClickDelete}
                    >
                        <Icon fontSize="small">delete_icon</Icon>
                    </Fab>
                </CardActions>
            </Card>
        );
    }
}
TaskItem.propTypes = {
    classes: PropTypes.object,
    task: PropTypes.object,
    status: PropTypes.object,
    onClickEdit: PropTypes.func
}
export default withStyles(styles)(TaskItem);
