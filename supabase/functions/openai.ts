import {ChatCompletionMessage, OpenAI} from 'openai';
import {APIResponse} from './api.ts';

/**
 *
 * @returns
 */
export const getOpenAIClient = () => {
    return new OpenAI(Deno.env.get('OPEN_AI_API_KEY')!);
};

/**
 *
 * @param client
 * @param messages
 * @returns
 */
export const getChatCompletion = async (client: OpenAI, messages: ChatCompletionMessage[]): Promise<APIResponse<ChatCompletionMessage, Error>> => {
    try {
        const chatCompletionResponse = await client.createChatCompletion({
            model: 'gpt-4', messages,
        });

        return {
            data: chatCompletionResponse.choices[0].message, error: null,
        };
    } catch (e) {
        console.error(e);
        return {
            data: null, error: e,
        };
    }
};
