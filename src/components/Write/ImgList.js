import React, { useCallback, useState } from 'react';

const ImgList = ({ photos }) => {
  return (
    <div className='Write_list'>
      {photos.map((photo, index) => (
        <li className='List_piece' key={index}>
          <div className='img_box'>
            <img src={photo.url} alt='img' />
          </div>
          <table>
            <tr>
              <th>{index}번 사진</th>
              <td>
                <button type='button'>경로 지정</button>
              </td>
            </tr>
            <tr>
              <th>위치</th>
              <span>
                {photo.latitude ? `${photo.latitude}` : '위치 정보 X'}
              </span>
            </tr>
          </table>
        </li>
      ))}
    </div>
  );
};

export default ImgList;
