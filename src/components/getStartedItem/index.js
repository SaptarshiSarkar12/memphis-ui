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

import React, { useContext } from 'react';

import { GetStartedStoreContext } from '../../domain/overview/getStarted';
import TitleComponent from '../titleComponent';
import Button from '../button';

const GetStartedItem = (props) => {
    const { headerImage, headerTitle, headerDescription, style, children, onNext, onBack } = props;
    const [getStartedState, getStartedDispatch] = useContext(GetStartedStoreContext);

    return (
        <div className="get-started-wrapper">
            <div className="get-started-top">
                <div className={getStartedState?.currentStep === 5 ? 'get-started-header finish' : 'get-started-header'}>
                    <TitleComponent
                        img={headerImage}
                        headerTitle={headerTitle}
                        headerDescription={headerDescription}
                        style={style}
                        finish={getStartedState?.currentStep === 5}
                    ></TitleComponent>
                </div>
                <div className="get-started-body">{children}</div>
            </div>
            <div className="get-started-footer">
                {!getStartedState.isHiddenButton && (
                    <>
                        <Button
                            width={getStartedState?.currentStep === 5 ? '190px' : '129px'}
                            height="36px"
                            placeholder={getStartedState?.currentStep === 5 ? 'Launch Dashboard' : 'Next'}
                            colorType="white"
                            radiusType="circle"
                            backgroundColorType={'purple'}
                            fontSize="16px"
                            fontWeight="bold"
                            htmlType="submit"
                            disabled={getStartedState?.nextDisable}
                            onClick={() => onNext()}
                            isLoading={getStartedState?.isLoading}
                        />
                        {getStartedState?.currentStep !== 1 && (
                            <Button
                                width={'129px'}
                                height="36px"
                                placeholder={'Back'}
                                colorType="white"
                                radiusType="circle"
                                backgroundColorType={'black'}
                                fontSize="16px"
                                fontWeight="bold"
                                htmlType="submit"
                                onClick={() => onBack()}
                                isLoading={getStartedState?.isLoading}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default GetStartedItem;
