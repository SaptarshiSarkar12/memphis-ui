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

import React, { useEffect, useContext, useState } from 'react';

import { LOCAL_STORAGE_ALLOW_ANALYTICS, LOCAL_STORAGE_USER_NAME } from '../../../const/localStorageConsts';
import { LOCAL_STORAGE_AVATAR_ID } from '../../../const/localStorageConsts';
import Warning from '../../../assets/images/warning.svg';
import Button from '../../../components/button';
import { Context } from '../../../hooks/store';
import Input from '../../../components/Input';
import ImgLoader from './imgLoader';
import Bot1 from '../../../assets/images/bots/1.svg';
import Bot2 from '../../../assets/images/bots/2.svg';
import Bot3 from '../../../assets/images/bots/3.svg';
import pathDomains from '../../../router';
import { httpRequest } from '../../../services/http';
import { ApiEndpoints } from '../../../const/apiEndpoints';
import Modal from '../../../components/modal';
import Switcher from '../../../components/switcher';

function Profile() {
    const [userName, setUserName] = useState('');
    const [state, dispatch] = useContext(Context);
    const [avatar, setAvatar] = useState('1');
    const [open, modalFlip] = useState(false);
    const [allowAnalytics, setAllowAnalytics] = useState(false);

    useEffect(() => {
        setUserName(localStorage.getItem(LOCAL_STORAGE_USER_NAME));
        setAvatar(localStorage.getItem('profile_pic') || state?.userData?.avatar_id || Number(localStorage.getItem(LOCAL_STORAGE_AVATAR_ID))); // profile_pic is available only in sandbox env
        setAllowAnalytics(localStorage.getItem(LOCAL_STORAGE_ALLOW_ANALYTICS) === 'false' ? false : true);
    }, []);

    const removeMyUser = async () => {
        try {
            await httpRequest('DELETE', `${ApiEndpoints.REMOVE_MY_UER}`);
            modalFlip(false);
            localStorage.clear();
            window.location.assign(pathDomains.login);
        } catch (err) {
            return;
        }
    };

    const editAvatar = async (avatarId) => {
        try {
            const data = await httpRequest('PUT', `${ApiEndpoints.EDIT_AVATAR}`, { avatar_id: avatarId });
            setAvatar(data.avatar_id);
            localStorage.setItem(LOCAL_STORAGE_AVATAR_ID, data.avatar_id);
            dispatch({ type: 'SET_AVATAR_ID', payload: data.avatar_id });
        } catch (err) {
            return;
        }
    };

    const sendAnalytics = async (analyticsFlag) => {
        try {
            await httpRequest('PUT', `${ApiEndpoints.EDIT_ANALYTICS}`, { send_analytics: analyticsFlag });
            setAllowAnalytics(analyticsFlag);
            localStorage.setItem(LOCAL_STORAGE_ALLOW_ANALYTICS, analyticsFlag);
        } catch (err) {
            return;
        }
    };

    return (
        <div className="profile-container">
            <Modal
                header="Remove user"
                height="120px"
                rBtnText="Cancel"
                lBtnText="Remove"
                lBtnClick={() => {
                    removeMyUser();
                }}
                clickOutside={() => modalFlip(false)}
                rBtnClick={() => modalFlip(false)}
                open={open}
            >
                <label>Are you sure you want to remove user?</label>
                <br />
                <label>Please note that this action is irreversible.</label>
            </Modal>
            <div className="profile-sections company-logo">
                <p>Company logo</p>
                <ImgLoader />
            </div>
            <div className="profile-sections">
                <p>Select your avatar</p>
                <div className="avatar-section">
                    <div
                        className={
                            process.env.REACT_APP_SANDBOX_ENV
                                ? 'sub-icon-wrapper-sandbox'
                                : avatar === 1
                                ? 'sub-icon-wrapper sub-icon-wrapper-border'
                                : 'sub-icon-wrapper'
                        }
                        onClick={process.env.REACT_APP_SANDBOX_ENV ? '' : () => editAvatar(1)}
                    >
                        <img
                            className="sandboxUserImg"
                            src={localStorage.getItem('profile_pic') || Bot1} // profile_pic is available only in sandbox env
                            width={localStorage.getItem('profile_pic') ? 35 : 25}
                            height={localStorage.getItem('profile_pic') ? 35 : 25}
                            border-raduis={'50%'}
                            alt="bot1"
                        ></img>
                    </div>
                    <div
                        className={
                            process.env.REACT_APP_SANDBOX_ENV
                                ? 'sub-icon-wrapper-sandbox'
                                : avatar === 2
                                ? 'sub-icon-wrapper sub-icon-wrapper-border'
                                : 'sub-icon-wrapper'
                        }
                        onClick={process.env.REACT_APP_SANDBOX_ENV ? '' : () => editAvatar(2)}
                    >
                        <img src={Bot2} width={25} height={25} alt="bot2"></img>
                    </div>
                    <div
                        className={
                            process.env.REACT_APP_SANDBOX_ENV
                                ? 'sub-icon-wrapper-sandbox'
                                : avatar === 3
                                ? 'sub-icon-wrapper sub-icon-wrapper-border'
                                : 'sub-icon-wrapper'
                        }
                        onClick={process.env.REACT_APP_SANDBOX_ENV ? '' : () => editAvatar(3)}
                    >
                        <img src={Bot3} width={25} height={25} alt="bot3"></img>
                    </div>
                </div>
            </div>
            <div className="profile-sections">
                <p>Username</p>
                <Input
                    disabled={true}
                    value={userName}
                    placeholder="usernmane"
                    type="text"
                    radiusType="semi-round"
                    borderColorType="none"
                    boxShadowsType="gray"
                    colorType="black"
                    backgroundColorType="white"
                    width="350px"
                    height="40px"
                    onChange={() => {}}
                />
            </div>
            <div className="profile-sections analytics">
                <p>Allow Analytics</p>
                <Switcher onChange={() => sendAnalytics(!allowAnalytics)} checked={allowAnalytics} checkedChildren="on" unCheckedChildren="off" />
            </div>
            {userName !== 'root' && (
                <div className="profile-sections">
                    <p>Remove user</p>
                    <div className="warning">
                        <img src={Warning} width={16} height={16} alt="warning"></img>
                        <p>Please note that this action is irreversible</p>
                    </div>
                    <Button
                        className="modal-btn"
                        width="160px"
                        height="36px"
                        placeholder="Remove user"
                        colorType="white"
                        radiusType="circle"
                        backgroundColorType="purple"
                        fontSize="14px"
                        fontWeight="600"
                        aria-haspopup="true"
                        onClick={() => modalFlip(true)}
                    />
                </div>
            )}
        </div>
    );
}

export default Profile;
