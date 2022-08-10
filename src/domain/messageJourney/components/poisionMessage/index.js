// Copyright 2021-2022 The Memphis Authors
// Licensed under the Apache License, Version 2.0 (the “License”);
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import './style.scss';

import React, { useState } from 'react';
import Button from '../../../../components/button';
import CustomCollapse from '../../../stationOverview/stationObservabilty/components/customCollapse';
import { Space } from 'antd';
import { httpRequest } from '../../../../services/http';
import { ApiEndpoints } from '../../../../const/apiEndpoints';
import { message as messageAnt } from 'antd';

const PoisionMessage = ({ stationName, messageId, details, message, processing, returnBack }) => {
    const [resendProcess, setResendProcess] = useState(false);
    const [ignoreProcess, setIgnoreProcess] = useState(false);

    const handleIgnore = async () => {
        setIgnoreProcess(true);
        try {
            await httpRequest('POST', `${ApiEndpoints.ACK_POISION_MESSAGE}`, { poison_message_ids: [messageId] });
            setTimeout(() => {
                setIgnoreProcess(false);
                returnBack();
            }, 1500);
        } catch (error) {
            setIgnoreProcess(false);
        }
    };

    const handleResend = async () => {
        setResendProcess(true);
        processing(true);
        try {
            await httpRequest('POST', `${ApiEndpoints.RESEND_POISION_MESSAGE_JOURNEY}`, { poison_message_ids: [messageId] });
            setTimeout(() => {
                setResendProcess(false);
                processing(false);
                messageAnt.success({
                    key: 'memphisSuccessMessage',
                    content: 'The message was sent successfully',
                    duration: 5,
                    style: { cursor: 'pointer' },
                    onClick: () => message.destroy('memphisSuccessMessage')
                });
            }, 1500);
        } catch (error) {
            setResendProcess(false);
            processing(false);
        }
    };

    return (
        <div className="poision-message">
            <header is="x3d">
                <p>
                    {stationName} / #{messageId.substring(0, 5)}
                </p>
                <div className="btn-row">
                    <Button
                        width="75px"
                        height="24px"
                        placeholder="Ignore"
                        colorType="white"
                        radiusType="circle"
                        backgroundColorType="purple"
                        fontSize="12px"
                        fontWeight="600"
                        isLoading={ignoreProcess}
                        onClick={() => handleIgnore()}
                    />
                    <Button
                        width="90px"
                        height="24px"
                        placeholder="Resend"
                        colorType="white"
                        radiusType="circle"
                        backgroundColorType="purple"
                        fontSize="12px"
                        fontWeight="600"
                        isLoading={resendProcess}
                        onClick={() => handleResend()}
                    />
                </div>
            </header>
            <div className="content-wrapper">
                <Space direction="vertical">
                    <CustomCollapse status={false} header="Details" defaultOpen={true} data={details} />
                    <CustomCollapse status={false} header="Payload" defaultOpen={true} data={message} message={true} />
                </Space>
            </div>
        </div>
    );
};
export default PoisionMessage;
