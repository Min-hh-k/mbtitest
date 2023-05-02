import { useState } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function NameGpt() {
  const [animalNameInput, setAnimalNameInput] = useState("");
  const [result, setResult] = useState();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    // 빈칸이면 이름 생성 안됨
    if (animalNameInput !== "") {
      try {
        const dataBody = {
          model: "text-davinci-003",
          prompt: `suggest three pet names ${animalNameInput}`,
          temperature: 0.8,
          max_tokens: 60,
          top_p: 1.0,
          frequency_penalty: 0.0,
          presence_penalty: 0.0,
        };

        const response = await fetch("https://api.openai.com/v1/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + process.env.REACT_APP_OPENAI_API_KEY,
          },
          body: JSON.stringify(dataBody),
        });

        const data = await response.json();
        console.log(data);
        // console.log(data.choices[0].text)
        //! data에서 답변 가져오기
        setResult(data.choices[0].text);
        setAnimalNameInput("");
      } catch (error) {
        console.log(error);
        alert("서버에서 잘못된 데이터를 반환했습니다.");
      }
    } else {
      alert("짓고 싶은 이름의 설명을 적어주세요!");
    }
  };

  return (
    <Wrapper>
      <Header>😼예비집사 판별기</Header>
      <Contents>
        <Title>냥이 이름을 지어보자!!</Title>
        <p>by openAI</p>
        <Form onSubmit={onSubmit}>
          <input
            type="text"
            name="animalName"
            value={animalNameInput}
            onChange={(e) => {
              setAnimalNameInput(e.target.value);
            }}
            placeholder="이름의 설명을 적어주세요!"
          />
          <input type="submit" value="이름 생성!!!" />
        </Form>

        <Result>{result}</Result>

        <ButtonGroup>
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
            style={{ marginRight: "20px" }}
          >
            뒤로가기
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate("/")}
            style={{ marginRight: "20px" }}
          >
            테스트 다시 시작하기
          </Button>
        </ButtonGroup>
      </Contents>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: pink;
  height: 100vh;
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
  margin-top: 2rem;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 2rem 0rem;

  input[type="text"] {
    margin-bottom: 1.5rem;
    padding: 12px 16px;
    border: 1px solid #8a2be2;
    border-radius: 4px;
    margin-bottom: 24px;
    outline-color: #8a2be2;
    font-size: 25px;
    line-height: 24px;
  }

  input[type="submit"] {
    padding: 12px 25px;
    color: #ffffff;
    background-color: #8a2be2;
    border: none;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
  }
`;

const Result = styled.div`
  color: #ffffff;
  font-size: 2rem;
  padding: 3rem 0px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  margin-bottom: 40px;
`;


