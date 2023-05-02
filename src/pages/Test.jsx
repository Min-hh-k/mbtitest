import { useCallback, useEffect, useState } from 'react';

const { Configuration, OpenAIApi } = require('openai');

function Test() {
  const [music, setMusic] = useState({ title: '', singer: '' });

  // OpenAI API 호출
  const fetchOpenApi = useCallback(() => {
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });

    const testPrompt = 'recommend me one female rock music';

    new OpenAIApi(configuration)
      .createCompletion({
        model: 'text-davinci-003',
        prompt: testPrompt,
        temperature: 0.8,
        max_tokens: 60,
      })
      .then((res) => {
        const { choices } = res.data;
        const [title, singer] = choices[0].text.split('by');

        setMusic({ title, singer }); // 음악의 제목, 가수 데이터 저장
      });
  }, []);

  useEffect(() => {
    fetchOpenApi(); // Mount 시 호출한다.
  }, []);

  const { title, singer } = music;
  return (
    <div className="App">
      {title} - {singer}
    </div>
  );
}

export default Test;