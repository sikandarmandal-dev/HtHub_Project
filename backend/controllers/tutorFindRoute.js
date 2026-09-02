const express = require("express");
const axios = require("axios");
const Tutor = require("../models/tutorSchema");

const router = express.Router();

router.post("/search-ai", async (req, res) => {
    const { query } = req.body;

    try {
        const aiResponse = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "user",
                        content: `Extract filters (subject, location, feesRange: low/medium/high) from: ${query}. 
                                  Return ONLY valid JSON with keys: subject, location, feesRange. 
                                  If any field is missing, set it to null.`
                    }
                ]
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        let rawContent = aiResponse.data.choices?.[0]?.message?.content || "{}";

        rawContent = rawContent.replace(/```/g, "").replace(/^json/, "").trim();

        let filters = {};
        try {
            filters = JSON.parse(rawContent);
        } catch (err) {
            console.error("AI response parse error:", err.message);
            filters = {};
        }

        let mongoQuery = {};

        if (filters.subject) {
            mongoQuery.subject = new RegExp(filters.subject, "i");
        }
        if (filters.location) {
            mongoQuery.location = new RegExp(filters.location, "i");
        }
        if (filters.feesRange) {
            if (filters.feesRange === "low") mongoQuery.fees = { $lte: 500 };
            if (filters.feesRange === "medium") mongoQuery.fees = { $gte: 500, $lte: 1000 };
            if (filters.feesRange === "high") mongoQuery.fees = { $gte: 1000 };
        }

        const tutors = await Tutor.find(mongoQuery);
        res.json(tutors);

    } catch (error) {
        console.error("AI search error:", error.message);
        const tutors = await Tutor.find({});
        res.json(tutors);
    }
});

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const axios = require("axios");
// const Tutor = require("../models/tutorSchema");

// router.post("/search-ai", async (req, res) => {
//     const { query } = req.body;

//     try {
//         // AI ko call karna
//         const aiRes = await axios.post(
//             "https://api.groq.com/openai/v1/chat/completions",
//             {
//                 model: "llama-3.3-70b-versatile",
//                 messages: [
//                     {
//                         role: "user", content: `Extract subject, location, feesRange from: ${query}.
//                                   Return JSON only with keys: subject, location, feesRange.` }
//                 ]
//             }, {
//             headers: {
//                 Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
//                 "Content-Type": "application/json"
//             }
//         });

//         // AI ka response parse karna
//         let raw = aiRes.data.choices[0].message.content;
//         raw = raw.replace(/```/g, "").replace(/^json/, "").trim();

//         let filters = {};
//         try {
//             filters = JSON.parse(raw);
//         } catch {
//             filters = {};
//         }

//         // MongoDB query banana
//         let mongoQuery = {};
//         if (filters.subject) mongoQuery.subject = new RegExp(filters.subject, "i");
//         if (filters.location) mongoQuery.location = new RegExp(filters.location, "i");
//         if (filters.feesRange === "low") mongoQuery.fees = { $lte: 500 };
//         if (filters.feesRange === "medium") mongoQuery.fees = { $gte: 500, $lte: 1000 };
//         if (filters.feesRange === "high") mongoQuery.fees = { $gte: 1000 };

//         // Tutors fetch karna
//         const tutors = await Tutor.find(mongoQuery);

//         // ❌ No Tutor Found feature
//         if (tutors.length === 0) {
//             return res.json({ message: "No tutors found", tutors: [] });
//         }

//         res.json({ tutors });

//     } catch (err) {
//         console.error("AI search error:", err.message);
//         const tutors = await Tutor.find({});
//         res.json({ tutors });
//     }
// });

// module.exports = router;

