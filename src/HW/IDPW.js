import './IDPW.css';
import {Component} from 'react';
import { useNavigate } from "react-router-dom";

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
        const navigate = useNavigate();
        navigate('/api/auth/login', {
            state:{
                id: this.state.ID,
                pw: this.state.PW
            }
        });
    }
    
    render(){
        
        return (
            <div>
                <h1 className = "Logo">로그인 페이지</h1>
                <div className = "middle">
                    <input 
                        type = "text"
                        name = "ID"
                        placeholder = "ID입력"
                        value={this.state.ID}
                        onChange={this.hadleChangeID}
                    />
                    <br></br>
                    <input 
                    type = "text"
                    name = "PW"
                    placeholder = "PW입력"
                    value={this.state.PW}
                    onChange={this.hadleChangePW}
                    />    
                </div>
                <div>
                    <button onClick = {this.handleClick}>로그인 하기</button>
                </div>  
            </div>
        );
    }
}
export default IDPW;