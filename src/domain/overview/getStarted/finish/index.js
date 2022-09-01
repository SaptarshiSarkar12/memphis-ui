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

import React, { useContext, useEffect } from 'react';
import Button from '../../../../components/button';
import docsLogo from '../../../../assets/images/docsLogo.svg';
import GithubLogo from '../../../../assets/images/githubLogo.svg';
import discordLogo from '../../../../assets/images/discordLogo.svg';
import { Link, useHistory } from 'react-router-dom';
import { GetStartedStoreContext } from '..';
import pathDomains from '../../../../router';
import { ApiEndpoints } from '../../../../const/apiEndpoints';
import { httpRequest } from '../../../../services/http';

const Finish = (props) => {
    const { createStationFormRef } = props;

    const history = useHistory();
    const [getStartedState, getStartedDispatch] = useContext(GetStartedStoreContext);

    useEffect(() => {
        createStationFormRef.current = onNext;
    }, []);

    const onNext = () => {
        doneNextSteps();
        window.location.reload(false);
    };

    const onFinish = (e) => {
        e.preventDefault();
        doneNextSteps();
        history.push(`${pathDomains.factoriesList}/${getStartedState.factoryName}/${getStartedState.stationName}`);
    };

    const doneNextSteps = async () => {
        try {
            await httpRequest('POST', ApiEndpoints.DONE_NEXT_STEPS);
        } catch (error) {}
    };

    return (
        <div className="finish-container">
            <div className="container-icons-finish">
                <Button
                    width="192px"
                    height="42px"
                    placeholder="Go to station"
                    radiusType="circle"
                    backgroundColorType="white"
                    fontSize="16px"
                    fontWeight="bold"
                    border="1px solid #EEEEEE"
                    borderRadius="31px"
                    boxShadowStyle="none"
                    onClick={(e) => {
                        onFinish(e);
                    }}
                />
                <p className="link-finish-header">Link to our channels</p>
                <Link
                    className="icon-image"
                    to={{ pathname: 'https://app.gitbook.com/o/-MSyW3CRw3knM-KGk6G6/s/t7NJvDh5VSGZnmEsyR9h/getting-started/1-installation' }}
                    target="_blank"
                >
                    <img src={docsLogo} width="25px" height="25px" alt="slack-icon"></img>
                </Link>
                <Link className="icon-image" to={{ pathname: 'https://github.com/memphisdev' }} target="_blank">
                    <img src={GithubLogo} width="25px" height="25px" alt="github-icon"></img>
                </Link>
                <Link className="icon-image" to={{ pathname: 'https://discord.com/invite/WZpysvAeTf' }} target="_blank">
                    <img src={discordLogo} width="25px" height="25px" alt="discord_icon"></img>
                </Link>
            </div>
        </div>
    );
};

export default Finish;
