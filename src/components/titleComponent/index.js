import React from 'react';
import './style.scss';

const TitleComponent = (props) => {
    const { headerTitle, typeTitle = 'header', headerDescription, style, img, finish } = props;

    React.useEffect(() => {
        console.log(props);
    }, []);

    return (
        <div className="title-container" style={style?.container}>
            {typeTitle === 'header' && (
                <div className={finish ? 'header-title-container-finish' : 'header-title-container'}>
                    <img className="header-image" src={img} alt={img} style={style?.image}></img>
                    <label className="header-title" style={style?.header}>
                        {headerTitle}
                    </label>
                </div>
            )}
            {typeTitle === 'sub-header' && (
                <p className="sub-header-title" style={style?.header}>
                    {headerTitle}
                </p>
            )}
            <p className="header-description" style={style?.description}>
                {headerDescription}
            </p>
        </div>
    );
};

export default TitleComponent;
