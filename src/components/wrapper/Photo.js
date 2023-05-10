import React, { useCallback, useEffect, useState } from 'react';
import { getAddress } from '@services/image';

const Photo = ({ photo, addRoute, clicked }) => {
  const { feedOrder, url, latitude, longitude } = photo;
  const [loading, setLoading] = useState(false);
  const [addressPoint, setAddressPint] = useState(undefined);

  useEffect(() => {
    // 좌표 정보 주소로 변환 받기
    const getAddressPoint = async () => {
      const address = await getAddress(latitude, longitude);
      setAddressPint(address);
      setLoading(true);
    };

    if (latitude && longitude) getAddressPoint().then(() => setLoading(true));
    else setLoading(true);
  }, [latitude, longitude]);

  const handleClick = useCallback(() => {
    addRoute(photo.id);
  }, [photo, addRoute]);

  if (!loading) {
    return <li className='List_piece'></li>;
  }

  return (
    <li className='List_piece' key={feedOrder}>
      <div className='img_box'>
        <img src={url} alt='img' />
        {clicked > 0 && <div className='click_img'>{clicked}</div>}
      </div>
      <table>
        <tr>
          <th>{feedOrder}번 사진</th>
          <td>
            {latitude ? (
              <button type='button' onClick={handleClick}>
                경로 표시
              </button>
            ) : (
              <button type='button'>위치 설정</button>
            )}
          </td>
        </tr>
        <tr>
          <td colSpan='2' style={{ color: `${!addressPoint && 'red'}` }}>
            {addressPoint ? `${addressPoint}` : '위치를 설정해주세요!'}
          </td>
        </tr>
      </table>
    </li>
  );
};

export default Photo;
