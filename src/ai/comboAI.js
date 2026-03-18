const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function getComboSuggestion(selectedItems) {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

    if (!apiKey) {
        console.error("OpenRouter API key is missing for combo suggestion.");
        throw new Error("Missing OpenRouter API key. Set VITE_OPENROUTER_API_KEY in your environment.");
    }

    if (!Array.isArray(selectedItems) || selectedItems.length === 0) {
        return "Select items to get a combo suggestion.";
    }

    const prompt = `
Selected items: ${selectedItems.join(", ")}

From this menu:
Burger, Pizza, Fries, Coke, Ice Cream, Noodles, Veg Sushi, Veg Indian Thali, Taco, Chicken meal, Chicken Biryani, Tikkawrap meal, Meallet 2, Large Burger, Tandoori Chicken, Burger with fries, Fries with Coke, Tandoori mix grill, 2 person combo, Pepsi, Redbull, Fanta, Coca Cola, Sprite

Rules:

* Suggest 1 combo or add-on
* Use only items from menu
* Keep it short (max 1 sentence)
* Do not repeat already selected items
* Make it sound appealing
* No extra explanation

Output example:
Try Fries with Coke for a perfect combo
`;

    const headers = {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "FastFoodAR"
    };

    console.log("Calling OpenRouter API for combo suggestion...", {
        url: OPENROUTER_API_URL,
        model: "meta-llama/llama-3-8b-instruct",
        selectedItems
    });

    let response;
    try {
        response = await fetch(OPENROUTER_API_URL, {
            method: "POST",
            headers,
            body: JSON.stringify({
                model: "meta-llama/llama-3-8b-instruct",
                messages: [{ role: "user", content: prompt }]
            })
        });
    } catch (fetchError) {
        console.error("Combo fetch error:", fetchError);
        throw new Error(`Network error: ${fetchError.message}`);
    }

    console.log(`Combo suggestion response status: ${response.status}`);

    if (!response.ok) {
        let details = `API returned status ${response.status}`;
        try {
            const errorData = await response.json();
            console.error("Combo suggestion API error response:", errorData);
            details = errorData?.error?.message || details;
        } catch (parseError) {
            console.error("Could not parse combo error response:", parseError);
            const text = await response.text();
            console.error("Combo response text:", text);
        }
        throw new Error(details);
    }

    let data;
    try {
        data = await response.json();
    } catch (parseError) {
        console.error("Failed to parse combo success response:", parseError);
        throw new Error("Invalid response format from OpenRouter API");
    }

    const suggestion = data?.choices?.[0]?.message?.content?.trim();
    if (!suggestion) {
        return "Try Fries with Coke for a perfect combo.";
    }

    console.log("Combo suggestion generated successfully:", suggestion);
    return suggestion;
}
