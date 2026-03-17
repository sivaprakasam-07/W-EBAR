import React, { useEffect, useState } from "react";
import { getFoodDescription } from "../ai/descriptionAI";

const AIDescriptionBox = ({ foodName }) => {
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!foodName) {
            setDescription("");
            setError("");
            return;
        }

        let isMounted = true;

        const fetchDescription = async () => {
            setLoading(true);
            setError("");

            try {
                const result = await getFoodDescription(foodName);
                if (isMounted) {
                    setDescription(result);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message || "Could not load description.");
                    setDescription("");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchDescription();

        return () => {
            isMounted = false;
        };
    }, [foodName]);

    if (!foodName) {
        return null;
    }

    return (
        <div className="w-full max-w-2xl mb-4 rounded-lg border border-gray-700 bg-gray-800/60 p-4">
            <h3 className="text-md font-semibold mb-2">AI Description: {foodName}</h3>
            {loading && <p className="text-gray-300">Generating description...</p>}
            {!loading && error && <p className="text-red-400 text-sm">{error}</p>}
            {!loading && !error && description && (
                <p className="text-gray-100 whitespace-pre-line">{description}</p>
            )}
        </div>
    );
};

export default AIDescriptionBox;
