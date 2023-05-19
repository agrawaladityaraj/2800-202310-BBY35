// import required modules to make the request
import { Configuration, OpenAIApi } from "openai";

// create the configuration object with the api key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// create the openai object with the configuration
const openai = new OpenAIApi(configuration);

// export the openai object
export default openai;
