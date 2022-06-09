import React, { useState } from 'react';
import { Upload,message ,Popover} from 'antd';
import ImgCrop from 'antd-img-crop';
import { LoadingOutlined, PlusOutlined ,UploadOutlined} from '@ant-design/icons';
import "./changehi.css"
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

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
        props.imgsend(newFileList[0].response.result.imgName)
      }
    }else{
      console.log('delete')
    }
    setFileList(newFileList);
    console.log(fileList)
    if(imgUrl){
      setFileList([])
    }
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
    <Popover  title="send image">
      <Upload
        action="http://139.196.48.129:12345/upload/image"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        headers={{authorization:token}}
        className='sendimg'  
        >
        {fileList.length < 1 && '+ Upload'}
      </Upload>
      </Popover>
  );
};

export default Changehi;
