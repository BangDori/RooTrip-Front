import React, { useCallback, useState } from 'react';
import exampleimg1 from '@assets/LoginMarker1.jpg';
import exampleimg2 from '@assets/LoginMarker2.jpg';
import exampleimg3 from '@assets/LoginMarker3.jpg';

const ImgList = () => {
  const [click, setClick] = useState(false);
  const [routenum, setRoutenum] = useState(0);
  const Checkclick = useCallback(() => {
    if (click === false) {
      setClick((prev) => true);
      setRoutenum(routenum + 1);
    }
  }, [routenum, click]);
  const deleteclick = useCallback(() => {
    if (routenum > 0) {
      setRoutenum((prevRoutenum) => prevRoutenum - 1);
    }
    if (routenum <= 0) {
      setClick(false);
    }
  }, [routenum]);
  return (
    <div className='Write_list'>
      <li className='List_piece'>
        <div className='img_box'>
          <img src={exampleimg1} alt='예시1' />
          {click === true && routenum >= 1 ? (
            <button className='click_img'>{routenum}</button>
          ) : (
            ''
          )}
        </div>
        <table>
          <tr>
            <th>1번 사진</th>
            <td>
              {click === true ? (
                <button type='button' onClick={() => deleteclick()}>
                  경로 취소
                </button>
              ) : (
                <button type='button' onClick={() => Checkclick()}>
                  경로 지정
                </button>
              )}
            </td>
          </tr>
          <tr>
            <th>위치</th>
            <td>
              <span>18.80N, 155.53W 00시 00동 00로</span>
            </td>
          </tr>
        </table>
      </li>

      <li className='List_piece'>
        <div className='img_box'>
          <img src={exampleimg2} alt='예시1' />
        </div>
        <table>
          <tr>
            <th>2번 사진</th>
            <td>
              <button type='button'>경로 지정</button>
            </td>
          </tr>
          <tr>
            <th>위치</th>
            <td>
              <span style={{ color: 'red' }}>
                위치 정보가 없어 경로 지정 불가
              </span>
            </td>
          </tr>
        </table>
      </li>
      <li className='List_piece'>
        <div className='img_box'>
          <img src={exampleimg3} alt='예시1' />
        </div>
        <table>
          <tr>
            <th>3번 사진</th>
            <td>
              <button type='button'>경로 지정</button>
            </td>
          </tr>
          <tr>
            <th>위치</th>
            <td>
              <span>18.80N, 155.53W 00시 00동 00로</span>
            </td>
          </tr>
        </table>
      </li>
      <div className='List_piece'></div>
      <div className='List_piece'></div>
      <div className='List_piece'></div>
    </div>
  );
};

export default ImgList;
