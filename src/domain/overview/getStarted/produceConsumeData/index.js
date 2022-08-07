// Copyright 2021-2022 The Memphis Authors
// Licensed under the GNU General Public License v3.0 (the “License”);
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// https://www.gnu.org/licenses/gpl-3.0.en.html
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React, { useState, useEffect, useContext } from 'react';
import { Form } from 'antd';
import { CopyBlock, atomOneLight } from 'react-code-blocks';
import SelectComponent from '../../../../components/select';
import Button from '../../../../components/button';
import SuccessfullyReceivedProduce from '../../../../assets/images/successfullyReceivedProduce.svg';
import { GetStartedStoreContext } from '..';
import { httpRequest } from '../../../../services/http';
import { ApiEndpoints } from '../../../../const/apiEndpoints';
import './style.scss';
import TitleComponent from '../../../../components/titleComponent';
import { CODE_EXAMPLE, DOCKER_CODE_EXAMPLE } from '../../../../const/SDKExample';
import { LOCAL_STORAGE_ENV, LOCAL_STORAGE_NAMESPACE } from '../../../../const/localStorageConsts';

export const produceConsumeScreenEnum = {
    DATA_SNIPPET: 0,
    DATA_WAITING: 1,
    DATA_RECIEVED: 2
};

const ProduceConsumeData = (props) => {
    const { waitingImage, waitingTitle, successfullTitle, activeData, dataName, displayScreen, screen } = props;
    const [creationForm] = Form.useForm();
    const [isCopyToClipBoard, setCopyToClipBoard] = useState(displayScreen);
    const [getStartedState, getStartedDispatch] = useContext(GetStartedStoreContext);
    const [intervalStationDetails, setintervalStationDetails] = useState();

    const [langSelected, setLangSelected] = useState('Go');
    const [codeExample, setCodeExample] = useState({
        import: '',
        producer: '',
        consumer: ''
    });

    const handleSelectLang = (e) => {
        setLangSelected(e);
        changeDynamicCode(e);
    };

    const changeDynamicCode = (lang) => {
        let codeEx = {};
        codeEx.producer = CODE_EXAMPLE[lang].producer;
        codeEx.consumer = CODE_EXAMPLE[lang].consumer;
        let host = process.env.REACT_APP_SANDBOX_ENV
            ? 'broker.sandbox.memphis.dev'
            : localStorage.getItem(LOCAL_STORAGE_ENV) === 'docker'
            ? 'localhost'
            : 'memphis-cluster.' + localStorage.getItem(LOCAL_STORAGE_NAMESPACE) + '.svc.cluster.local';
        codeEx.producer = codeEx.producer.replaceAll('<memphis-host>', host);
        codeEx.consumer = codeEx.consumer.replaceAll('<memphis-host>', host);
        codeEx.producer = codeEx.producer.replaceAll('<station_name>', getStartedState?.stationName);
        codeEx.consumer = codeEx.consumer.replaceAll('<station_name>', getStartedState?.stationName);
        setCodeExample(codeEx);
    };

    const getStationDetails = async () => {
        try {
            const data = await httpRequest('GET', `${ApiEndpoints.GET_STATION_DATA}?station_name=${getStartedState?.formFieldsCreateStation?.name}`);
            if (data) {
                getStartedDispatch({ type: 'GET_STATION_DATA', payload: data });
            }
        } catch (error) {
            if (error?.status === 666) {
                clearInterval(intervalStationDetails);
            }
        }
    };

    useEffect(() => {
        changeDynamicCode(langSelected);
        if (displayScreen !== isCopyToClipBoard) {
            if (displayScreen === produceConsumeScreenEnum['DATA_WAITING']) {
                onCopyToClipBoard();
            }
            setCopyToClipBoard(displayScreen);
        }
    }, [displayScreen]);

    const onCopyToClipBoard = () => {
        let interval = setInterval(() => {
            getStationDetails();
        }, 3000);
        setintervalStationDetails(interval);
    };

    useEffect(() => {
        if (isCopyToClipBoard === produceConsumeScreenEnum['DATA_WAITING']) {
            getStartedDispatch({ type: 'SET_HIDDEN_BUTTON', payload: true });
        } else {
            getStartedDispatch({ type: 'SET_HIDDEN_BUTTON', payload: false });
            getStartedDispatch({ type: 'SET_NEXT_DISABLE', payload: false });
        }

        if (isCopyToClipBoard === produceConsumeScreenEnum['DATA_RECIEVED']) {
            clearInterval(intervalStationDetails);
        }
        return () => {
            getStartedDispatch({ type: 'SET_HIDDEN_BUTTON', payload: false });
            clearInterval(intervalStationDetails);
        };
    }, [isCopyToClipBoard]);

    useEffect(() => {
        if (
            getStartedState?.stationData &&
            getStartedState?.stationData[activeData] &&
            Object.keys(getStartedState?.stationData[activeData]).length >= 1 &&
            getStartedState?.stationData[activeData][0]?.name === dataName
        ) {
            setCopyToClipBoard(produceConsumeScreenEnum['DATA_RECIEVED']);
            // clearInterval(intervalStationDetails);
        }
        return () => {
            if (isCopyToClipBoard === produceConsumeScreenEnum['DATA_RECIEVED']) {
                clearInterval(intervalStationDetails);
            }
        };
    }, [[getStartedState?.stationData?.[activeData]]]);

    return (
        <Form name="form" form={creationForm} autoComplete="off" className="create-produce-data">
            <Form.Item name="languages" style={{ marginBottom: '0' }}>
                <div className="select-container">
                    {isCopyToClipBoard === produceConsumeScreenEnum['DATA_SNIPPET'] && (
                        <div>
                            <TitleComponent headerTitle="Language" typeTitle="sub-header"></TitleComponent>
                            <SelectComponent
                                initialValue={langSelected}
                                value={langSelected}
                                colorType="navy"
                                backgroundColorType="none"
                                borderColorType="gray"
                                radiusType="semi-round"
                                width="450px"
                                height="50px"
                                options={props.languages}
                                onChange={(e) => handleSelectLang(e)}
                                dropdownClassName="select-options"
                            />
                        </div>
                    )}
                </div>
                {isCopyToClipBoard === produceConsumeScreenEnum['DATA_WAITING'] ? (
                    <div className="data-waiting-container">
                        <img className="image-waiting-successful" src={waitingImage} alt="waiting-data"></img>
                        <TitleComponent headerTitle={waitingTitle} typeTitle="sub-header" style={{ header: { fontSize: '18px' } }}></TitleComponent>
                        <div className="waiting-for-data-btn">
                            <Button
                                width="129px"
                                height="40px"
                                placeholder="Back"
                                colorType="black"
                                radiusType="circle"
                                backgroundColorType="white"
                                border="border: 1px solid #EBEBEB"
                                fontSize="14px"
                                fontWeight="bold"
                                marginBottom="3px"
                                onClick={() => {
                                    clearInterval(intervalStationDetails);
                                    screen(produceConsumeScreenEnum['DATA_SNIPPET']);
                                }}
                            />
                            <div className="waiting-for-data-space"></div>
                            <Button
                                width="129px"
                                height="40px"
                                placeholder="Skip"
                                colorType="black"
                                radiusType="circle"
                                backgroundColorType="white"
                                border="border: 1px solid #EBEBEB"
                                fontSize="14px"
                                fontWeight="bold"
                                marginBottom="3px"
                                onClick={() => {
                                    clearInterval(intervalStationDetails);
                                    getStartedDispatch({ type: 'SET_COMPLETED_STEPS', payload: getStartedState?.currentStep });
                                    getStartedDispatch({ type: 'SET_CURRENT_STEP', payload: getStartedState?.currentStep + 1 });
                                }}
                            />
                        </div>
                    </div>
                ) : isCopyToClipBoard === produceConsumeScreenEnum['DATA_RECIEVED'] ? (
                    <div className="successfully-container">
                        <img className="image-waiting-successful" src={SuccessfullyReceivedProduce} alt="successfully-received-produce"></img>
                        <TitleComponent headerTitle={successfullTitle} typeTitle="sub-header" style={{ header: { fontSize: '18px' } }}></TitleComponent>
                    </div>
                ) : (
                    <div>
                        <div className="installation">
                            <p>Installation</p>
                            <div className="install-copy">
                                <CopyBlock text={CODE_EXAMPLE[langSelected].installation} showLineNumbers={false} theme={atomOneLight} wrapLines={true} codeBlock />
                            </div>
                        </div>
                        <div className="code-example">
                            <p>{props.produce ? 'Procude data' : 'Consume data'}</p>
                            <div className="code-content">
                                <CopyBlock
                                    language={CODE_EXAMPLE[langSelected].langCode}
                                    text={props.produce ? codeExample.producer : codeExample.consumer}
                                    showLineNumbers={true}
                                    theme={atomOneLight}
                                    wrapLines={true}
                                    codeBlock
                                />
                            </div>
                        </div>
                    </div>
                )}
            </Form.Item>
        </Form>
    );
};

export default ProduceConsumeData;
