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
import stationsIcon from '../../assets/images/stationIcon.svg';
import StationsInstructions from '../../components/stationsInstructions';

const StationsList = () => {
    const url = window.location.href;
    const history = useHistory();
    const botId = 1;

    const [state, dispatch] = useContext(Context);
    const [modalIsOpen, modalFlip] = useState(false);
    const [stationsList, setStationList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [isLoading, setisLoading] = useState(false);
    const createStationRef = useRef(null);
    const [parseDate, setParseDate] = useState('');
    const [botUrl, SetBotUrl] = useState('');
    const [botImage, setBotImage] = useState('');

    useEffect(() => {
        dispatch({ type: 'SET_ROUTE', payload: 'stations' });
        getAllStations();
    }, []);

    useEffect(() => {
        if (searchInput.length >= 2) setFilteredList(stationsList.filter((station) => station.station.name.startsWith(searchInput)));
        else setFilteredList(stationsList);
    }, [searchInput]);

    useEffect(() => {
        if (searchInput !== '' && searchInput.length >= 2) {
            setFilteredList(stationsList.filter((station) => station.station.name.startsWith(searchInput)));
        } else setFilteredList(stationsList);
    }, [stationsList]);

    const getAllStations = async () => {
        try {
            const res = await httpRequest('GET', `${ApiEndpoints.GET_STATIONS}`);
            setStationList(res.stations);
            setFilteredList(res.stations);
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
        state.socket?.on(`stations_overview_data`, (data) => {
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

    const renderStationsOverview = () => {
        if (stationsList?.length > 0) {
            if (stationsList?.length === 1) {
                return (
                    <div>
                        {filteredList?.map((station) => (
                            <StationBoxOverview key={station.station.id} station={station} removeStation={() => removeStation(station.station.name)} />
                        ))}
                        <StationsInstructions
                            header="Add more stations"
                            description="t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of
                                using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to usin"
                            button="Create New Station"
                        />
                    </div>
                );
            }
            return filteredList?.map((station) => (
                <StationBoxOverview key={station.station.id} station={station} removeStation={() => removeStation(station.station.name)} />
            ));
        }
        return (
            <StationsInstructions
                header="You don’t have any station yet?"
                description="t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of
                                using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to usin"
                button="Create New Station"
                image={stationsIcon}
            />
        );
    };

    return (
        <div className="factory-details-container">
            <div className="factory-details-header">
                <div className="left-side">
                    <label class="main-header-h1">
                        Stations <label class="num-stations">{stationsList?.length > 0 ? `(${stationsList?.length})` : null}</label>
                    </label>
                </div>
                <div className="right-side">
                    <SearchInput
                        placeholder="Search Stations"
                        placeholderColor="red"
                        width="280px"
                        height="37px"
                        borderRadiusType="circle"
                        backgroundColorType="#EBEDF0"
                        iconComponent={<SearchOutlined style={{ color: '#818C99', marginTop: '10px' }} />}
                        onChange={handleSearch}
                        value={searchInput}
                    />
                    <Button
                        className="modal-btn"
                        width="180px"
                        height="37px"
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
                {renderStationsOverview()}
            </div>
        </div>
    );
};

export default StationsList;
