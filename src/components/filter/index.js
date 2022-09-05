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

    // const handleClick = (e) => {
    //     onClick(e);
    // };

    // const borderRadius = getBorderRadius(radiusType);
    // const color = getFontColor(colorType);
    // const backgroundColor = getBackgroundColor(backgroundColorType);
    // const borderColor = border ? getBackgroundColor(border) : backgroundColor;
    // const opacity = disabled ? '0.5' : '1';
    // const boxShadow = getBoxShadows(boxShadowStyle);

    // const styleButtonContainer = {
    //     margin: margin,
    //     textAlign: textAlign,
    //     marginBottom: marginBottom,
    //     marginTop: marginTop,
    //     marginRight: marginRight,
    //     alignSelf: alignSelf
    // };
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
            <label>Filter By: </label>
            <label className="filter-by">{filterBy}</label>
            <Popover id="long-menu" classes={{ paper: 'Menu c' }} anchorEl={anchorEl} onClose={handleCloseMenu} open={open}>
                {filterList?.map((item, index) => (
                    <MenuItem key={item + index}>
                        <div className="filter-item">
                            <Checkbox onClick={() => handleClickCB(item)} checked={chosenFilter.includes(item)} />
                            <label>{item}</label>
                        </div>
                    </MenuItem>
                ))}
            </Popover>
        </div>
    );
};

export default FilterComponent;
