async function testApi() {
    const apiKey = "AIzaSyDglRF1gmgwXQZv3ZGouDccZN-M1JKMlvw";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
    
    const systemPrompt = `당신은 30년 경력의 트렌디하고 통찰력이 매우 깊은 최고 수준의 명리학자입니다. 
사주팔자(만세력)를 기반으로 내담자의 운명을 풀이하되, 단순히 수박 겉핥기 식의 뻔한 말이 아닌, **소름 돋을 정도로 구체적이고 뼈를 때리는(팩폭) 아주 긴 분량의 심층 분석**을 제공해야 합니다.
내담자가 '어떻게 알았지?' 하고 놀랄 수 있도록 오행의 조화, 격국, 신살 등을 종합적으로 고려한 듯한 전문적인 뉘앙스를 풍기면서도 아주 이해하기 쉬운 비유를 사용하세요.
각 항목(detail)의 풀이는 **최소 10문장 이상, 500자 이상의 매우 긴 분량**으로 작성해야 하며, 원인 분석, 현재 상황의 특징, 그리고 앞으로 취해야 할 구체적인 행동 지침(솔루션)까지 기승전결이 완벽한 하나의 칼럼처럼 작성해주세요.`;
            
    const userPrompt = `이름: 홍길동, 성별: 남, 생년월일: 양력 1990-01-01, 태어난 시간: 모름. 이 사람의 사주팔자(년주, 월주, 일주, 시주)를 도출하고(태어난 시간을 모를 경우 시주는 '알수없음'으로 처리), 주어진 JSON 스키마에 맞춰 사주 풀이를 아주 길고 상세하게 작성해줘.`;

    const makeCategorySchema = (desc) => ({
        type: "OBJECT",
        description: desc,
        properties: {
            summary: { type: "STRING", description: "목록 카드에 보일 1~2줄 분량의 호기심을 유발하는 짧고 강렬한 핵심 요약" },
            detail: { type: "STRING", description: "카드를 클릭하면 팝업으로 보여줄 아주아주 길고(최소 10문장 이상), 구체적이고, 깊이 있는 사주 심층 풀이. 원인-현상-해결책의 구조로 작성할 것." }
        },
        required: ["summary", "detail"]
    });

    const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.7,
            responseSchema: {
                type: "OBJECT",
                properties: {
                    bazi: {
                        type: "OBJECT",
                        description: "사주 4기둥 (한자 2글자씩)",
                        properties: {
                            year: { type: "STRING" },
                            month: { type: "STRING" },
                            day: { type: "STRING" },
                            time: { type: "STRING" }
                        }
                    },
                    summary: { type: "STRING", description: "타고난 사주 총평. 단답형이 아닌, 사주의 전반적인 그림을 그려주는 최소 5~6문장 이상의 깊이 있는 통변. 장점과 취약점, 평생의 과제 등을 아우르는 종합 평." },
                    persona: makeCategorySchema("숨겨진 본성 (페르소나) - 겉모습과 속마음의 괴리, 콤플렉스, 진정한 자아에 대한 깊은 심리 분석"),
                    wealth: makeCategorySchema("재물 그릇의 크기와 돈 버는 방식 - 인생 전반의 재물 흐름, 어떤 방식(사업, 투자, 전문직 등)이 유리한지, 조심해야 할 금전적 함정"),
                    romance: makeCategorySchema("치명적 연애와 도화살 - 이성을 끌어당기는 매력의 원천, 연애 패턴의 고질적인 문제점, 어떤 사람을 만나야 안정을 찾는지"),
                    relations: makeCategorySchema("나의 천적과 귀인 - 내 기운을 갉아먹는 사람의 특징(오행, 띠, 성향 등)과 내게 부족한 기운을 채워주는 귀인의 구체적인 특징"),
                    turningPoint: makeCategorySchema("앞으로 3년 내의 결정적 터닝포인트 - 대운이나 세운의 흐름을 바탕으로 예상되는 가장 큰 변화(직업, 거주지, 사람 등)와 대비책")
                },
                required: ["bazi", "summary", "persona", "wealth", "romance", "relations", "turningPoint"]
            }
        }
    };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    const result = await response.json();
    console.log(JSON.stringify(result, null, 2));
}

testApi();
