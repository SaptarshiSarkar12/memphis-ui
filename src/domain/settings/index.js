// Copyright 2021-2022 The Memphis Authors
// Licensed under the MIT License (the "License");
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// This license limiting reselling the software itself "AS IS".

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import './style.scss';

import React, { useContext, useState, useEffect } from 'react';
import { Divider } from 'antd';

import CustomTabs from '../../components/Tabs';
import { Context } from '../../hooks/store';
import Integrations from './integrations';
import Profile from './profile';
import Alerts from './alerts';

function Users() {
    const [value, setValue] = useState(0);
    // const tabs = ['Profile', 'Integrations', 'Alerts'];
    const tabs = ['Profile'];
    const [state, dispatch] = useContext(Context);

    useEffect(() => {
        dispatch({ type: 'SET_ROUTE', payload: '' });
    }, []);

    const handleChangeMenuItem = (_, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="preferences-container">
            <h1 className="main-header-h1">Preferences</h1>
            {/* <div className="preferences-panel-tabs">
                <div>
                    <CustomTabs value={value} onChange={handleChangeMenuItem} tabs={tabs}></CustomTabs>
                    <Divider />
                </div>
            </div> */}
            <div className="tabs-body">
                {value === 0 && <Profile />}
                {value === 1 && <Integrations />}
                {value === 2 && <Alerts />}
            </div>
        </div>
    );
}
export default Users;
