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

import React, { useEffect, useContext, useState, useRef } from 'react';
import { SearchOutlined } from '@ant-design/icons';

import SearchInput from '../../components/searchInput';
import { ApiEndpoints } from '../../const/apiEndpoints';
import CreateUserDetails from './createUserDetails';
import { httpRequest } from '../../services/http';
import Button from '../../components/button';
import { Context } from '../../hooks/store';
import Modal from '../../components/modal';
import UserItem from './userItem';
import Loader from '../../components/loader';

function Users() {
    const [state, dispatch] = useContext(Context);
    const [userList, setUsersList] = useState([]);
    const [copyOfUserList, setCopyOfUserList] = useState([]);
    const [addUserModalIsOpen, addUserModalFlip] = useState(false);
    const [userDetailsModal, setUserDetailsModal] = useState(false);
    const createUserRef = useRef(null);
    const [searchInput, setSearchInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        dispatch({ type: 'SET_ROUTE', payload: 'users' });
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        try {
            setIsLoading(true);
            const data = await httpRequest('GET', ApiEndpoints.GET_ALL_USERS);
            if (data) {
                data.sort((a, b) => new Date(a.creation_date) - new Date(b.creation_date));
                setUsersList(data);
                setCopyOfUserList(data);
            }
        } catch (error) {}
        setIsLoading(false);
    };

    useEffect(() => {
        if (searchInput.length > 1) {
            const results = userList.filter(
                (userData) => userData?.username?.toLowerCase().includes(searchInput) || userData?.user_type?.toLowerCase().includes(searchInput)
            );
            setUsersList(results);
        } else {
            setUsersList(copyOfUserList);
        }
    }, [searchInput.length > 1]);

    const handleSearch = (e) => {
        setSearchInput(e.target.value);
    };

    const removeUser = async (username) => {
        const updatedUserList = userList.filter((item) => item.username !== username);
        setUsersList(updatedUserList);
        setCopyOfUserList(updatedUserList);
    };

    const closeModal = (userData) => {
        let newUserList = userList;
        newUserList.push(userData);
        setUsersList(newUserList);
        setCopyOfUserList(newUserList);
        addUserModalFlip(false);
        if (userData.user_type === 'application') {
            setUserDetailsModal(true);
        }
    };

    return (
        <div className="users-container">
            <h1 className="main-header-h1">Users</h1>
            <div className="add-search-user">
                <SearchInput
                    placeholder="Search here"
                    colorType="navy"
                    backgroundColorType="none"
                    width="10vw"
                    height="27px"
                    borderRadiusType="circle"
                    borderColorType="gray"
                    boxShadowsType="gray"
                    iconComponent={<SearchOutlined />}
                    onChange={handleSearch}
                    value={searchInput}
                />
                <Button
                    className="modal-btn"
                    width="160px"
                    height="36px"
                    placeholder={'Add a new user'}
                    colorType="white"
                    radiusType="circle"
                    backgroundColorType="purple"
                    fontSize="14px"
                    fontWeight="600"
                    aria-haspopup="true"
                    onClick={() => addUserModalFlip(true)}
                />
            </div>
            <div className="users-list-container">
                <div className="users-list-header">
                    <p className="user-name-title">Username</p>
                    <p className="type-title">Type</p>
                    <p className="creation-date-title">Creation date</p>
                </div>
                <div className="users-list">
                    {isLoading && (
                        <div className="loader-uploading">
                            <Loader />
                        </div>
                    )}
                    {!isLoading &&
                        userList.map((user) => {
                            return <UserItem key={user.id} content={user} removeUser={() => removeUser(user.username)} />;
                        })}
                </div>
            </div>
            <Modal
                header="Add a new user"
                minHeight="630px"
                minWidth="564px"
                rBtnText="Add"
                lBtnText="Cancel"
                closeAction={() => addUserModalFlip(false)}
                lBtnClick={() => {
                    addUserModalFlip(false);
                }}
                clickOutside={() => addUserModalFlip(false)}
                rBtnClick={() => {
                    createUserRef.current();
                }}
                open={addUserModalIsOpen}
            >
                <CreateUserDetails createUserRef={createUserRef} closeModal={(userData) => closeModal(userData)} />
            </Modal>
            <Modal
                header="User connection details"
                height="320px"
                minWidth="440px"
                rBtnText="Close"
                closeAction={() => setUserDetailsModal(false)}
                clickOutside={() => setUserDetailsModal(false)}
                rBtnClick={() => {
                    setUserDetailsModal(false);
                }}
                open={userDetailsModal}
            >
                <div className="user-details-modal">
                    <p className="userName">
                        Username: <span>{userList[userList.length - 1]?.username}</span>
                    </p>
                    <p className="creds">
                        Connection token: <span>{userList[userList.length - 1]?.broker_connection_creds}</span>
                    </p>
                    <p className="note">Please note when you close this modal, you will not be able to restore your user details!!</p>
                </div>
            </Modal>
        </div>
    );
}
export default Users;
