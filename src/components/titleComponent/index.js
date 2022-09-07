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

import Lottie from 'lottie-react';
import React from 'react';

const TitleComponent = (props) => {
    const { headerTitle, typeTitle = 'header', headerDescription, style, img, finish, required } = props;

    return (
        <div className="title-container" style={style?.container}>
            {typeTitle === 'header' && (
                <div className={finish ? 'header-title-container-finish' : 'header-title-container'}>
                    {finish ? (
                        <Lottie style={style?.image} animationData={img} loop={true} />
                    ) : (
                        <img className="header-image" src={img} alt={img} style={style?.image}></img>
                    )}

                    <label className="header-title" style={style?.header}>
                        {headerTitle}
                    </label>
                </div>
            )}
            {typeTitle === 'sub-header' && (
                <p className="sub-header-title" style={style?.header}>
                    {required && <span>* </span>}
                    {headerTitle}
                </p>
            )}
            <p className="header-description" style={style?.description}>
                {headerDescription}
            </p>
        </div>
    );
};

export default TitleComponent;
