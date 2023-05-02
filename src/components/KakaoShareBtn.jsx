import React, { useEffect } from "react";
import { Button } from "react-bootstrap";


// Kakao 인식
const { Kakao } = window;
const KEY = process.env.REACT_APP_SHARE_KAKAO_KEY;

function KakaoShareBtn({ data }) {
  const url = "https://mbtitestcat.netlify.app/";

  // 결과창 url -> netlify 인식 오류 해결 위해 /public/_redirects 생성
  const resultUrl = window.location.href;

  useEffect(() => {
    Kakao.cleanup();
    // kakao js 키 받아오기
    Kakao.init(KEY);
    // SDK 초기화 여부를 판단합니다.
    console.log(Kakao.isInitialized());
  }, []);

  const shareKakao = () => {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "😼예비집사 판별기 결과😼",
        description: `집사님이 고양이를 키운다면 가장 잘 맞는 고양이는 ${data.name}`,
        imageUrl: url + data.img,
        link: {
          mobileWebUrl: resultUrl,
          webUrl: resultUrl,
        },
      },
      buttons: [
        {
          title: "나도 테스트 하러가기",
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  };

  return (
    <Button
      onClick={shareKakao}
      variant="secondary"
      style={{ marginRight: "20px" }}
    >
      카카오톡 공유하기
    </Button>
  );
}

export default KakaoShareBtn;
