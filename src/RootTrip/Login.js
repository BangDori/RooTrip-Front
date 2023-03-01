import './css/Login.css';
import {useState, useEffect} from "react";
import SignupModal from './SignupModal';

function Login (){
    const [visible, setVisible] = useState(true);
    const [checkboxcolor, setCheckboxcolor] = useState('white');
    const [modal, setModal] = useState(false);
    
      //스크립트 파일 읽어오기
    const new_script = src => { 
        return new Promise((resolve, reject) => { 
            const script = document.createElement('script'); 
            script.src = src; 
            script.addEventListener('load', () => { 
                resolve(); 
            }); 
            script.addEventListener('error', e => { 
                reject(e); 
            }); 
            document.head.appendChild(script); 
        }); 
    };
    const changeColor = () => {
        if(checkboxcolor === 'white')
            setCheckboxcolor('greenyellow');
        else
            setCheckboxcolor('white');
    }
    useEffect(() => { 
    //카카오맵 스크립트 읽어오기
        const my_script = new_script('https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=f33d92189b8a19d5380b9d4181d45474');
    
        //스크립트 읽기 완료 후 카카오맵 설정
        my_script.then(() => { 
            console.log('script loaded!!!');  
            const kakao = window['kakao']; 
            kakao.maps.load(() => {
                const mapContainer = document.getElementById('map');
                const options = { 
                    center: new kakao.maps.LatLng(37.56000302825312, 126.97540593203321), //좌표설정
                    level: 13,
                    draggable: false
                }; 
                const map = new kakao.maps.Map(mapContainer, options); //맵생성
                //마커설정
                // const markerPosition = new kakao.maps.LatLng(37.56000302825312, 126.97540593203321); 
                // const marker = new kakao.maps.Marker({ 
                //     position: markerPosition
                // }); 
                // marker.setMap(map); 
            });   
        }); 
    }, []);
    return (
        <>
            <div className="Full-Map">
            {modal === true && !visible ? <SignupModal></SignupModal> : null}
                <div id = "map" className="map">
                </div>
                {visible && <div className="LoginPage">
                    <div className='Login_logo'>
                        <h3>Root Trip</h3>
                        <span className='Logotext'>
                            <span className='text1'>여행의 재미를 더하는 </span>
                            <span className='text2'>SNS</span>
                        </span>
                    </div>

                    <div className='login_index'>
                        <input className='logintext'
                            type = "text"
                            name = "ID"
                            placeholder = "사용자 이메일 또는 아이디"
                        />
                        <input className='logintext'
                            type = "text"
                            name = "PW"
                            placeholder = "비밀번호"
                        />
                        <button type = "button" className='loginbtn'>LOG IN</button>
                        <button type = "button" onClick={() => {
                            setVisible(!visible);
                        }}className='gosignupbtn'>회원 가입</button>
                    </div>

                    <div className='social_login'>
                    <button type = "button" className='kakaobtn'>카카오톡 로그인</button>
                    <button type = "button" className='naverbtn'>NAVER</button>
                    <button type = "button" className='googlebtn'>Google</button>
                    </div>
                </div>}
                {!visible && <div className="SignUpPage">
                    <div className='Login_logo'>
                        <h3>회원 가입</h3>
                        <span className='Logotext'>
                            <span className='text1'>간편한 가입으로 루트트립을 즐겨보세요 </span>
                        </span>
                    </div>

                    <div className='signup_index'>
                        <input className='signuptext'
                            type = "text"
                            name = "Phone_email"
                            placeholder = "휴대번호 혹은 이메일 주소"
                        />
                        <input className='signuptext'
                            type = "text"
                            name = "name"
                            placeholder = "성명"
                        />
                        <input className='signuptext'
                            type = "text"
                            name = "nickname"
                            placeholder = "사용자 이름"
                        />
                        <input className='signuptext'
                            type = "text"
                            name = "PW"
                            placeholder = "비밀번호"
                        />
                        <input className='signuptext'
                            type = "text"
                            name = "Check_PW"
                            placeholder = "비밀번호 확인"
                        />
                        <div className='check_use'>
                            <div className='check_use_content'>
                                <button style = {{background : checkboxcolor}} onClick={() => {
                                    changeColor();
                                }}></button>
                                <span onClick={() => {setModal(true)}}>[필수]이용약관 동의</span>
                               
                            </div>
                        </div>                                                                       
                        <button type = "button" onClick={() => {
                            setVisible(!visible);
                        }}className='signupbtn'>가입하기</button>
                    </div>
                </div>}
            </div>   
        </>
    );
}

export default Login;