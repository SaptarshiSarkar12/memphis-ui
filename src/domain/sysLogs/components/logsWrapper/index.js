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

import React, { useEffect, useContext, useState } from 'react';
import LogContent from '../logContent';
import SearchInput from '../../../../components/searchInput';
import searchIcon from '../../../../assets/images/searchIcon.svg';
import LogPayload from '../logPayload';

const LogsWrapper = () => {
    const [displayedLog, setDisplayedLog] = useState({
        message_seq: 4,
        type: 'info',
        source: 'broker',
        data: '[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created[75123] 2022/09/13 18:00:55.235527 [INF] User hgdjh has been created\n\r\n',
        creation_date: '2022-09-13T18:00:55.235679+03:00'
    });

    const [selectedRow, setSelectedRow] = useState(4);

    const [logs, setLogs] = useState([
        {
            message_seq: 25,
            subject: '$memphis_syslogs.info',
            source: 'broker',
            data: '[78767] 2022/09/11 10:24:51.984982 [INF] User 888 has been created\n\r\n',
            creation_date: '2022-09-11T10:24:51.985425+03:00',
            size: 90
        },
        {
            message_seq: 24,
            subject: '$memphis_syslogs.info',
            source: 'broker',
            data: '[78767] 2022/09/11 10:24:48.921209 [INF] User 777 has been created\n\r\n',
            creation_date: '2022-09-11T10:24:48.922169+03:00',
            size: 90
        },
        {
            message_seq: 23,
            subject: '$memphis_syslogs.info',
            source: 'broker',
            data: '[78767] 2022/09/11 10:24:45.614357 [INF] User 666 has been created\n\r\n',
            creation_date: '2022-09-11T10:24:45.614475+03:00',
            size: 90
        },
        {
            message_seq: 22,
            subject: '$memphis_syslogs.info',
            source: 'broker',
            data: '[78767] 2022/09/11 10:24:42.448198 [INF] User 555 has been created\n\r\n',
            creation_date: '2022-09-11T10:24:42.448305+03:00',
            size: 90
        },
        {
            message_seq: 21,
            subject: '$memphis_syslogs.info',
            source: 'broker',
            data: '[78767] 2022/09/11 10:24:39.200084 [INF] User 444 has been created\n\r\n',
            creation_date: '2022-09-11T10:24:39.2002+03:00',
            size: 90
        },
        {
            message_seq: 20,
            subject: '$memphis_syslogs.info',
            source: 'broker',
            data: '[78767] 2022/09/11 10:24:35.706508 [INF] User 333 has been created\n\r\n',
            creation_date: '2022-09-11T10:24:35.706566+03:00',
            size: 90
        },
        {
            message_seq: 19,
            subject: '$memphis_syslogs.info',
            source: 'broker',
            data: '[78767] 2022/09/11 10:24:32.838019 [INF] User 222 has been created\n\r\n',
            creation_date: '2022-09-11T10:24:32.838156+03:00',
            size: 90
        },
        {
            message_seq: 18,
            subject: '$memphis_syslogs.info',
            source: 'broker',
            data: '[78767] 2022/09/11 10:24:30.077770 [INF] User 111 has been created\n\r\n',
            creation_date: '2022-09-11T10:24:30.077862+03:00',
            size: 90
        },
        {
            message_seq: 17,
            subject: '$memphis_syslogs.info',
            source: 'broker',
            data: '[78767] 2022/09/11 10:24:26.575023 [INF] User 9999 has been created\n\r\n',
            creation_date: '2022-09-11T10:24:26.575543+03:00',
            size: 91
        },
        {
            message_seq: 16,
            subject: '$memphis_syslogs.info',
            source: 'broker',
            data: '[78767] 2022/09/11 10:24:22.575562 [INF] User 8888 has been created\n\r\n',
            creation_date: '2022-09-11T10:24:22.575807+03:00',
            size: 91
        },
        {
            message_seq: 15,
            subject: '$memphis_syslogs.err',
            source: 'broker',
            data: '[78767] 2022/09/11 10:23:45.136250 [ERR] An error occured during a socket connection write: timeout\n\r\n',
            creation_date: '2022-09-11T10:23:45.136373+03:00',
            size: 122
        },
        {
            message_seq: 14,
            subject: '$memphis_syslogs.info',
            source: 'broker',
            data: '[78767] 2022/09/11 10:23:27.657631 [INF] User 7777 has been created\n\r\n',
            creation_date: '2022-09-11T10:23:27.658238+03:00',
            size: 91
        },
        {
            message_seq: 13,
            subject: '$memphis_syslogs.info',
            source: 'broker',
            data: '[78767] 2022/09/11 10:23:20.538689 [INF] User 6666 has been created\n\r\n',
            creation_date: '2022-09-11T10:23:20.5391+03:00',
            size: 91
        },
        {
            message_seq: 12,
            subject: '$memphis_syslogs.info',
            source: 'broker',
            data: '[78767] 2022/09/11 10:23:16.085332 [INF] User 5555 has been created\n\r\n',
            creation_date: '2022-09-11T10:23:16.085409+03:00',
            size: 91
        },
        {
            message_seq: 11,
            subject: '$memphis_syslogs.info',
            source: 'broker',
            data: '[78767] 2022/09/11 10:23:12.141640 [INF] User 4444 has been created\n\r\n',
            creation_date: '2022-09-11T10:23:12.141756+03:00',
            size: 91
        },
        {
            message_seq: 10,
            subject: '$memphis_syslogs.info',
            source: 'broker',
            data: '[78767] 2022/09/11 10:23:08.814865 [INF] User 3333 has been created\n\r\n',
            creation_date: '2022-09-11T10:23:08.814926+03:00',
            size: 91
        },
        {
            message_seq: 9,
            subject: '$memphis_syslogs.info',
            source: 'broker',
            data: '[78767] 2022/09/11 10:23:05.594378 [INF] User 2222 has been created\n\r\n',
            creation_date: '2022-09-11T10:23:05.594832+03:00',
            size: 91
        },
        {
            message_seq: 8,
            subject: '$memphis_syslogs.info',
            source: 'broker',
            data: '[78767] 2022/09/11 10:22:36.602056 [INF] Station ccc has been created\n\r\n',
            creation_date: '2022-09-11T10:22:36.602131+03:00',
            size: 93
        },
        {
            message_seq: 7,
            subject: '$memphis_syslogs.info',
            source: 'broker',
            data: '[78767] 2022/09/11 10:22:31.700418 [INF] Station bbb has been created\n\r\n',
            creation_date: '2022-09-11T10:22:31.700486+03:00',
            size: 93
        },
        {
            message_seq: 6,
            subject: '$memphis_syslogs.info',
            source: 'broker',
            data: '[78767] 2022/09/11 10:22:27.915114 [INF] Factory bbb has been created\n\r\n',
            creation_date: '2022-09-11T10:22:27.915183+03:00',
            size: 93
        },
        {
            message_seq: 5,
            subject: '$memphis_syslogs.info',
            source: 'broker',
            data: '[78767] 2022/09/11 10:22:22.252792 [INF] Station aaa has been created\n\r\n',
            creation_date: '2022-09-11T10:22:22.252902+03:00',
            size: 93
        },
        {
            message_seq: 4,
            subject: '$memphis_syslogs.info',
            source: 'broker',
            data: '[78767] 2022/09/11 10:22:16.552538 [INF] User 1111 has been created\n\r\n',
            creation_date: '2022-09-11T10:22:16.55264+03:00',
            size: 91
        },
        {
            message_seq: 3,
            subject: '$memphis_syslogs.info',
            source: 'broker',
            data: '[78767] 2022/09/11 10:22:11.518019 [INF] Factory 123123 has been created\n\r\n',
            creation_date: '2022-09-11T10:22:11.518935+03:00',
            size: 96
        },
        {
            message_seq: 2,
            subject: '$memphis_syslogs.info',
            source: 'broker',
            data: '[78767] 2022/09/11 09:40:49.539478 [INF] Memphis broker is ready, ENV: Docker\n\r\n',
            creation_date: '2022-09-11T09:40:49.53963+03:00',
            size: 101
        },
        {
            message_seq: 1,
            subject: '$memphis_syslogs.info',
            source: 'broker',
            data: '[78767] 2022/09/11 09:40:49.539478 [INF] Memphis broker is ready, ENV: Docker\nost:9000\nMemphis broker: localhost:6666 (client connections)\nMemphis broker: localhost:5555 (CLI connections)\nUI/CLI/SDK root username - root\nUI/CLI root password - memphis\nSDK connection token - memphis  \n\n**********\n\r\n',
            creation_date: '2022-09-11T09:40:49.539514+03:00',
            size: 319
        }
    ]);

    const selsectLog = (key) => {
        setSelectedRow(key);
        setDisplayedLog(logs.find((log) => log.message_seq === key));
    };

    return (
        <div className="logs-wrapper">
            <logs is="3xd">
                <list-header is="3xd">
                    <p className="header-title">
                        Latest Logs <label className="logs-length">{logs?.length > 0 && `(${logs?.length})`}</label>
                    </p>
                    {logs?.length > 0 && (
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
                    )}
                </list-header>
                <logsl is="3xd">
                    {logs?.length > 0 &&
                        logs?.map((value, index) => {
                            return <LogPayload selectedRow={selectedRow} value={value} onSelected={(e) => selsectLog(e)} />;
                        })}
                </logsl>
            </logs>
            <LogContent displayedLog={displayedLog} />
        </div>
    );
};

export default LogsWrapper;
