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

import React, { useEffect } from 'react';
import { Modal } from 'antd';

import Button from '../button';

const TransitionsModal = (props) => {
    const { height, width, rBtnText, lBtnText, rBtnDisabled, lBtnDisabled, header, isLoading, open = false, displayButtons = true } = props;

    const contentStyle = {
        height: height,
        overflowY: 'auto'
    };

    return (
        <Modal
            wrapClassName={'modal-wrapper'}
            title={header}
            visible={open}
            width={width}
            onCancel={() => props.clickOutside()}
            bodyStyle={contentStyle}
            centered
            destroyOnClose={true}
            footer={
                displayButtons
                    ? [
                          <div key="left" className="btnContainer">
                              <button className="cancel-button" disabled={lBtnDisabled} onClick={() => props.lBtnClick()}>
                                  {lBtnText}
                              </button>
                              <Button
                                  className="modal-btn"
                                  width="83px"
                                  height="32px"
                                  placeholder={rBtnText}
                                  disabled={rBtnDisabled}
                                  colorType="white"
                                  radiusType="circle"
                                  backgroundColorType={'purple'}
                                  fontSize="12px"
                                  fontWeight="600"
                                  isLoading={isLoading}
                                  onClick={() => {
                                      props.rBtnClick();
                                  }}
                              />
                          </div>
                      ]
                    : null
            }
        >
            {props.children}
        </Modal>
    );
};

export default TransitionsModal;
