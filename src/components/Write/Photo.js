import React, { useCallback, useEffect, useState } from 'react';

const Photo = ({ photo, setRoute }) => {
  const { feedOrder, url, latitude, longitude } = photo;
  const [loading, setLoading] = useState(false);
  const [local, setLocal] = useState('');

  useEffect(() => {
    // 좌표 정보 주소로 변환 받기
    // const naming = async () => {
    //   return await getLocal(latitude, longitude);
    // }
    // const name = naming();
    // await setLocal(name);

    // 변환이 완료되면, 화면 보여주기
    setLoading(true);
  }, []);

  const handleClick = useCallback(() => {
    const newPhoto = photo;

    if (photo.routeOrder !== -1) {
      // photo 경로가 이미 설정되어 있다면,
      const currentOrder = photo.routeOrder;

      // 경로 취소
      newPhoto.routeOrder = -1;

      // 취소한 경로 보다 높은 숫자의 경로 모두 당기기
    } else {
      // photo 경로가 설정되어 있지 않다면,
      // newPhoto.routeOrder = route + 1;
    }

    // setPhotos((prevPhoto) => ({ ...prevPhoto, newPhoto }));

    // console.log(newPhoto);
    // setPhotos((prevPhoto) => ({ ...prevPhoto, newPhoto }));

    // setRoute((prevRoute) => prevRoute + 1);

    // 경로 설정 반영하기
    setRoute(photo);
  }, [photo, setRoute]);

  if (!loading) {
    return <>Skeleton UI</>;
  }

  return (
    <li className='List_piece' key={feedOrder}>
      <div className='img_box'>
        <img src={url} alt='img' />
      </div>
      <table>
        <tr>
          <th>{feedOrder}번 사진</th>
          <td>
            <button type='button' onClick={handleClick}>
              경로 지정
            </button>
          </td>
        </tr>
        <tr>
          <th>위치</th>
          <span>
            {latitude ? `${latitude}` : '위치 정보가 존재하지 않습니다.'}
          </span>
        </tr>
      </table>
    </li>
  );
};

export default Photo;
