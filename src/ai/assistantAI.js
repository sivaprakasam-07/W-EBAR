const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function getFoodSuggestion(userInput) {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

    if (!apiKey) {
        console.error("OpenRouter API key is missing!");
        throw new Error("Missing OpenRouter API key. Set VITE_OPENROUTER_API_KEY in your environment.");
    }

    const menuList = "Burger, Pizza, Fries, Coke, Ice Cream, Noodles, Veg Sushi, Veg Indian Thali, Taco, Chicken meal, Chicken Biryani, Tikkawrap meal, Meallet 2, Large Burger, Tandoori Chicken, Burger with fries, Fries with Coke, Tandoori mix grill, 2 person combo, Pepsi, Redbull, Fanta, Coca Cola, Sprite";

    const prompt = `User request: "${userInput}"

From this menu:
${menuList}

Rules:
- Only suggest items from this menu
- Return 2 to 4 items
- Each item must be on a new line
- Format strictly: Food Name - short explanation
- No numbering
- No extra paragraph
- Explanation max 10 words
- No items outside the provided menu

Example:
Burger - Juicy grilled classic with fresh toppings
Fries - Crispy golden fries perfect for snacking`;

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "FastFoodAR"
    };

    console.log("Calling OpenRouter API for food suggestion...", {
        url: OPENROUTER_API_URL,
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

    const suggestion = data?.choices?.[0]?.message?.content?.trim();
    if (!suggestion) {
        console.warn("Empty response from OpenRouter API");
        return "No suggestion available right now.";
    }

    console.log("Food suggestion generated successfully:", suggestion);
    return suggestion;
}
