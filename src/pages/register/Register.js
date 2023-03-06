import React from 'react';
import '../../styles/register/register.scss'
const Register = () => {

    return (
        <div className='Register_main'>
            <div className='User_data'>
                <div className='User_data_name'>
                    <span>성명</span>
                    <span>email</span>
                    <span>닉네임</span>
                    <span>비밀번호</span>
                    <span>비밀번호 확인</span>
                </div>
                <div className='User_data_content'>
                    <div className='Name'>
                        <input type="text" name="성명" value="" placeholder='이름을 입력해주세요'/>    
                        <div className='check_box'>
                            <span className='check_sex'>
                            <button type="button" >
                                남
                            </button>
                            </span>
                            <span className='check_sex'>
                                <button type="button">여</button>
                            </span>
                        </div>
                    </div>
                    <div>
                        <input type="text" name="email" value="" placeholder='email을 입력해주세요'/>
                        <span>* 이메일 형식에 맞춰주세요</span>
                    </div>
                    <div>
                        <input type="text" name="Nick_name" value="" placeholder='닉네임을 입력해주세요'/>    
                        {/* 정규식으로 입력한 닉네임이 형식에 맞으면 파란색으로 * 사용가능한 닉네임입니다로 바뀌고 형식에 맞지 않다면 빨간색으로 * 사용할 수 없는 닉네임입니다로 바뀜 */}
                        <span>* 한글, 영어, 숫자를 조합한 닉네임을 입력해주세요</span>
                    </div>
                    <div>
                        <input type="text" name="PWD" value="" placeholder='비밀번호를 입력해주세요'/>
                        {/* 정규식으로 입력한 닉네임이 형식에 맞으면 파란색으로 * 시용가능한 비밀번호입니다로 바뀜 */}
                        <span className='PWD_df'>* 숫자, 영어, 특수문자를 포함해야 합니다!</span>
                    </div>
                    <div>
                        <input type="text" name="PWD_check" value="" placeholder='비밀번호를 한번 더 입력해주세요'/>    
                        {/* 위의 비밀번호랑 일치하면 파란색으로 * 비밀번호가 일치합니다로 바뀜 */}
                        <span>* 위 입력한 비밀번호를 다시 입력해주세요</span>
                    </div>
                </div>
            </div>
            <div className='check_assign'>
                {/* 필수 누르면 가입하기 버튼 활성화 원래는 활성화 x -> 이거 내가 만들거 */}
                <label>
                    <input type="checkbox" name="" value=""></input>
                    <span>통합 서비스 이용약관 (동의)</span>
                </label>
                <label>
                    <input type="checkbox" name="" value=""/>
                    <span>개인정보 이용 (선택)</span>
                </label>
                <div className='signbtn'>
                    <button type="button">가입하기</button>

                </div>
            </div>
        </div>
    );
};

export default Register;