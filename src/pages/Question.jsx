import React, { useState } from "react";
import styled from "styled-components";
import { ProgressBar, Button } from "react-bootstrap";
import { QuestionData } from "../assets/data/questionData";
import { createSearchParams, useNavigate } from "react-router-dom";

function Question() {
  const [questionNo, setQuestionNo] = useState(0);
  const [totalScore, setTotalScore] = useState([
    { id: "EI", score: 0 },
    { id: "SN", score: 0 },
    { id: "TF", score: 0 },
    { id: "JP", score: 0 },
  ]);
  const navigate = useNavigate();

  const handleClickBtn = (no, type) => {
    const newScore = totalScore.map((s) =>
      s.id === type ? { id: s.id, score: s.score + no } : s
    );

    setTotalScore(newScore);

    if (QuestionData.length !== questionNo + 1) {
      setQuestionNo(questionNo + 1);
    } else {
      //mbti 도출식
      const mbti = newScore.reduce(
        (acc, curr) =>
          acc +
          (curr.score >= 2 ? curr.id.substring(0, 1) : curr.id.substring(1, 2)),
        ""
      );
      console.log("mbti", mbti);
      //결과 페이지 이동
      navigate({
        pathname: "/result",
        search: `?${createSearchParams({
          mbti: mbti,
        })}`,
      });
    }
  };

  return (
    <Wrapper>
      <Top />
      <ProgressBar
        animated
        variant="danger"
        now={(questionNo / QuestionData.length) * 100}
        style={{ marginBottom: "30px", height: "30px" }}
      />
      <Title>{QuestionData[questionNo].title}</Title>
      <BtnGroup>
        <Button
          onClick={() => handleClickBtn(1, QuestionData[questionNo].type)}
          style={{ width: "40%", minHeight: "200px", fontSize: "15pt" }}
        >
          {QuestionData[questionNo].answera}
        </Button>
        <Button
          onClick={() => handleClickBtn(0, QuestionData[questionNo].type)}
          style={{
            width: "40%",
            minHeight: "200px",
            fontSize: "15pt",
            marginLeft: "25px",
          }}
        >
          {QuestionData[questionNo].answerb}
        </Button>
      </BtnGroup>
    </Wrapper>
  );
}

export default Question;

const Wrapper = styled.div`
  background-color: pink;
  height: 100vh;
  width: 100%;
  font-family: "Tenada";
`;

const Top = styled.div`
  height: 30px;
`;

const Title = styled.div`
  font-size: 30px;
  text-align: center;
`;

const BtnGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;
