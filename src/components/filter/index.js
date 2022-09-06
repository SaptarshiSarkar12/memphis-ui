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

import React, { useState, useEffect } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import filterIcon from '../../assets/images/filterIcon.svg';
import { Checkbox } from 'antd';
import { getBorderRadius, getFontColor, getBackgroundColor, getBoxShadows } from '../../utils/styleTemplates';

const FilterComponent = (props) => {
    const { width, height, filterBy, filterList } = props;
    const [chosenFilter, setChosenFilter] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const [filterData, setFilterData] = useState([
        {
            name: 'tags',
            label: 'Tags',
            data: [
                {
                    name: 'GitHub',
                    type: 'checkbox',
                    view: 'label',
                    color: '#00A5FF',
                    background: 'rgba(0, 165, 255, 0.1)'
                },
                {
                    name: 'Mixpod',
                    type: 'checkbox',
                    view: 'label',
                    color: '#5542F6',
                    background: 'rgba(85, 66, 246, 0.1)'
                },
                {
                    name: 'Success',
                    type: 'checkbox',
                    view: 'label',
                    color: '#FFA043',
                    background: 'rgba(255, 160, 67, 0.1)'
                }
            ]
        },
        {
            name: 'creatrdBy',
            label: 'Created by',
            data: [
                {
                    name: 'Avraham',
                    type: 'checkbox',
                    view: 'circle',
                    color: 'white',
                    background: 'green'
                }
            ]
        },
        {
            name: 'storageType',
            label: 'Storage type',
            data: [
                {
                    name: 'Memory',
                    type: 'checkbox',
                    view: 'text',
                    color: 'black',
                    background: 'green'
                },
                {
                    name: 'File',
                    type: 'checkbox',
                    view: 'text',
                    color: 'black',
                    background: 'green'
                }
            ]
        }
    ]);

    const fieldProps = {
        style: { width, height }
    };

    useEffect(() => {
        console.log(filterList);
    }, []);

    const handleClickCB = (item) => {
        let newChosenFilter = chosenFilter;
        console.log(newChosenFilter);
        const location = chosenFilter.indexOf(item);
        if (location > -1) {
            newChosenFilter.splice(item, 1);
        } else {
            newChosenFilter.push(item);
        }
        setChosenFilter(newChosenFilter);
    };

    // const fieldProps = {
    //     onClick: handleClick,
    //     disabled,
    //     style: {
    //         borderRadius,
    //         color,
    //         backgroundColor,
    //         width,
    //         height,
    //         borderColor,
    //         fontSize,
    //         fontWeight,
    //         opacity,
    //         minHeight: minHeight,
    //         minWidth: minWidth || '60px',
    //         padding,
    //         zIndex: zIndex,
    //         boxShadow
    //     },
    //     loading: isLoading
    // };

    return (
        <div
            className="filter-container"
            {...fieldProps}
            // style={styleButtonContainer}
        >
            <img
                src={filterIcon}
                alt="filter"
                onClick={(e) => {
                    e.preventDefault();
                    handleClickMenu(e);
                }}
            />
            <label>Filters </label>
            <label className="filter-by">{filterBy}</label>
            <Popover anchorEl={anchorEl} classes={{ paper: 'Menu' }} onClose={handleCloseMenu} open={true}>
                {/* open={open} */}
                <div className="filter-menu">
                    {filterData?.map((item) => {
                        return (
                            <div key={item.name}>
                                <p>{item.label}</p>
                                {item?.data.map((data) => {
                                    return (
                                        <MenuItem className="filter-item">
                                            <Checkbox onClick={() => handleClickCB(item)} checked={true} />

                                            {data.view === 'label' ? (
                                                <label
                                                    style={{
                                                        fontSize: '12px',
                                                        color: data.color,
                                                        background: data.background,
                                                        borderRadius: '4px',
                                                        paddingRight: '5px',
                                                        paddingLeft: '5px',
                                                        marginLeft: '5px'
                                                    }}
                                                >
                                                    {data.name}
                                                </label>
                                            ) : (
                                                <label
                                                    style={{
                                                        fontSize: '12px',
                                                        marginLeft: '5px'
                                                    }}
                                                >
                                                    {data.name}
                                                </label>
                                            )}
                                        </MenuItem>
                                    );
                                })}
                            </div>
                            // <MenuItem key={item.name}>
                            //     <div className="filter-item">
                            //         <Checkbox onClick={() => handleClickCB(item)} checked={true} />
                            //         {item.label}
                            //     </div>
                            // </MenuItem>
                        );
                        // });
                    })}
                </div>
            </Popover>
        </div>
    );
};

export default FilterComponent;
