import axios from "axios";
// import vars from env

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const PLUGIN_ID1 = process.env.NEXT_PUBLIC_PLUGIN_ID1;
const PLUGIN_ID2 = process.env.NEXT_PUBLIC_PLUGIN_ID2;
// add plugins if necessary


export const createChatBot = async () => {
    let data = JSON.stringify({
        "pluginIds": [PLUGIN_ID1, PLUGIN_ID2],
        "externalUserId": "1"
    });

    let config = {
        method: 'post',
        url: API_URL,
        headers: { 
            'apikey': API_KEY, 
            'Content-Type': 'application/json'
        },
        data : data
    };

    // Return a promise from the function
    return new Promise((resolve, reject) => {
        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                // Resolve the promise with the chat session ID
                resolve(response.data['chatSession']['id']);
            })
            .catch((error) => {
                console.log(error);
                reject(error); // Reject the promise if there's an error
            });
    });
}

export const getChatbotResponse = async (prompt, sessionId) => {

    let data = JSON.stringify({
        "endpointId": "predefined-openai-gpt4o",
        "query": prompt,
        "pluginIds": [
            PLUGIN_ID1, PLUGIN_ID2
        ],
        "responseMode": "sync"
    });
    
    let config = {
    method: 'post',
    url: `${API_URL}/${sessionId}/query`,
    headers: { 
        'apikey': API_KEY, 
        'Content-Type': 'application/json'
    },
    data : data
    };
    
    return new Promise((resolve, reject) => {
        axios.request(config)
        .then((response) => {
            resolve(response.data['chatMessage']['answer']);
        })
        .catch((error) => {
        reject(error)
        });
    });
}