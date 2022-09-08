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

import React, { useState, useContext, useEffect } from 'react';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import { useHistory } from 'react-router-dom';

import FunctionsOverview from '../../../components/functionsOverview';
import HealthyBadge from '../../../components/healthyBadge';
import HubMarketplace from '../../hubMarketplace';
import { Context } from '../../../hooks/store';
import pathDomains from '../../../router';
import { convertSecondsToDate } from '../../../services/valueConvertor';
import { ApiEndpoints } from '../../../const/apiEndpoints';
import Modal from '../../../components/modal';
import { parsingDate } from '../../../services/valueConvertor';
import { httpRequest } from '../../../services/http';
import OverflowTip from '../../../components/tooltip/overflowtip';
import retentionImg from '../../../assets/images/retention.svg';
import storageImg from '../../../assets/images/storage.svg';
import replicasImg from '../../../assets/images/replicas.svg';
import totalMsgImg from '../../../assets/images/total_msg.svg';
import poisonMsgImg from '../../../assets/images/poison_msg.svg';

const StationBoxOverview = (props) => {
    const [state, dispatch] = useContext(Context);
    const [modalIsOpen, modalFlip] = useState(false);
    const [functionModalIsOpen, functionModalFlip] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const history = useHistory();
    const [retentionValue, setRetentionValue] = useState('');

    useEffect(() => {
        switch (props.station.retention_type) {
            case 'message_age_sec':
                setRetentionValue(convertSecondsToDate(props.station.retention_value));
                break;
            case 'bytes':
                setRetentionValue(`${props.station.retention_value} bytes`);
                break;
            case 'messages':
                setRetentionValue(`${props.station.retention_value} messages`);
                break;
            default:
                break;
        }
    }, []);

    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const removeStation = async (stationName) => {
        try {
            await httpRequest('DELETE', ApiEndpoints.REMOVE_STATION, {
                station_name: stationName
            });
            props.removeStation();
        } catch (error) {}
    };

    return (
        <div className="station-box-container">
            <div className="left-section">
                <p className="station-name">{props.station.name}</p>
                <label className="data-labels">Created: {parsingDate(props.station.creation_date)}</label>
            </div>
            <div className="middle-section">
                <div className="station-created">
                    <label className="data-labels">Created by</label>
                    <OverflowTip text={props.station.created_by_user} width={'100px'}>
                        <p className="data-info">{props.station.created_by_user}</p>
                    </OverflowTip>
                </div>
                <div>
                    <label className="data-labels">Tags</label>
                    <p className="data-info">tags here...</p>
                </div>
            </div>
            <div className="right-section">
                <div className="station-meta">
                    <img src={retentionImg} alt="retention" />
                    <label className="data-labels">Retention</label>
                    <p className="data-info">
                        <OverflowTip
                            text={
                                props.station.retention_type === 'message_age_sec' ? convertSecondsToDate(props.station.retention_value) : props.station.retention_value
                            }
                            width={'100px'}
                        >
                            {props.station.retention_type === 'message_age_sec' ? convertSecondsToDate(props.station.retention_value) : props.station.retention_value}{' '}
                            {props.station.retention_type !== 'message_age_sec' && props.station.retention_type}
                        </OverflowTip>
                    </p>
                </div>
                <div className="station-meta">
                    <img src={storageImg} alt="storage" />
                    <label className="data-labels">Storage Type</label>
                    <p className="data-info">{props.station.storage_type}</p>
                </div>
                <div className="station-meta">
                    <img src={replicasImg} alt="replicas" />
                    <label className="data-labels">Replicas</label>
                    <p className="data-info">{props.station.replicas}</p>
                </div>
                <div className="station-meta">
                    <img src={totalMsgImg} alt="total messages" />
                    <label className="data-labels">Total messages</label>
                    <p className="data-info">1000</p>
                </div>
                <div className="station-meta">
                    <img src={poisonMsgImg} alt="poison messages" />
                    <label className="data-labels">Poison messages</label>
                    <p className="data-info">10</p>
                </div>
            </div>
            <MoreVertIcon
                aria-controls="long-button"
                aria-haspopup="true"
                onClick={(e) => {
                    e.preventDefault();
                    handleClickMenu(e);
                }}
                className="threedots-menu"
            />
            <Popover id="long-menu" classes={{ paper: 'Menu c' }} anchorEl={anchorEl} onClose={handleCloseMenu} open={open}>
                <MenuItem
                    onClick={() => {
                        modalFlip(true);
                    }}
                >
                    <DeleteOutline className="menu-item-icon" />
                    <label id="e2e-tests-remove-stations" className="menu-item-label">
                        Remove
                    </label>
                </MenuItem>
            </Popover>
            <Modal
                header="Remove station"
                height="260px"
                minWidth="460px"
                rBtnText="Cancel"
                lBtnText="Remove"
                closeAction={() => modalFlip(false)}
                lBtnClick={() => {
                    removeStation(props.station.name);
                }}
                clickOutside={() => modalFlip(false)}
                rBtnClick={() => modalFlip(false)}
                open={modalIsOpen}
            >
                <label>
                    Are you sure you want to delete "<b>{props.station.name}</b>" station?
                </label>
                <br />
            </Modal>
        </div>
    );
    // <div className="station-box-container">
    {
        /* <HubMarketplace open={functionModalIsOpen} closeModal={() => functionModalFlip(false)} /> */
    }
    {
        /* <div className="station-box-header"> */
    }
    {
        /* <div className="info-fields"> */
    }
    {
        /* <OverflowTip text={props.station.name} width={'200px'}>
                        {props.station.name}
                    </OverflowTip> */
    }
    {
        /* {props.station.created_by_user}
                    {props.station.creation_date}
                    {props.station.retention_type}
                    {props.station.retention_value}
                    {props.station.storage_type}
                    {props.station.replicas} */
    }
    {
        /* <OverflowTip text={retentionValue} width={'200px'}>
                        {retentionValue}
                    </OverflowTip>

                    <OverflowTip text={props.station.storage_type} width={'70px'}>
                        {props.station.storage_type}
                    </OverflowTip>

                    <OverflowTip text={props.station.replicas} width={'50px'}>
                        {props.station.replicas}
                    </OverflowTip> */
    }
    {
        /* <div className="field-wrapper">
                        <h3>Max throughput: </h3>
                        <p>{props.station.max_throughput || 'not detected'}</p>
                    </div> */
    }
    // </div>
    {
        /* <div className="actions-side"> */
    }
    {
        /* <div className="hover-section"> */
    }
    {
        /* <div
                            className="action overview"
                            onClick={() => {
                                history.push(`${window.location.pathname}/${props.station.name}`);
                            }}
                        >
                            <p>Overview </p>
                        </div> */
    }
    {
        /* <div className="action edit">
                            <p onClick={() => functionModalFlip(true)}>Add functions</p>
                        </div> */
    }
    {
        /* </div> */
    }
    {
        /* <div className="action">
                        <HealthyBadge status={props.station.status || 'healthy'} />
                    </div> */
    }
    {
        /* <div className="action station-menu"> */
    }
    {
        /* <MoreVertIcon
                            aria-controls="long-button"
                            aria-haspopup="true"
                            onClick={(e) => {
                                e.preventDefault();
                                handleClickMenu(e);
                            }}
                            className="threedots-menu"
                        /> */
    }
    {
        /* <Popover id="long-menu" classes={{ paper: 'Menu c' }} anchorEl={anchorEl} onClose={handleCloseMenu} open={open}>
                            <MenuItem
                                onClick={() => {
                                    modalFlip(true);
                                }}
                            >
                                <DeleteOutline className="menu-item-icon" />
                                <label id="e2e-tests-remove-stations" className="menu-item-label">
                                    Remove
                                </label>
                            </MenuItem>
                        </Popover> */
    }
    {
        /* </div> */
    }
    {
        /* </div> */
    }
    {
        /* </div> */
    }
    {
        /* {props.station.functions.length !== 0 && (
                <div className="functions-overview">
                    <FunctionsOverview functions={props.station.functions} horizontal={true} editable={false}></FunctionsOverview>
                </div>
            )} */
    }
    {
        /* <Modal
                header="Remove station"
                height="160px"
                rBtnText="Cancel"
                lBtnText="Remove"
                lBtnClick={() => {
                    removeStation(props.station.name);
                }}
                clickOutside={() => modalFlip(false)}
                rBtnClick={() => modalFlip(false)}
                open={modalIsOpen}
            >
                <label>
                    Are you sure you want to delete "<b>{props.station.name}</b>" station?
                </label>
                <br />
            </Modal> */
    }
    // </div>
    // );
};

export default StationBoxOverview;
