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

import React, { createContext, useEffect, useReducer, useRef } from 'react';
import CreateStationForm from './createStationForm';
import SideStep from './sideStep';
import './style.scss';
import CreateAppUser from './createAppUser';
import ConsumeData from './consumeData';
import Finish from './finish';
import Reducer from './hooks/reducer';
import ProduceData from './produceData';
import GetStartedItem from '../../../components/getStartedItem';
import GetStartedIcon from '../../../assets/images/getStartedIcon.svg';
import AppUserIcon from '../../../assets/images/usersIconActive.svg';
import ProduceDataImg from '../../../assets/images/produceData.svg';
import ConsumeDataImg from '../../../assets/images/consumeData.svg';
import ReadyToroll from '../../../assets/images/readyToRoll.svg';
import finishStep from '../../../assets/lotties/finishStep.json';
const steps = [{ stepName: 'Create Station' }, { stepName: 'Create App user' }, { stepName: 'Produce data' }, { stepName: 'Consume data' }, { stepName: 'Finish' }];

const finishStyle = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        // height: '73%',
        alignItems: 'center'
        // justifyContent: 'space-evenly'
    },
    header: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '24px',
        lineHeight: '29px',
        color: '#1D1D1D'
    },
    description: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '120%',
        textAlign: 'center',
        color: '#B4B4B4'
    },
    image: {
        width: '150px',
        height: '150px'
    }
};

const GetStarted = (props) => {
    const createStationFormRef = useRef(null);
    const [getStartedState, getStartedDispatch] = useReducer(Reducer);

    const SideStepList = () => {
        return steps.map((value, index) => {
            return (
                <SideStep
                    key={index}
                    currentStep={getStartedState?.currentStep}
                    stepNumber={index + 1}
                    stepName={value.stepName}
                    completedSteps={getStartedState?.completedSteps}
                    onSideBarClick={(e) => getStartedDispatch({ type: 'SET_CURRENT_STEP', payload: e })}
                />
            );
        });
    };

    const onNext = () => {
        createStationFormRef.current();
    };

    const onBack = () => {
        getStartedDispatch({ type: 'SET_CURRENT_STEP', payload: getStartedState?.currentStep - 1 });
    };

    useEffect(() => {
        getStartedDispatch({ type: 'SET_CURRENT_STEP', payload: 1 });
        getStartedDispatch({ type: 'SET_HIDDEN_BUTTON', payload: false });
        getStartedDispatch({ type: 'SET_COMPLETED_STEPS', payload: 0 });
        return;
    }, []);

    useEffect(() => {
        if (getStartedState?.currentStep !== 1) {
            getStartedDispatch({ type: 'SET_BACK_DISABLE', payload: false });
        } else {
            getStartedDispatch({ type: 'SET_BACK_DISABLE', payload: true });
        }
    }, [getStartedState?.currentStep]);

    return (
        <GetStartedStoreContext.Provider value={[getStartedState, getStartedDispatch]}>
            <div className="getstarted-container">
                <h1 className="getstarted-header">Let's get you started</h1>
                <p className="getstarted-header-description">Setup your account details to get more form the platform</p>
                <div className="sub-getstarted-container">
                    <div className="side-step">
                        <SideStepList />
                    </div>
                    <div className="getstarted-item">
                        {getStartedState?.currentStep === 1 && (
                            <GetStartedItem
                                headerImage={GetStartedIcon}
                                headerTitle="Create Station"
                                headerDescription="Station is the object that stores data"
                                onNext={onNext}
                                onBack={onBack}
                            >
                                <CreateStationForm createStationFormRef={createStationFormRef} />
                            </GetStartedItem>
                        )}
                        {getStartedState?.currentStep === 2 && (
                            <GetStartedItem
                                headerImage={AppUserIcon}
                                headerTitle="Create application user"
                                headerDescription="User of type application is for connecting apps"
                                onNext={onNext}
                                onBack={onBack}
                            >
                                <CreateAppUser createStationFormRef={createStationFormRef} />
                            </GetStartedItem>
                        )}
                        {getStartedState?.currentStep === 3 && (
                            <GetStartedItem
                                headerImage={ProduceDataImg}
                                headerTitle="Produce data"
                                headerDescription="Choose your preferred SDK, copy and paste the code to your IDE, and run your app to produce data to memphis station"
                                onNext={onNext}
                                onBack={onBack}
                            >
                                <ProduceData createStationFormRef={createStationFormRef} />
                            </GetStartedItem>
                        )}
                        {getStartedState?.currentStep === 4 && (
                            <GetStartedItem
                                headerImage={ConsumeDataImg}
                                headerTitle="Consume data"
                                headerDescription="Choose your preferred SDK, copy and paste the code to your IDE, and run your app to consume data from memphis station"
                                onNext={onNext}
                                onBack={onBack}
                            >
                                <ConsumeData createStationFormRef={createStationFormRef} />
                            </GetStartedItem>
                        )}
                        {getStartedState?.currentStep === 5 && (
                            <GetStartedItem
                                headerImage={finishStep}
                                headerTitle="You are ready to roll"
                                headerDescription="Congratulations - You’ve created your first broker app"
                                onNext={onNext}
                                onBack={onBack}
                                style={finishStyle}
                            >
                                <Finish createStationFormRef={createStationFormRef} />
                            </GetStartedItem>
                        )}
                    </div>
                </div>
            </div>
        </GetStartedStoreContext.Provider>
    );
};
export const GetStartedStoreContext = createContext({});
export default GetStarted;
