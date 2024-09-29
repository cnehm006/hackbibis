const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// Initialize OpenAI API with API key
const configuration = new Configuration({apiKey: "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" // Replace with your actual OpenAI API key
});

const openai = new OpenAIApi(configuration);

// Serve frontend files
app.use(express.static(path.join(__dirname, "frontend")));

// Serve index.html when visiting the root /
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "html", "index.html"));
});

// Endpoint to process multiple file URLs and generate questions
app.post("/process-files", async (req, res) => {
  try {
    // Ensure fileURLs is provided and valid
    const fileURLs = JSON.parse(req.body.fileURLs);
    if (!fileURLs || !Array.isArray(fileURLs)) {
      return res.status(400).json({ error: "Invalid file URLs provided." });
    }

    let allQuestions = '';
    for (const fileURL of fileURLs) {
      try {
        const aiResponse = await openai.createChatCompletion({
          model: "gpt-4o",
          messages: [{ role: "user", content: `Generate multiple-choice questions based on the content from this file: ${fileURL}` }],
          max_tokens: 1500,
          temperature: 0.7
        });

        allQuestions += aiResponse.data.choices[0].message.content + '\n';
      } catch (error) {
        console.error("Error generating questions:", error);
        return res.status(500).json({ error: "Error generating questions for file: " + fileURL });
      }
    }

    res.json({ questions: allQuestions });
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});