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

import React, { useContext, useEffect, useState } from 'react';
import { CODE_EXAMPLE } from '../../../../const/SDKExample';
import WaitingConsumeData from '../../../../assets/images/waitingConsumeData.svg';
import consWaiting from '../../../../assets/lotties/consWaiting.json';
import ProduceConsumeData, { produceConsumeScreenEnum } from '../produceConsumeData';
import { GetStartedStoreContext } from '..';

const ConsumeData = (props) => {
    const { createStationFormRef } = props;
    const [getStartedState, getStartedDispatch] = useContext(GetStartedStoreContext);
    const [displayScreen, setDisplayScreen] = useState();
    const selectLngOption = ['Go', 'Node.js', 'Python'];

    const onNext = () => {
        if (displayScreen === produceConsumeScreenEnum['DATA_SNIPPET']) {
            setDisplayScreen(produceConsumeScreenEnum['DATA_WAITING']);
        } else {
            getStartedDispatch({ type: 'SET_COMPLETED_STEPS', payload: getStartedState?.currentStep });
            getStartedDispatch({ type: 'SET_CURRENT_STEP', payload: getStartedState?.currentStep + 1 });
        }
    };

    useEffect(() => {
        createStationFormRef.current = onNext;
    }, [displayScreen]);

    useEffect(() => {
        setDisplayScreen(produceConsumeScreenEnum['DATA_SNIPPET']);
    }, []);

    return (
        <ProduceConsumeData
            waitingImage={consWaiting}
            waitingTitle={'We are waiting for a consumer to consume data'}
            successfullTitle={'Start to receive messages.'}
            languages={selectLngOption}
            activeData={'connected_cgs'}
            dataName={'consumer_app'}
            displayScreen={displayScreen}
            consume
            screen={(e) => setDisplayScreen(e)}
        ></ProduceConsumeData>
    );
};

export default ConsumeData;
