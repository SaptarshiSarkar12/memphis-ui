import Button from '../../components/button';
import React from 'react';
import './style.scss';


const StationsInstructions = (props) => {
    const { header, description, button, image } = props;

    return (
        <div className="empty-stations-container">
            {image ? <img src={image} className="stations-icon" alt="stationsImage"></img>: null}
            <div className="header-empty-stations">{header}</div>
            <p className="header-empty-description">{description}</p>
            <Button
                className="modal-btn"
                width="180px"
                height="37px"
                placeholder={button}
                colorType="white"
                radiusType="circle"
                backgroundColorType="purple"
                fontSize="14px"
                fontWeight="bold"
                marginLeft="15px"
                aria-controls="usecse-menu"
                aria-haspopup="true"
                marginTop="27px"
            />
        </div>
    );
};

export default StationsInstructions