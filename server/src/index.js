const express = require('express');
//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

const OPENAI_API_KEY = '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';
const { Configuration, OpenAIApi } = require('openai');
const cors = require('cors');

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


// openai.listEngines().then((response) => {
//     console.log(response);
// });
const app = express();
app.use(cors());

app.use(express.json());

app.get("/ping", (req, res) => {
    res.json({
        message: "pong",
    });
});

app.post("/chat", (req, res) => {
    const question = req.body.question;

    openai
    .createCompletion({
        model: "text-davinci-003",
        prompt: question,
        max_tokens: 4000,
        temperature: 0,
    })
        .then((response) => {
            console.log({response});
            return response?.data?.choices?.[0]?.text;
        })
        .then((answer) => {
            console.log({answer});
            const array = answer
            ?.split("\n")
            .filter((value) => value)
            .map((value) => value.trim());

            return array;
        })

        .then((answer) => {
            res.json({
                answer: answer,
                propt: question,
            });
        });

    console.log({ question });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});






