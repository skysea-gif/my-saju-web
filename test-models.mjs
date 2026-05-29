async function testModels() {
    const apiKey = "AIzaSyDglRF1gmgwXQZv3ZGouDccZN-M1JKMlvw";
    const models = ["gemini-3-flash-preview", "gemini-2.5-flash", "gemini-flash-latest"];
    for (const model of models) {
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: "hi" }] }] })
        });
        const data = await res.json();
        console.log(model, data.error ? data.error.status : "SUCCESS");
    }
}
testModels();
