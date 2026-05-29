async function testFull() {
    const apiKey = "AIzaSyDglRF1gmgwXQZv3ZGouDccZN-M1JKMlvw";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const makeCategorySchema = (desc) => ({
        type: "OBJECT",
        description: desc,
        properties: {
            summary: { type: "STRING" },
            detail: { type: "STRING" }
        },
        required: ["summary", "detail"]
    });

    const payload = {
        contents: [{ parts: [{ text: "이름: 홍길동, 성별: 남, 생년월일: 양력 1990-01-01" }] }],
        generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.7,
            responseSchema: {
                type: "OBJECT",
                properties: {
                    bazi: {
                        type: "OBJECT",
                        properties: {
                            year: { type: "STRING" },
                            month: { type: "STRING" },
                            day: { type: "STRING" },
                            time: { type: "STRING" }
                        }
                    },
                    summary: { type: "STRING" },
                    persona: makeCategorySchema(""),
                    wealth: makeCategorySchema(""),
                    romance: makeCategorySchema(""),
                    relations: makeCategorySchema(""),
                    turningPoint: makeCategorySchema("")
                },
                required: ["bazi", "summary", "persona", "wealth", "romance", "relations", "turningPoint"]
            }
        }
    };

    try {
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const text = await res.text();
        console.log("RESPONSE:", text);
    } catch (e) {
        console.error("ERROR:", e);
    }
}
testFull();
