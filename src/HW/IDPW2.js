import './css/IDPW.css';
import Scroll_section from './Scroll_section';



const DIVIDER_HEIGHT = 5;
function IDPW (){
    const state = {
        ID : '',
        PW: ''
    }
    var hadleChangeID = (e) =>{
        this.setState({
            ID: e.target.value
        });
    }
    var hadleChangePW = (e) =>{
        this.setState({
            PW: e.target.value
        });
    }
    var handleClick = () => {
        //비밀번호 조건 : 문자와 숫자, 특수문자(최소 하나) 섞여있고 4~15자
        const regex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\!\@\#\$\%\^\&\*\(\)\~]+)[0-9a-zA-Z\!\@\#\$\%\^\&\*\(\)\~]{4,15}$/;
        if(regex.test(this.state.PW)){
            alert("로그인 성공");
        }
        else{
            alert("로그인 실패! 비밀번호 다시 입력");
        }
    }

    return (
        <>
            <header>
            <h1 className = "Logo">로그인 페이지</h1>
            </header>
            <main>
            <div className='middle'>
                <input 
                    type = "text"
                    name = "ID"
                    placeholder = "ID입력"
                    value = {this.state.ID}
                />
                <br></br>
                <input 
                    type = "text"
                    name = "PW"
                    placeholder = "PW입력"
                    value = {this.state.PW}
                />
            </div>
                <button type="button">로그인 하기</button>
            </main>
        </>
    );
}
export default IDPW;