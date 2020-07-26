import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import styles from './styles';
import PropTypes from 'prop-types';
class SearchBox extends Component {
    render() {
        const { classes, handleChange } = this.props;
        return (
            <div>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        autoComplete="off"
                        className={classes.TextField}
                        onChange={handleChange}
                        margin="normal"
                        placeholder="Nhập từ khóa !!!"
                    />
                </form>
            </div>
        )
    }
}


SearchBox.propTypes = {
    classes: PropTypes.object,
    handleChange: PropTypes.func
};
export default withStyles(styles)(SearchBox);