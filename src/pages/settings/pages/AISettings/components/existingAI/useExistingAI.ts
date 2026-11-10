const useExistingAI = () => {

    const TEST_AI_MODELS = [
        {
            name: "AI Model 1",
            description: "Description for AI Model 1",
            version: "1.0",
            API_URL: "https://example.com/api/v1/model1",
            userName: "User 1",
            password: "password1",
            API_KEY: "api_key_1"
        },
        {
            name: "AI Model 2",
            description: "Description for AI Model 2",
            version: "2.0",
            API_URL: "https://example.com/api/v1/model2",
            userName: "User 2",
            password: "password2",
            API_KEY: "api_key_2"
        }
    ]

    const getExistingAIModels = () => {
        return TEST_AI_MODELS;
    }

    return {
        getExistingAIModels
    }
}

export default useExistingAI;