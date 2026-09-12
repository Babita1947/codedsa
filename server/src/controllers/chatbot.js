import { Mistral } from '@mistralai/mistralai';
import 'dotenv/config';
import { Problem } from '../models/problem.models.js';

const chatbotController = async (req, res) => {
    console.log("Chatbot Controller called");
    const { prompt, problemId } = req.body;
    const apiKey = process.env.MISTRAL_API_KEY;
    const client = new Mistral({ apiKey });

    try {
        if (!prompt || !problemId) {
            console.log("Please enter your question !!");
            return res.status(400).json({
                message: "Please enter your question !!"
            });
        }

        const problem = await Problem.findById(problemId);
        console.log("Find problem", problem);

        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        const chatResponse = await client.chat.stream({
            model: 'open-mistral-7b',
            messages: [
                { role: 'system', content: `You are an expert DSA coding assistant. The problem details are: ${JSON.stringify(problem)}` },
                { role: 'system', content: "Only answer questions related to the given problem. Provide clear, well-structured answers using standard Markdown (with headers, bullet points, syntax-highlighted code blocks, and well-formatted tables). When creating Markdown tables, ALWAYS place each row on a separate new line and separate the header from data rows with standard Markdown delimiter '|---|'." },
                { role: 'user', content: prompt }
            ],
        });

        for await (const item of chatResponse) {
            const streamText = item.data.choices[0]?.delta?.content;
            if (typeof streamText === "string") {
                // Send JSON encoded chunk so newlines and spaces are never lost
                res.write(`data: ${JSON.stringify({ text: streamText })}\n\n`);
            }
        }

        res.write("data: [DONE]\n\n");
        res.end();

    } catch (error) {

        console.log("Chatbot Controller: ",error);
        res.status(500).json({
            message: "Failed to fetch data"
        });
    }
};

export default chatbotController;
