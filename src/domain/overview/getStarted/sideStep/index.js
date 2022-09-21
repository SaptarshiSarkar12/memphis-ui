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

import React from 'react';
import RightArrow from '../../../../assets/images/rightArrow.svg';
import './style.scss';
import Done from '../../../../assets/images/done.svg';
import GetStartedIcon from '../../../../assets/images/getStartedIcon.svg';
import AppUserIcon from '../../../../assets/images/usersIconActive.svg';
import EmptyStation from '../../../../assets/images/emptyStation.svg';
import DataProduced from '../../../../assets/images/dataProduced.svg';
import ConsumeDataImg from '../../../../assets/images/stationsIconActive.svg';
import FullStation from '../../../../assets/images/fullStation.svg';
import FinishFlag from '../../../../assets/images/finishFlag.svg';
import GrayAppUserIcon from '../../../../assets/images/grayAppUserIcon.svg';
import GrayProduceDataImg from '../../../../assets/images/grayProduceDataImg.svg';
import GrayConsumeDataImg from '../../../../assets/images/grayConsumeDataImg.svg';
import GrayfinishStep from '../../../../assets/images/grayFinish.svg';
import verticalLine from '../../../../assets/images/verticalLine.svg';
import CompletedStep from '../../../../assets/images/completedStep.svg';
import purpleVerticalLine from '../../../../assets/images/purpleVerticalLine.svg';

const SideStep = (props) => {
    const { stepNumber, stepName, currentStep, completedSteps } = props;

    const getDocLink = () => {
        switch (stepNumber) {
            case 1:
                return 'https://docs.memphis.dev/memphis-new/memphis/concepts/station';
            case 2:
                return 'https://docs.memphis.dev/memphis-new/memphis/concepts/station';
            case 3:
                return 'https://docs.memphis.dev/memphis-new/memphis/concepts/producer';
            case 4:
                return 'https://docs.memphis.dev/memphis-new/memphis/concepts/consumer';
            default:
                return;
        }
    };
    const getIcon = () => {
        switch (stepNumber) {
            case 1:
                return <img className="sidebar-image" src={GetStartedIcon} alt={GetStartedIcon}></img>;
            case 2:
                return completedSteps + 1 >= stepNumber ? (
                    <img className="sidebar-image" src={AppUserIcon} alt={GetStartedIcon}></img>
                ) : (
                    <img className="sidebar-image" src={GrayAppUserIcon} alt={GetStartedIcon}></img>
                );
            case 3:
                if (completedSteps + 1 > stepNumber) return <img className="sidebar-image" src={DataProduced} alt={GetStartedIcon}></img>;
                else if (completedSteps + 1 === stepNumber) return <img className="sidebar-image" src={EmptyStation} alt={GetStartedIcon}></img>;
                else return <img className="sidebar-image" src={GrayProduceDataImg} alt={GetStartedIcon}></img>;
            case 4:
                if (completedSteps + 1 > stepNumber) return <img className="sidebar-image" src={ConsumeDataImg} alt={GetStartedIcon}></img>;
                else if (completedSteps + 1 === stepNumber) return <img className="sidebar-image" src={FullStation} alt={GetStartedIcon}></img>;
                else return <img className="sidebar-image" src={GrayConsumeDataImg} alt={GetStartedIcon}></img>;
            case 5:
                return completedSteps + 1 >= stepNumber ? (
                    <img className="sidebar-image" src={FinishFlag} alt={GetStartedIcon}></img>
                ) : (
                    <img className="sidebar-image" src={GrayfinishStep} alt={GetStartedIcon}></img>
                );
            default:
                return;
        }
    };
    return (
        <div
            className={completedSteps + 1 >= stepNumber ? 'side-step-container cursor-allowed' : 'side-step-container'}
            onClick={() => completedSteps + 1 >= stepNumber && props.onSideBarClick(stepNumber)}
        >
            <div className="img-side">
                {getIcon()}
                {completedSteps >= stepNumber && stepNumber != 5 && (
                    <img className="line-image" src={completedSteps >= stepNumber && stepNumber != 5 ? purpleVerticalLine : verticalLine} alt={verticalLine}></img>
                )}
                {completedSteps < stepNumber && stepNumber != 5 && <img className="line-image" src={verticalLine} alt={verticalLine}></img>}
            </div>
            <div className="data-side">
                <div className="step-name-completed">
                    <p className={currentStep === stepNumber ? 'step-name curr-step-name' : 'step-name'}>{stepName}</p>
                    {completedSteps >= stepNumber && stepNumber != 5 && <img className="completed" src={CompletedStep} alt={verticalLine}></img>}
                </div>
                {stepNumber != 5 && (
                    <p className={currentStep === stepNumber ? 'step-description curr-step-name' : 'step-description'}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.{' '}
                        <a href={getDocLink()} target="_blank" rel="noopener noreferrer">
                            Learn more
                        </a>
                    </p>
                )}
            </div>
        </div>
    );
};
export default SideStep;
