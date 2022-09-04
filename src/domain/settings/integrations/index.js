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

import '../style.scss';
import './style.scss';

import React, { useState } from 'react';

import Switcher from '../../../components/switcher';

const Integrations = () => {
    const [hubIntegration, setHubIntegration] = useState(false);
    const [slackIntegration, setSlackIntegration] = useState(false);
    return (
        <div className="alerts-integrations-container">
            <h3 className="title">Some sentence</h3>
            <div>
                <div className="hub-connect-integration">
                    <div className="alert-integration-type">
                        <label className="integration-label-bold">Memphis hub</label>
                        <Switcher onChange={() => setHubIntegration(!hubIntegration)} checked={hubIntegration} checkedChildren="on" unCheckedChildren="off" />
                    </div>
                    {!hubIntegration && <p>Signin placeholder</p>}
                </div>
                <div className="alert-integration-type">
                    <label className="alert-integration-label">Slack</label>
                    <Switcher onChange={() => setSlackIntegration(!slackIntegration)} checked={slackIntegration} checkedChildren="on" unCheckedChildren="off" />
                </div>
            </div>
        </div>
    );
};

export default Integrations;
