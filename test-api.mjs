
async function testApi() {
    const apiKey = "AIzaSyDglRF1gmgwXQZv3ZGouDccZN-M1JKMlvw";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`;
    
    const systemPrompt = "당신은 30년 경력의 트렌디하고 날카로운 통찰력을 가진 명리학자입니다. 사주팔자(만세력)를 기반으로 MZ세대들이 열광할 만한 '팩폭'과 '도파민'이 넘치는 운세 풀이를 제공합니다. 전문 용어를 조금 섞되, 아주 이해하기 쉽고 직관적인 비유를 사용하세요.";
    
    const userPrompt = `이름: 홍길동, 성별: 남, 생년월일: 양력 1990-01-01, 태어난 시간: 모름. 이 사람의 사주팔자(년주, 월주, 일주, 시주)를 도출하고(태어난 시간을 모를 경우 시주는 '알수없음'으로 처리), 주어진 JSON 스키마에 맞춰 아주 흥미진진하게 사주 풀이를 작성해줘.`;

    const makeCategorySchema = (desc) => ({
        type: "OBJECT",
        description: desc,
        properties: {
            summary: { type: "STRING", description: "목록 카드에 보일 1~2줄 분량의 호기심을 유발하는 짧은 핵심 요약" },
            detail: { type: "STRING", description: "카드를 클릭하면 팝업으로 보여줄 4~5문장 이상의 아주 구체적이고 깊이 있는 사주 풀이 (팩폭, 조언, 구체적 예시 포함)" }
        },
        required: ["summary", "detail"]
    });

    const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "OBJECT",
                properties: {
                    bazi: {
                        type: "OBJECT",
                        description: "사주 4기둥 (한자 2글자씩)",
                        properties: {
                            year: { type: "STRING", description: "년주 2글자 (예: 壬戌)" },
                            month: { type: "STRING", description: "월주 2글자 (예: 丙子)" },
                            day: { type: "STRING", description: "일주 2글자 (예: 甲寅)" },
                            time: { type: "STRING", description: "시주 2글자 (모를 경우 '알수없음')" }
                        }
                    },
                    summary: { type: "STRING", description: "타고난 사주 총평 (3~4문장, 팩폭과 칭찬을 섞어서)" },
                    persona: makeCategorySchema("숨겨진 본성 (페르소나) - 겉과 속이 어떻게 다른지 팩폭"),
                    wealth: makeCategorySchema("재물 그릇의 크기와 돈 버는 방식 (월급쟁이 vs 사업가 등 구체적으로)"),
                    romance: makeCategorySchema("치명적 연애와 도화살/홍염살 여부 (이성 관계의 특징)"),
                    relations: makeCategorySchema("나의 천적과 귀인 (어떤 특징/계절/오행의 사람을 피하고 만나야 하는지)"),
                    turningPoint: makeCategorySchema("올해의 결정적 터닝포인트 (구체적인 시기와 사건 예측)")
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
