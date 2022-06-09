import React, { useState } from 'react';
import { Upload,message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const Changehi = (props) => {
  const [fileList, setFileList] = useState([
  ]);

  var token="Bearer"+" "+localStorage.getItem('token')
  const onChange = ({ fileList: newFileList }) => {
    let imgUrl=null
    if(newFileList[0]){
      if(newFileList[0].response){
        console.log(newFileList[0].response.result)
        imgUrl=newFileList[0].response.result.imgUrl
      }
    }else{
      console.log('delete')
    }
    props.getImgUrl(imgUrl)
    setFileList(newFileList);
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <ImgCrop rotate>
      <Upload
        action="http://139.196.48.129:12345/upload/avatar"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        headers={{authorization:token}}
      >
        {fileList.length < 1 && '+ Upload'}
      </Upload>
    </ImgCrop>
  );
};

export default Changehi;
