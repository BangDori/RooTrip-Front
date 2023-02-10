import './css/IDPW.css';
import {Component} from 'react';
import {useRef } from "react";
const DIVIDER_HEIGHT = 5;

class IDPW extends Component {
    state = {
        ID : '',
        PW: ''
    }
    hadleChangeID = (e) =>{
        this.setState({
            ID: e.target.value
        });
    }
    hadleChangePW = (e) =>{
        this.setState({
            PW: e.target.value
        });
    }
    handleClick = () => {
        //비밀번호 조건 : 문자와 숫자, 특수문자(최소 하나) 섞여있고 4~15자
        const regex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\!\@\#\$\%\^\&\*\(\)\~]+)[0-9a-zA-Z\!\@\#\$\%\^\&\*\(\)\~]{4,15}$/;
        if(regex.test(this.state.PW)){
            window.confirm("로그인 성공");
        }
        else{
            alert("로그인 실패! 비밀번호 다시 입력");
        }
    }
    
    render(){
        
        return (
            <main id = "main">
            <div className='page1'>
                <h1 className = "Logo">로그인 페이지</h1>
                <div className = "middle">
                    <input 
                        className='Logintext'
                        type = "text"
                        name = "ID"
                        placeholder = "ID입력"
                        value={this.state.ID}
                        onChange={this.hadleChangeID}
                    />
                    <br></br>
                    <input 
                    className='Logintext'
                    type = "text"
                    name = "PW"
                    placeholder = "PW입력"
                    value={this.state.PW}
                    onChange={this.hadleChangePW}
                    />    
                </div>
                <div>
                    <button type = "button" className='LoginButton'onClick = {this.handleClick}>로그인 하기</button>
                </div>  
            </div>
            </main>
        );
    }
}

export default IDPW;