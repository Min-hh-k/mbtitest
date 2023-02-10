import React from "react";
import styled from "styled-components";
import mainCat from "../assets/mainCat.png";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function Home() {

  //! 페이지 이동
  const navigate = useNavigate();

  const handleClickBtn = () => {
    navigate('/question')
  }

  return (
    <Wrapper>
      <Header>집사 판별기</Header>

      <Contents>
        <Title>너에게 맞는 냥이는 무엇인가?!</Title>
        <LogoImage>
          <img
            src={mainCat}
            className="rounded-circle"
            alt="mainCat"
            width={350}
            height={400}
          ></img>
        </LogoImage>
        <Desc>나와 잘 맞는 냥이 찾기</Desc>
        <Button type="button" className="btn btn-secondary" onClick={handleClickBtn}>테스트 시작</Button>
      </Contents>
    </Wrapper>
  );
}

export default Home;

const Wrapper = styled.div`
  background-color: pink;
  height: 100vh;
  width: 100%;
  font-family: 'Tenada';
`;

const Contents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.div`
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 30px;
`;

const LogoImage = styled.div`
  margin-top: 15px;
`;

const Desc = styled.div`
  font-size: 20px;
  margin-top: 20px;
`
