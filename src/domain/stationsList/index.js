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

import React, { useEffect, useContext, useState, useRef, useCallback, Fragment } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditOutlined from '@material-ui/icons/EditOutlined';
import { useHistory } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';

import CreateStationDetails from '../../components/createStationDetails';
import { ApiEndpoints } from '../../const/apiEndpoints';
import StationBoxOverview from './stationBoxOverview';
import emptyList from '../../assets/images/emptyList.svg';
import { httpRequest } from '../../services/http';
import Button from '../../components/button';
import { Context } from '../../hooks/store';
import Modal from '../../components/modal';
import SearchInput from '../../components/searchInput';
import pathDomains from '../../router';
import Loader from '../../components/loader';
import { SOCKET_URL } from '../../config';
import { LOCAL_STORAGE_TOKEN } from '../../const/localStorageConsts';
import { parsingDate } from '../../services/valueConvertor';

const StationsList = () => {
    const url = window.location.href;
    // const urlfactoryName = url.split('factories/')[1].split('/')[0];
    const history = useHistory();
    const botId = 1;

    const [state, dispatch] = useContext(Context);
    const [editName, seteditName] = useState(false);
    const [editDescription, seteditDescription] = useState(false);
    const [modalIsOpen, modalFlip] = useState(false);
    const [factoryDetails, setFactoryDetails] = useState();
    const [factoryName, setFactoryName] = useState('');
    const [stationsList, setStationList] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [factoryDescription, setFactoryDescription] = useState('');
    const [isLoading, setisLoading] = useState(false);
    const createStationRef = useRef(null);
    const [parseDate, setParseDate] = useState('');
    const [botUrl, SetBotUrl] = useState('');

    // const getFactoryDetails = async () => {
    //     setisLoading(true);
    //     try {
    //         const data = await httpRequest('GET', `${ApiEndpoints.GEL_FACTORY}?factory_name=${urlfactoryName}`);
    //         setBotImage(data.user_avatar_id || botId);
    //         setParseDate(parsingDate(data.creation_date));
    //         setFactoryDetails(data);
    //         setFactoryName(data.name);
    //         setFactoryDescription(data.description);
    //         setisLoading(false);
    //     } catch (error) {
    //         setisLoading(false);
    //         if (error.status === 404) {
    //             history.push(pathDomains.factoriesList);
    //         }
    //     }
    // };

    useEffect(() => {
        dispatch({ type: 'SET_ROUTE', payload: 'stations' });
        getAllStations();
    }, []);

    const getAllStations = async () => {
        try {
            const res = await httpRequest('GET', `${ApiEndpoints.GET_ALL_STATIONS}`);
            setStationList(res);
        } catch (err) {
            return;
        }
    };

    const handleSearch = (e) => {
        setSearchInput(e.target.value);
    };

    // const handleRegisterToFactory = useCallback(
    //     (factoryName) => {
    //         state.socket?.emit('register_factory_overview_data', factoryName);
    //     },
    //     [state.socket]
    // );

    // useEffect(() => {
    //     // state.socket?.on(`factory_overview_data_${urlfactoryName}`, (data) => {
    //     //     setBotImage(data.user_avatar_id || botId);
    //     //     setParseDate(parsingDate(data.creation_date));
    //     //     // setFactoryDetails(data);
    //     // });

    //     // state.socket?.on('error', (error) => {
    //     //     history.push(pathDomains.stations);
    //     // });

    //     // setTimeout(() => {
    //     //     handleRegisterToFactory(urlfactoryName);
    //     // }, 1000);

    //     return () => {
    //         state.socket?.emit('deregister');
    //     };
    // }, [state.socket]);

    // const handleEditName = useCallback(() => {
    //     state.socket?.emit('deregister');
    //     seteditName(true);
    // }, [state.socket]);

    // const handleEditDescription = useCallback(() => {
    //     state.socket?.emit('deregister');
    //     seteditDescription(true);
    // }, [state.socket]);

    // const handleEditNameBlur = async (e) => {
    //     if (!e.target.value || e.target.value === factoryDetails.name || e.target.value === '') {
    //         setFactoryName(factoryDetails.name);
    //         handleRegisterToFactory(factoryDetails.name);
    //         seteditName(false);
    //     } else {
    //         try {
    //             await httpRequest('PUT', ApiEndpoints.EDIT_FACTORY, {
    //                 factory_name: factoryDetails.name,
    //                 factory_new_name: e.target.value
    //             });
    //             handleRegisterToFactory(e.target.value);
    //             setFactoryDetails({ ...factoryDetails, name: e.target.value });
    //             seteditName(false);
    //             history.push(`${pathDomains.factoriesList}/${e.target.value}`);
    //         } catch (err) {
    //             setFactoryName(factoryDetails.name);
    //         }
    //     }
    // };

    // const handleEditNameChange = (e) => {
    //     setFactoryName(e.target.value);
    // };

    // const handleEditDescriptionBlur = async (e) => {
    //     if (e.target.value === factoryDetails.description) {
    //         handleRegisterToFactory(factoryName);
    //         seteditDescription(false);
    //     } else {
    //         try {
    //             await httpRequest('PUT', ApiEndpoints.EDIT_FACTORY, {
    //                 factory_name: factoryDetails.name,
    //                 factory_new_description: e.target.value
    //             });
    //             setFactoryDetails({ ...factoryDetails, description: e.target.value });
    //             seteditDescription(false);
    //         } catch (err) {
    //             setFactoryDescription(factoryDetails.description);
    //         }
    //     }
    // };

    // const handleEditDescriptionChange = (e) => {
    //     setFactoryDescription(e.target.value);
    // };

    const removeStation = async (stationName) => {
        // const updatedStationList = factoryDetails?.stations.filter((item) => item.name !== stationName);
        // setFactoryDetails({ ...factoryDetails, stations: updatedStationList });
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
                        aria-controls="usecse-menu"
                        aria-haspopup="true"
                        onClick={() => modalFlip(true)}
                    />
                </div>
            </div>
            <div className="stations-content">
                {stationsList?.length > 0 &&
                    stationsList?.map((station, key) => <StationBoxOverview key={station.id} station={station} removeStation={() => removeStation(station.name)} />)}
            </div>
        </div>
    );
    // <div className="factory-details-container">
    //     {isLoading && (
    //         <div className="loader-uploading">
    //             <Loader />
    //         </div>
    //     )}
    //     {!isLoading && (
    //         <Fragment>
    //             <div className="factory-details-header">
    //                 <div className="left-side">
    //                     <h1 class="main-header-h1">Stations ({factoryDetails?.stations?.length || 0})</h1>
    //                 </div>
    //                 <div className="right-side">
    //                     <Button
    //                         className="modal-btn"
    //                         width="150px"
    //                         height="36px"
    //                         placeholder="Create a station"
    //                         colorType="white"
    //                         radiusType="circle"
    //                         backgroundColorType="purple"
    //                         fontSize="14px"
    //                         fontWeight="bold"
    //                         aria-controls="usecse-menu"
    //                         aria-haspopup="true"
    //                         onClick={() => modalFlip(true)}
    //                     />
    //                 </div>
    //             </div>
    //             <div className="stations-content">
    //                 {/* {factoryDetails?.stations?.length > 0 &&
    //                     factoryDetails?.stations?.map((station, key) => (
    //                         <StationBoxOverview key={station.id} station={station} removeStation={() => removeStation(station.name)} />
    //                     ))} */}
    //                 {/* {!isLoading && factoryDetails?.stations.length === 0 && (
    //                     <div className="no-station-to-display">
    //                         <img src={emptyList} width="100" height="100" alt="emptyList" />
    //                         <p>There are no stations yet</p>
    //                         <p className="sub-title">Get started by creating a station</p>
    //                         <Button
    //                             className="modal-btn"
    //                             width="240px"
    //                             height="50px"
    //                             placeholder="Create your first station"
    //                             colorType="white"
    //                             radiusType="circle"
    //                             backgroundColorType="purple"
    //                             fontSize="12px"
    //                             fontWeight="600"
    //                             aria-controls="usecse-menu"
    //                             aria-haspopup="true"
    //                             onClick={() => modalFlip(true)}
    //                         />
    //                     </div>
    //                 )} */}
    //             </div>
    //             <Modal
    //                 header="Your station details"
    //                 minHeight="550px"
    //                 minWidth="500px"
    //                 rBtnText="Add"
    //                 lBtnText="Cancel"
    //                 closeAction={() => modalFlip(false)}
    //                 lBtnClick={() => {
    //                     modalFlip(false);
    //                 }}
    //                 clickOutside={() => modalFlip(false)}
    //                 rBtnClick={() => {
    //                     createStationRef.current();
    //                 }}
    //                 open={modalIsOpen}
    //             >
    //                 {/* <CreateStationDetails createStationRef={createStationRef} factoryName={factoryName} /> */}
    //             </Modal>
    //         </Fragment>
    //     )}
    // </div>
    // );
};

export default StationsList;
