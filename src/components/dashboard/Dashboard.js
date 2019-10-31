import React from 'react';
import DashboardPromData from './DashboardPromData.js';
import DashboardShearchbar from './DashboardSearchbar.js';


class Dashboard extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div>
                    <h1 className="title is-1 mbmd">Dashboard</h1>
                </div>
                <div>
                <DashboardShearchbar />
                <DashboardPromData />
                </div>
            </React.Fragment>
        );
    }
}

export default Dashboard;
