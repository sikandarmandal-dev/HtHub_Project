// const express = require("express");
// const axios = require("axios");

// const router = express.Router();

// router.get("/groq-tests", async (req, res) => {

//     try {

//         const response = await axios.post(
//             "https://api.groq.com/openai/v1/chat/completions",
//             {
//                 model: "llama-3.3-70b-versatile",

//                 messages: [
//                     {
//                         role: "user",
//                         content: "Hello"
//                     }
//                 ]
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
//                     "Content-Type": "application/json"
//                 }
//             }
//         );

//         res.json({
//             success: true,
//             message: response.data.choices[0].message.content
//         });

//     } catch (error) {

//         console.log(error.response?.data || error.message);

//         res.status(500).json({
//             success: false,
//             error: error.response?.data || error.message
//         });
//     }
// });

// module.exports = router;



// const express = require("express");
// const axios = require("axios");
// const router = express.Router();

// // Parse (debug/test only)
// router.post("/parse", async (req, res) => {
//     const { query } = req.body;
//     try {
//         const response = await axios.post(
//             "https://api.groq.com/openai/v1/chat/completions",
//             {
//                 model: "llama-3.1-70b-versatile",
//                 messages: [
//                     { role: "user", content: `Extract filters (subject, location, feesRange: low/medium/high) from: ${query}. Return JSON.` }
//                 ]
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
//                     "Content-Type": "application/json"
//                 }
//             }
//         );
//         const filters = JSON.parse(response.data.choices[0].message.content);
//         res.json({ success: true, filters });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });


// module.exports = router;
