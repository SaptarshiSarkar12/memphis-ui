import React, { useContext } from 'react';
import TitleComponent from '../titleComponent';
import './style.scss';
import Button from '../button';
import { GetStartedStoreContext } from '../../domain/overview/getStarted';
import bgGetStarted from '../../assets/images/bgGetStarted.svg';
import Lottie from 'lottie-react';

const GetStartedItem = (props) => {
    const { headerImage, headerTitle, headerDescription, style, children, onNext, onBack } = props;
    const [getStartedState, getStartedDispatch] = useContext(GetStartedStoreContext);

    return (
        <div className="get-started-wrapper">
            {getStartedState?.currentStep !== 5 && (
                <>
                    <img className="get-started-bg-img" src={bgGetStarted} alt=""></img>
                    <div className="get-started-top">
                        <div className="get-started-top-header">
                            <img className="header-image" src={headerImage} alt={headerImage}></img>
                            <p className="header-title">{headerTitle}</p>
                            <p className="header-description">{headerDescription}</p>
                        </div>
                        <div className="get-started-body">{children}</div>
                    </div>
                </>
            )}
            {getStartedState?.currentStep === 5 && (
                <>
                    <img className="get-started-bg-img" src={bgGetStarted} alt=""></img>
                    <div className="get-started-top">
                        <div className="get-started-top-header finish">
                            <Lottie style={style?.image} animationData={headerImage} loop={true} />
                            <p className="header-title">{headerTitle}</p>
                            <p className="header-description">{headerDescription}</p>
                        </div>
                        <div className="get-started-body">{children}</div>
                    </div>
                </>
            )}

            <div className="get-started-footer">
                {!getStartedState.isHiddenButton && (
                    <>
                        <div id="e2e-getstarted-next-btn">
                            <Button
                                width={getStartedState?.currentStep === 5 ? '190px' : '129px'}
                                height="36px"
                                placeholder={getStartedState?.currentStep === 5 ? 'Launch Dashboard' : 'Next'}
                                colorType="white"
                                radiusType="circle"
                                backgroundColorType={'purple'}
                                fontSize="16px"
                                fontWeight="bold"
                                htmlType="submit"
                                disabled={getStartedState?.nextDisable}
                                onClick={() => onNext()}
                                isLoading={getStartedState?.isLoading}
                            />
                        </div>
                        <Button
                            width={'129px'}
                            height="36px"
                            placeholder={'Back'}
                            colorType="white"
                            radiusType="circle"
                            backgroundColorType={'black'}
                            fontSize="16px"
                            fontWeight="bold"
                            htmlType="submit"
                            disabled={getStartedState?.currentStep === 1}
                            onClick={() => onBack()}
                            isLoading={getStartedState?.isLoading}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default GetStartedItem;
