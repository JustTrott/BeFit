import axios from "axios";
// import vars from env

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;


export const createChatBot = async () => {
    let data = JSON.stringify({
        "pluginIds": ['plugin-1714851345', 'plugin-1714883192'],
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
        "endpointId": "predefined-openai-gpt4turbo",
        "query": prompt,
        "pluginIds": [
            "plugin-1714851345", 'plugin-1714883192'
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