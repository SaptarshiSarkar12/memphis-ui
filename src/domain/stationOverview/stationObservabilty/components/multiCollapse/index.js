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
import { Collapse } from 'antd';

import CollapseArrow from '../../../../../assets/images/collapseArrow.svg';
import StatusIndication from '../../../../../components/indication';

const { Panel } = Collapse;

const MultiCollapse = ({ data, header, defaultOpen }) => {
    const [activeKey, setActiveKey] = useState(defaultOpen ? ['1'] : []);
    const [activeChiledKey, setActiveChiledKey] = useState();

    const onChange = (key) => {
        setActiveKey(key);
    };
    const onChiledChange = (key) => {
        setActiveChiledKey(key);
    };

    return (
        <>
            {header !== undefined ? (
                <Collapse ghost defaultActiveKey={activeKey} onChange={onChange} className="custom-collapse multi">
                    <Panel
                        showArrow={false}
                        collapsible={data?.length === 0 ? 'disabled' : null}
                        header={
                            <div className="collapse-header">
                                <p className="title">
                                    {header} <span className="consumer-number">{data?.length}</span>
                                </p>

                                <status is="x3d">
                                    <img className={activeKey[0] === '1' ? 'collapse-arrow open' : 'collapse-arrow close'} src={CollapseArrow} alt="collapse-arrow" />
                                </status>
                            </div>
                        }
                        key="1"
                    >
                        <Collapse ghost accordion={true} className="collapse-child" onChange={onChiledChange}>
                            {data?.length > 0 &&
                                data?.map((row, index) => {
                                    return (
                                        <Panel
                                            showArrow={false}
                                            header={
                                                <div className="collapse-header">
                                                    <p className="title">{row.name}</p>
                                                    <status is="x3d">
                                                        <StatusIndication is_active={row.is_active} is_deleted={row.is_deleted} />
                                                        <img
                                                            className={Number(activeChiledKey) === index ? 'collapse-arrow open' : 'collapse-arrow close'}
                                                            src={CollapseArrow}
                                                            alt="collapse-arrow"
                                                        />
                                                    </status>
                                                </div>
                                            }
                                            key={index}
                                        >
                                            {row.details?.length > 0 &&
                                                row.details?.map((row, index) => {
                                                    return (
                                                        <div className="panel-child" key={index}>
                                                            <content is="x3d" key={index}>
                                                                <p>{row.name}</p>
                                                                <span>{row.value}</span>
                                                            </content>
                                                        </div>
                                                    );
                                                })}
                                        </Panel>
                                    );
                                })}
                        </Collapse>
                    </Panel>
                </Collapse>
            ) : (
                <div className="custom-collapse multi">
                    <Collapse ghost accordion={true} className="collapse-child" onChange={onChiledChange}>
                        {data?.length > 0 &&
                            data?.map((row, index) => {
                                return (
                                    <Panel
                                        showArrow={false}
                                        header={
                                            <div className="collapse-header">
                                                <p className="title">{row.name}</p>
                                                <status is="x3d">
                                                    <StatusIndication is_active={row.is_active} is_deleted={row.is_deleted} />
                                                    <img
                                                        className={Number(activeChiledKey) === index ? 'collapse-arrow open' : 'collapse-arrow close'}
                                                        src={CollapseArrow}
                                                        alt="collapse-arrow"
                                                    />
                                                </status>
                                            </div>
                                        }
                                        key={index}
                                    >
                                        {row.details?.length > 0 &&
                                            row.details?.map((row, index) => {
                                                return (
                                                    <div className="panel-child" key={index}>
                                                        <content is="x3d" key={index}>
                                                            <p>{row.name}</p>
                                                            <span>{row.value}</span>
                                                        </content>
                                                    </div>
                                                );
                                            })}
                                    </Panel>
                                );
                            })}
                    </Collapse>
                </div>
            )}
        </>
    );
};

export default MultiCollapse;
