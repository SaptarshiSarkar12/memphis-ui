import React, { useContext } from 'react';
import TitleComponent from '../titleComponent';
import './style.scss';
import Button from '../button';
import { GetStartedStoreContext } from '../../domain/overview/getStarted';

const GetStartedItem = (props) => {
    const { headerImage, headerTitle, headerDescription, style, children, onNext, onBack } = props;
    const [getStartedState, getStartedDispatch] = useContext(GetStartedStoreContext);

    return (
        <div className="get-started-wrapper">
            <div className={getStartedState?.currentStep === 5 ? 'get-started-header-finish' : 'get-started-header'}>
                <TitleComponent
                    className="header-description"
                    img={headerImage}
                    headerTitle={headerTitle}
                    headerDescription={headerDescription}
                    style={style}
                    finish={getStartedState?.currentStep === 5}
                ></TitleComponent>
            </div>
            <div className="get-started-body">{children}</div>
            <div className="get-started-footer">
                {!getStartedState.isHiddenButton && (
                    <div className="btn-next-back">
                        <Button
                            width={getStartedState?.currentStep === 5 ? '190px' : '129px'}
                            height="36px"
                            placeholder={getStartedState?.currentStep === 5 ? 'Lanuch Dashboard' : 'Next'}
                            colorType="white"
                            radiusType="circle"
                            alignSelf="flex-end"
                            backgroundColorType={'purple'}
                            fontSize="16px"
                            fontWeight="bold"
                            htmlType="submit"
                            marginTop="27px"
                            disabled={getStartedState?.nextDisable}
                            onClick={() => onNext()}
                            isLoading={getStartedState?.isLoading}
                        />
                        {getStartedState?.currentStep !== 1 && (
                            <Button
                                width={'129px'}
                                height="36px"
                                placeholder={'Back'}
                                colorType="white"
                                radiusType="circle"
                                alignSelf="flex-end"
                                backgroundColorType={'black'}
                                fontSize="16px"
                                fontWeight="bold"
                                htmlType="submit"
                                marginTop="27px"
                                onClick={() => onBack()}
                                isLoading={getStartedState?.isLoading}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GetStartedItem;
