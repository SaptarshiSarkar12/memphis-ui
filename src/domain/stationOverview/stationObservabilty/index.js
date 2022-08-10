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

import React, { useContext, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';

import consumePoision from '../../../assets/lotties/consume_poision.json';
import consumeEmpty from '../../../assets/lotties/consume_empty.json';
import produceEmpty from '../../../assets/lotties/produce_empty.json';
import produce from '../../../assets/lotties/produce-many.json';
import consumer from '../../../assets/lotties/consume.json';
import ProduceConsumList from './ProduceConsumList';
import { StationStoreContext } from '..';
import Messages from './messages';

const StationObservabilty = () => {
    const [stationState, stationDispatch] = useContext(StationStoreContext);

    return (
        <div className="station-observabilty-container">
            <ProduceConsumList producer={true} />
            <div className="thunnel-from-sub">
                {stationState?.stationSocketData?.connected_producers?.length === 0 && <Lottie animationData={produceEmpty} loop={true} />}
                {stationState?.stationSocketData?.connected_producers?.length > 0 && <Lottie animationData={produce} loop={true} />}
            </div>
            <Messages />
            <div className="thunnel-to-pub">
                {stationState?.stationSocketData?.connected_cgs?.length === 0 && <Lottie animationData={consumeEmpty} loop={true} />}
                {stationState?.stationSocketData?.connected_cgs?.length > 0 && stationState?.stationSocketData?.poison_messages?.length > 0 && (
                    <Lottie animationData={consumePoision} loop={true} />
                )}
                {stationState?.stationSocketData?.connected_cgs?.length > 0 && stationState?.stationSocketData?.poison_messages?.length === 0 && (
                    <Lottie animationData={consumer} loop={true} />
                )}
            </div>
            <ProduceConsumList producer={false} />
        </div>
    );
};

export default StationObservabilty;
