import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import './monitorfinance.css'
import UserDashBoard from '../../components/UserDashBoard/UserDashBoard';

const MonitorFinance = () => {

    return (
        <div>
            <Tabs>
                <TabList>
                    {
                        [...Array(20)].map((hotel, index) =>
                            <Tab>Hotel {++index}</Tab>
                        )
                    }
                </TabList>
                {
                    [...Array(20)].map((hotel, index) =>
                        <TabPanel>
                            <UserDashBoard></UserDashBoard>
                        </TabPanel>
                    )
                }
            </Tabs>
        </div>
    );
};

export default MonitorFinance;