import Button from '../../components/button';
import React from 'react';
import './style.scss';

const StationsInstructions = (props) => {
    const { header, button, image, newStation, style } = props;
    const description = "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to usin"

    return (
        <div className="empty-stations-container" style={style}>
            {image ? <img src={image} className="stations-icon" alt="stationsImage"></img> : null}
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
                onClick={() => newStation()}
            />
        </div>
    );
};

export default StationsInstructions;
