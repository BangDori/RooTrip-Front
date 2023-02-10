import {axios, Wrap, useRef } from "react";
import './css/UpImg.css';
function UpImg() {
    const requestImg = async (event) => {
      // form tag를 사용하지 않아도 formdata를 만들 수 있습니다.
      let formData = new FormData();
      formData.append('image', event.target.files[0]);
      // 생성한 폼 데이터에 파일 객체를 할당하고, 서버에 요청을 보냅니다.
      try {
        const imageRes = await axios.post(`./image`, formData);
      } catch (error) {
        console.log(error);
        alert('server error');
      }
    };
    return (
        <>
        <header>
            <div className = "head">
                <h1>사진 업로드</h1>
            </div>  
        </header>
        <div id='imageEdit'>
            <div className = "file-box">
                <input
                className="Upfile"
                type='file'
                id='image_uploads'
                name='image'
                accept='image/*'
                onChange={requestImg}
                >
                </input>      
            </div>
        </div>
      </>
    );
  }

  export default UpImg;