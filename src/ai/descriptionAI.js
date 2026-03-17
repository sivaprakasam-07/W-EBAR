const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function getFoodDescription(foodName) {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

    if (!apiKey) {
        console.error("OpenRouter API key is missing!");
        throw new Error("Missing OpenRouter API key. Set VITE_OPENROUTER_API_KEY in your environment.");
    }

    const prompt = `Generate a short, attractive 2-line description for the food item: ${foodName}`;

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "FastFoodAR"
    };

    console.log("Calling OpenRouter API for food description...", {
        url: OPENROUTER_API_URL,
        foodName: foodName,
        model: "meta-llama/llama-3-8b-instruct",
        headers: { "Authorization": "[REDACTED]", ...headers }
    });

    let response;
    try {
        response = await fetch(OPENROUTER_API_URL, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                model: "meta-llama/llama-3-8b-instruct",
                messages: [{ role: "user", content: prompt }]
            })
        });
    } catch (fetchError) {
        console.error("Fetch error:", fetchError);
        throw new Error(`Network error: ${fetchError.message}`);
    }

    console.log(`OpenRouter API response status: ${response.status}`);

    if (!response.ok) {
        let details = `API returned status ${response.status}`;
        try {
            const errorData = await response.json();
            console.error("OpenRouter API error response:", errorData);
            details = errorData?.error?.message || details;
        } catch (parseError) {
            console.error("Could not parse error response:", parseError);
            const text = await response.text();
            console.error("Response text:", text);
        }
        throw new Error(details);
    }

    let data;
    try {
        data = await response.json();
    } catch (parseError) {
        console.error("Failed to parse success response:", parseError);
        throw new Error("Invalid response format from OpenRouter API");
    }

    const description = data?.choices?.[0]?.message?.content?.trim();
    if (!description) {
        console.warn("Empty response from OpenRouter API for", foodName);
        return "Description is unavailable right now.";
    }

    console.log("Food description generated successfully:", description);
    return description;
}
