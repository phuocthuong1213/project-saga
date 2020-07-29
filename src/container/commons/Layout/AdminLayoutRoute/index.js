import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import DashBoard from '../../../../components/Dashboard';
import PropsType from 'prop-types';
class AdminLayoutRoute extends Component {
    render() {
        const { component: YourComponent, ...remainProps } = this.props;
        return (
            <Route
                {...remainProps} render={routeProps => {
                    return (
                        <DashBoard>
                            <YourComponent {...routeProps} />
                        </DashBoard>
                    );
                }}
            />
        )
    }
}

AdminLayoutRoute.propTypes = {
    path: PropsType.string,
    name: PropsType.string,
    exact: PropsType.bool,
    component: PropsType.oneOfType([PropsType.object, PropsType.func]),
}
export default AdminLayoutRoute