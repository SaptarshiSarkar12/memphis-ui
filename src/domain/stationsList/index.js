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

import React, { useEffect, useContext, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';

import { ApiEndpoints } from '../../const/apiEndpoints';
import StationBoxOverview from './stationBoxOverview';
import { httpRequest } from '../../services/http';
import Button from '../../components/button';
import { Context } from '../../hooks/store';
import SearchInput from '../../components/searchInput';
import pathDomains from '../../router';
import { parsingDate } from '../../services/valueConvertor';

const StationsList = () => {
    const history = useHistory();
    const botId = 1;

    const [state, dispatch] = useContext(Context);
    const [modalIsOpen, modalFlip] = useState(false);
    const [stationsList, setStationList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [parseDate, setParseDate] = useState('');
    const [botUrl, SetBotUrl] = useState('');
    const [botImage, setBotImage] = useState('');

    useEffect(() => {
        dispatch({ type: 'SET_ROUTE', payload: 'stations' });
        getAllStations();
    }, []);

    useEffect(() => {
        setFilteredList(stationsList.filter((station) => station.station.name.startsWith(searchInput)));
    }, [searchInput]);

    useEffect(() => {
        if (stationsList?.length > 0) {
            if (searchInput !== '') {
                setFilteredList(stationsList.filter((station) => station.station.name.startsWith(searchInput)));
            } else setFilteredList(stationsList);
        }
    }, [stationsList]);

    const getAllStations = async () => {
        try {
            const res = await httpRequest('GET', `${ApiEndpoints.GET_STATIONS}`);
            setStationList(res.stations);
        } catch (err) {
            return;
        }
    };

    const handleSearch = (e) => {
        setSearchInput(e.target.value);
    };

    const handleRegisterToStation = useCallback(() => {
        state.socket?.emit('get_all_stations_data');
    }, [state.socket]);

    useEffect(() => {
        state.socket?.on(`all_stations_data_`, (data) => {
            setBotImage(data.user_avatar_id || botId);
            setParseDate(parsingDate(data.creation_date));
            setStationList(data);
        });

        state.socket?.on('error', (error) => {
            history.push(pathDomains.overview);
        });

        setTimeout(() => {
            handleRegisterToStation();
        }, 1000);

        return () => {
            state.socket?.emit('deregister');
        };
    }, [state.socket]);

    const removeStation = async (stationName) => {
        try {
            await httpRequest('DELETE', ApiEndpoints.REMOVE_STATION, {
                station_name: stationName
            });
            setStationList(stationsList.filter((station) => station.station.name !== stationName));
        } catch (error) {
            return;
        }
    };

    return (
        <div className="factory-details-container">
            <div className="factory-details-header">
                <div className="left-side">
                    <label class="main-header-h1">
                        Stations <label class="num-stations">({stationsList?.length || 0})</label>
                    </label>
                </div>
                <div className="right-side">
                    <SearchInput
                        placeholder="Search Stations"
                        colorType="navy"
                        backgroundColorType="none"
                        width="180px"
                        height="36px"
                        borderRadiusType="circle"
                        borderColorType="gray"
                        boxShadowsType="gray"
                        iconComponent={<SearchOutlined />}
                        onChange={handleSearch}
                        value={searchInput}
                    />
                    <Button
                        className="modal-btn"
                        width="180px"
                        height="36px"
                        placeholder="Create New Station"
                        colorType="white"
                        radiusType="circle"
                        backgroundColorType="purple"
                        fontSize="14px"
                        fontWeight="bold"
                        marginLeft="15px"
                        aria-controls="usecse-menu"
                        aria-haspopup="true"
                        onClick={() => modalFlip(true)}
                    />
                </div>
            </div>
            <div className="stations-content">
                {stationsList?.length > 0 &&
                    filteredList?.map((station) => (
                        <StationBoxOverview key={station.station.id} station={station} removeStation={() => removeStation(station.station.name)} />
                    ))}
            </div>
        </div>
    );
};

export default StationsList;
