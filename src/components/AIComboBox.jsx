import React, { useEffect, useState } from "react";
import { getComboSuggestion } from "../ai/comboAI";

const AIComboBox = ({ selectedItems }) => {
    const [suggestion, setSuggestion] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchCombo = async () => {
            if (!selectedItems || selectedItems.length === 0) {
                setSuggestion("");
                return;
            }

            setLoading(true);
            try {
                const result = await getComboSuggestion(selectedItems);
                if (isMounted) {
                    setSuggestion(result);
                }
            } catch (error) {
                if (isMounted) {
                    setSuggestion(error.message || "Unable to fetch combo suggestion right now.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchCombo();

        return () => {
            isMounted = false;
        };
    }, [selectedItems]);

    return (
        <div className="mt-4 p-4 bg-slate-900 border border-slate-700 rounded-xl w-full max-w-2xl">
            <p className="text-sm text-gray-400 mb-2">🤖 AI Combo Suggestion</p>
            <p className="text-white font-medium">
                {loading ? "Finding the best combo for your selections..." : suggestion}
            </p>
        </div>
    );
};

export default AIComboBox;
