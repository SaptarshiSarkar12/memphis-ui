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

import React from 'react';
import RightArrow from '../../../../assets/images/rightArrow.svg';
import './style.scss';
import Done from '../../../../assets/images/done.svg';

const SideStep = (props) => {
    const { stepNumber, stepName, currentStep, completedSteps } = props;
    return (
        <div
            className="side-step-container"
            style={{ backgroundColor: currentStep === stepNumber && '#F0EEFF', cursor: completedSteps + 1 >= stepNumber && 'pointer' }}
            onClick={() => completedSteps + 1 >= stepNumber && props.onSideBarClick(stepNumber)}
        >
            <div className="number-name-container">
                <div className="step-number-container" style={{ backgroundColor: currentStep >= stepNumber && 'white' }}>
                    {stepNumber <= completedSteps ? (
                        <div className="done-image">
                            <img src={Done} alt="done" />
                        </div>
                    ) : (
                        <p className="step-number">{stepNumber}</p>
                    )}
                </div>
                <p className="step-name" style={{ color: currentStep === stepNumber && '#2E2C34' }}>
                    {stepName}
                </p>
            </div>
            <div className="arrow-container">{currentStep === stepNumber && <img src={RightArrow} alt="select-arrow" />}</div>
        </div>
    );
};
export default SideStep;
