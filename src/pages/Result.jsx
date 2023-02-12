import React, { useEffect } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resultData } from "../assets/data/resultData";

function Result() {
  //! 페이지 이동
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  // .get() 을 통해 createSearchParams 에서만든 mbti 결과 가져옴
  const mbti = searchParams.get("mbti");

  // 최종 도출한 결과 객체
  const [resultDatas, setResultDatas] = React.useState({});

  useEffect(() => {
    const result = resultData.find((s) => s.best === mbti);
    setResultDatas(result);
  }, [mbti]);

  return (
    <Wrapper>
      <Header>😼예비집사 판별기</Header>

      <Contents>
        <Title>결과 보기?</Title>
        <LogoImage>
          <img
            src={resultDatas.image}
            className="rounded-circle"
            width={330}
            height={330}
            alt="mainimage"
          ></img>
        </LogoImage>
        <Desc>
          예비 집사님은 <Desc2>{resultDatas.best}</Desc2> 입니다.
        </Desc>
        <Desc>
          예비 집사님과 찰떡궁합인 고양이는 <Desc2>{resultDatas.name}</Desc2>{" "}
          입니다.
        </Desc>
        <Desc style={{ width: "250pt" }}> {resultDatas.desc}</Desc>
        <ButtonGroup>
          <Button
            variant="secondary"
            style={{ fontFamily: "LeeSeoYun" }}
            onClick={() => navigate("/")}
          >
            테스트 다시시작하기
          </Button>
        </ButtonGroup>
      </Contents>
    </Wrapper>
  );
}

export default Result;

const Wrapper = styled.div`
  background-color: pink;
  height: 100%;
  width: 100%;
  font-family: "Tenada";
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
  margin: 20px 30px 10px 30px;
`;

const Desc2 = styled.div`
  font-size: 40px;
  color: white;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  margin-bottom: 40px;
`;
