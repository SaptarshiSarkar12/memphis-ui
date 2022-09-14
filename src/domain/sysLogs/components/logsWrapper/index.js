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

import { useState, useMemo, useRef, useEffect, useCallback, useContext } from 'react';
import { Virtuoso } from 'react-virtuoso';
import Lottie from 'lottie-react';

import searchIcon from '../../../../assets/images/searchIcon.svg';
import animationData from '../../../../assets/lotties/MemphisGif.json';
import { ApiEndpoints } from '../../../../const/apiEndpoints';
import SearchInput from '../../../../components/searchInput';
import { httpRequest } from '../../../../services/http';
import { Context } from '../../../../hooks/store';
import LogPayload from '../logPayload';
import LogContent from '../logContent';

const LogsWrapper = () => {
    const [state, dispatch] = useContext(Context);
    const [displayedLog, setDisplayedLog] = useState({});
    const [selectedRow, setSelectedRow] = useState(null);
    const [visibleRange, setVisibleRange] = useState({
        startIndex: 0,
        endIndex: 0
    });
    const [logs, setLogs] = useState(() => []);
    const [seqNum, setSeqNum] = useState(-1);
    const [stopLoad, setStopLoad] = useState(false);
    const [socketOn, setSocketOn] = useState(false);

    const stateRef = useRef([]);
    stateRef.current = [seqNum, visibleRange, socketOn];

    const getLogs = async () => {
        try {
            const data = await httpRequest('GET', `${ApiEndpoints.GET_SYS_LOGS}?log_type=all&start_index=${stateRef.current[0]}`);
            if (stateRef.current[0] === -1) {
                setDisplayedLog(data.logs[0]);
                setSelectedRow(data.logs[0].message_seq);
            }
            let num = data.logs[data.logs.length - 1].message_seq;
            if (num === stateRef.current[0]) {
                setStopLoad(true);
            }
            setSeqNum(num);
            setLogs((users) => [...users, ...data.logs]);
        } catch (error) {}
    };

    const loadMore = useCallback(() => {
        return setTimeout(() => {
            getLogs();
        }, 200);
    }, []);

    useEffect(() => {
        const timeout = loadMore();
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (stateRef.current[2]) {
            if (stateRef.current[1].startIndex !== 0) {
                stopListen();
            } else {
                startListen();
            }
        }
        return () => {};
    }, [stateRef.current[1]]);

    const startListen = () => {
        setTimeout(() => {
            state.socket?.emit('register_syslogs_data');
        }, 2000);
    };

    const stopListen = () => {
        state.socket?.emit('deregister');
    };

    useEffect(() => {
        state.socket?.on('syslogs_data', (data) => {
            setSocketOn(true);
            if (data) {
                setLogs(data.logs);
            }
        });
        startListen();

        return () => {
            stopListen();
        };
    }, [state.socket]);

    const selsectLog = (key) => {
        setSelectedRow(key);
        setDisplayedLog(logs.find((log) => log.message_seq === key));
    };

    return (
        <div className="logs-wrapper">
            <logs is="3xd">
                <list-header is="3xd">
                    <p className="header-title">Latest Logs</p>
                    {/* {logs?.length > 0 && (
                        <SearchInput
                            placeholder="Search log..."
                            placeholderColor="red"
                            width="calc(100% - 30px)"
                            height="37px"
                            borderRadiusType="semi-round"
                            backgroundColorType="gray-dark"
                            iconComponent={<img src={searchIcon} />}
                            // onChange={handleSearch}
                            // value={searchInput}
                        />
                    )} */}
                </list-header>
                <Virtuoso
                    data={logs}
                    rangeChanged={setVisibleRange}
                    className="logsl"
                    endReached={!stopLoad ? loadMore : null}
                    overscan={100}
                    itemContent={(index, log) => (
                        <div className={index % 2 === 0 ? 'even' : 'odd'}>
                            <LogPayload selectedRow={selectedRow} value={log} onSelected={(e) => selsectLog(e)} />
                        </div>
                    )}
                    components={!stopLoad ? { Footer } : {}}
                />
                {logs?.length > 0 &&
                    logs?.map((value, index) => {
                        return;
                    })}
            </logs>
            <LogContent displayedLog={displayedLog} />
        </div>
    );
};

export default LogsWrapper;

const Footer = () => {
    return (
        <div
            style={{
                padding: '2rem',
                display: 'flex',
                justifyContent: 'center',
                height: '10vw',
                width: '10vw'
            }}
        >
            <Lottie animationData={animationData} loop={true} />
        </div>
    );
};
