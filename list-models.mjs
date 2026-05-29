async function listModels() {
    const apiKey = "AIzaSyDglRF1gmgwXQZv3ZGouDccZN-M1JKMlvw";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const res = await fetch(apiUrl);
    const data = await res.json();
    if (data.models) {
        const textModels = data.models.filter(m => m.supportedGenerationMethods.includes("generateContent"));
        console.log(textModels.map(m => m.name).join("\n"));
    } else {
        console.log("No models returned", data);
    }
}
listModels();
