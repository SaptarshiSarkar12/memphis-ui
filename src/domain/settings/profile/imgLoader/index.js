import './style.scss';

import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { httpRequest } from '../../../../services/http';
import { ApiEndpoints } from '../../../../const/apiEndpoints';


const ImgLoader = () => {
    const [loading, setLoading] = useState(false);
    const [imgUrl, setImgUrl] = useState(null);

    const changeLogo = async (file) => {
        let dataImg = new FormData();
        dataImg.append("organizationPicture", file);
        try {
            const data = await httpRequest("PUT", ApiEndpoints.EDIT_COMPANY_LOGO, dataImg);
            //Do something
            // onSuccess("ok");
        } catch (err) {
            // onSuccess("error");
        }
    };



    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

      
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (imageUrl) => {
                setImgUrl(imageUrl);
                setLoading(false);
            });
        }
    };

    const uploadButton = (
        <div>
            {loading && <LoadingOutlined />}
            <div style={{ marginTop: 8, color: "#A9A9A9" }}>Drag &#38; drop to upload </div>
            <div style={{ color: "#6557FF" }}>or browse </div>
        </div>
    );
    return (
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            {imgUrl ? <img src={imgUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
    );
};

export default ImgLoader;
