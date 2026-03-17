import React, { useState } from "react";
import { getFoodSuggestion } from "../ai/assistantAI";

const AIAssistant = ({ onSelectFood }) => {
    const [userInput, setUserInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getEmoji = (food) => {
        const map = {
            Burger: "🍔",
            Pizza: "🍕",
            Fries: "🍟",
            Coke: "🥤",
            "Ice Cream": "🍨",
            Noodles: "🍜",
            "Veg Sushi": "🍣",
            Taco: "🌮",
            "Chicken Biryani": "🍛",
            "Tandoori Chicken": "🍗",
            "Tandoori mix grill": "🍖",
            "2 person combo": "👥",
            Pepsi: "🥤",
            Fanta: "🥤",
            Sprite: "🥤"
        };
        return map[food] || "🍽️";
    };

    const handleSuggest = async () => {
        if (!userInput.trim()) {
            setError("Please type what you want to eat.");
            return;
        }

        setLoading(true);
        setError("");
        setSuggestions([]);

        try {
            const suggestion = await getFoodSuggestion(userInput.trim());
            // Parse newline-separated response into array
            const items = suggestion
                .split("\n")
                .map((item) => item.trim())
                .filter((item) => item.length > 0);
            setSuggestions(items);
        } catch (err) {
            setError(err.message || "Failed to fetch suggestion.");
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSuggestionClick = (item) => {
        const [name] = item.split(" - ");
        if (onSelectFood && name?.trim()) {
            onSelectFood(name.trim());
        }
        setUserInput(name?.trim() || "");
    };

    return (
        <div className="w-full max-w-2xl mb-4 rounded-lg border border-gray-700 bg-gray-800/60 p-4">
            <h2 className="text-lg font-semibold mb-3 text-white">AI Food Assistant</h2>
            <div className="flex flex-col sm:flex-row gap-2 mb-3">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSuggest()}
                    placeholder="Tell AI your craving..."
                    className="flex-1 p-3 rounded-md bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="button"
                    onClick={handleSuggest}
                    disabled={loading}
                    className="px-4 py-3 rounded-md bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50 text-white font-medium"
                >
                    {loading ? "Thinking..." : "Send"}
                </button>
            </div>

            {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

            {suggestions.length > 0 && (
                <div className="mt-4">
                    <p className="text-sm text-gray-300 mb-2">AI Suggestions:</p>
                    <div className="flex flex-col gap-3 mt-4">
                        {suggestions.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleSuggestionClick(item)}
                                className="bg-slate-800 text-white p-4 rounded-xl shadow-md hover:scale-105 transition cursor-pointer border border-slate-700 hover:border-blue-500"
                            >
                                {(() => {
                                    const [name, description] = item.split(" - ");
                                    return (
                                        <>
                                            <p className="font-semibold text-lg">{getEmoji((name || "").trim())} {(name || "").trim()}</p>
                                            <p className="text-gray-300 text-sm">{(description || "").trim()}</p>
                                        </>
                                    );
                                })()}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIAssistant;
