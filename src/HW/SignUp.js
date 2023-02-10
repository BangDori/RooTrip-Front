import './css/SignUp.css';
import {Component} from 'react';
import React, { useState, useRef } from 'react';

class SignUp extends Component{
    state ={
        ID : '',
        Pw : '',
    }
    hadleChangePW = (e) =>{
        this.setState({
            PW: e.target.value
        });
    }
    next = () => {
        alert("미구현");
    }
    render(){
        return (
            <>
                <header>
                <div className = "head">
                    <h1>회원 가입 페이지</h1>
                        <h3>계정 정보를 입력해주세요</h3>
                </div>  
                </header>
                <main className='main'>
                    <div className='input-box'>
                        <span className = "left_text">전화번호</span>
                        <br/>
                        <input className='signtext' type="text" name="email" placeholder='이메일 입력'/>
                        <button type="button" className='certification_btn'>인증번호 발송</button>
                    </div>
                    <div className='input-box'>
                        <span className = "left_text">인증번호</span>
                        <br/>
                        <input className='signtext' type="text" name="인증번호" placeholder='인증번호 입력'/>
                        <button type="button" className='certification_btn'>인증 확인</button>
                    </div>
                    <div className='input-box'>
                        <span className = "left_text">아이디</span>
                        <br/>
                        <input className='signtext' type="text" name="ID" placeholder='아이디 입력'/>
                        <button type="button" className='certification_btn'>중복 확인</button>
                    </div>
                    <div className='input-box'>
                        <span className = "left_text">비밀번호</span>
                        <br/>
                        <input className='fulltext' type="text" name="PW" placeholder='비밀번호 입력' value={this.state.PW} onChange={this.hadleChangePW}/>
                        <span id = "PWNOK">문자와 숫자, 특수문자를 최소 1자를 포함해 4~15자 이내로 입력해주세요</span>
                        <span id = "PWOK">사용가능한 비밀번호 입니다.</span>
                    </div>
                    <div className='input-box'>
                        <span className = "left_text">비밀번호 재입력</span>
                        <br/>
                        <input className='fulltext' type="text" name="RPW"/>
                    </div>
                    <div className='next'>
                        <button type="button" className='endbtn' onClick={this.next}>회원 가입</button>
                    </div>
                </main>
            </>
        );
    }
}
export default SignUp;