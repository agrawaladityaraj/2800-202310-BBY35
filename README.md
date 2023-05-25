<div align="center">
<h1> IntelliPaws BBY-35 </h1>
    <img src="https://github.com/agrawaladityaraj/2800-202310-BBY35/tree/main/assets/images/logo.png" alt="Logo" width="80" height="80">
</div>

## Team Members

| Name                                          | Role                              | GitHub                                        | LinkedIn                                                              |
| --------------------------------------------- | --------------------------------- | --------------------------------------------- | --------------------------------------------------------------------- |
| [Simrat](https://github.com/SimratKaur2)      | Frontend Developer, Product Owner | [GitHub](https://github.com/SimratKaur2)      | [LinkedIn](https://www.linkedin.com/in/simrat-kaur5980/)              |
| [Michelle](https://github.com/michelle-0)     | Frontend Developer, QA Engineer   | [GitHub](https://github.com/michelle-0)       | [LinkedIn](https://www.linkedin.com/in/michelle-hung-596978262/)      |
| [Aditya](https://github.com/agrawaladityaraj) | Lead Developer                    | [GitHub](https://github.com/agrawaladityaraj) | [LinkedIn](https://www.linkedin.com/in/aditya-raj-agrawal-6b43971b5/) |
| [Shawn](https://github.com/shawnbirring)      | Project Manager, AI Integration   | [GitHub](https://github.com/shawnbirring)     | [LinkedIn](https://www.linkedin.com/in/shawnbirring/)                 |

## Project Description

Our team is developing IntelliPaws which helps potential or current dog users with their dog, the app can reccomend a dog breed based on your lifestyle, provide training with exercises and it can help you learn more about your dog.

## Technologies Used

Below are the technologies used in this project with their respective documentations, licenses and usage areas.

| Technology  | Documentation                                                             | License                                                                                      | Usage                            |
| ----------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------- |
| Next.js     | [Next.js Docs](https://nextjs.org/docs)                                   | [MIT License](https://github.com/vercel/next.js/blob/canary/license.md)                      | Frontend, Server-side rendering  |
| React.js    | [React.js Docs](https://reactjs.org/docs/getting-started.html)            | [MIT License](https://github.com/facebook/react/blob/main/LICENSE)                           | User Interface (Frontend)        |
| Prisma      | [Prisma Docs](https://www.prisma.io/docs/)                                | [Apache License, Version 2.0](https://github.com/prisma/prisma/blob/main/LICENSE)            | Database Management (Backend)    |
| TypeScript  | [TypeScript Docs](https://www.typescriptlang.org/docs/)                   | [Apache License, Version 2.0](https://github.com/microsoft/TypeScript/blob/main/LICENSE.txt) | Typing, Codebase Structure       |
| Node.js     | [Node.js Docs](https://nodejs.org/en/docs/)                               | [MIT License](https://github.com/nodejs/node/blob/master/LICENSE)                            | Runtime Environment (Backend)    |
| NextAuth.js | [NextAuth.js Docs](https://next-auth.js.org/getting-started/introduction) | [MIT License](https://github.com/nextauthjs/next-auth/blob/main/LICENSE)                     | Authentication (Backend)         |
| Material-UI | [Material-UI Docs](https://material-ui.com/getting-started/installation/) | [MIT License](https://github.com/mui-org/material-ui/blob/next/LICENSE)                      | User Interface Design (Frontend) |
| Mantine     | [Mantine Docs](https://mantine.dev/docs/getting-started/)                 | [MIT License](https://github.com/mantinedev/mantine/blob/master/LICENSE)                     | User Interface Design (Frontend) |
| OpenAI API  | [OpenAI API Docs](https://beta.openai.com/docs/)                          | [OpenAI API Terms](https://openai.com/policies)                                              | AI Model Generation (Backend)    |
| Prettier    | [Prettier Docs](https://prettier.io/docs/en/)                             | [MIT License](https://github.com/prettier/prettier/blob/main/LICENSE)                        | Code Formatting                  |
| Vercel      | [Vercel Docs](https://vercel.com/docs)                                    | [MIT License](https://github.com/vercel/vercel/blob/main/LICENSE.md)                         | Deployment and Hosting           |

## How to install or run the project

1. Clone the repository to your local machine
2. Run `npm install` to install the project dependencies
3. Create `.env` and `.env.local` files in your root directory, following the example provided in `.env.example`.
4. Run `npm run dev` to start the local development server
5. Install PostgreSQL database and set it up using the instructions found at [PostgreSQL official page](https://www.postgresql.org/)
6. Prisma Client needs to be generated with `npx prisma generate`
7. Seed the database using the script `importCsvToPrisma.js` located in `dataset` folder.
8. You need to get an API key from OpenAI to use the GPT-3 model in this application. Add this key to your `.env` file.

## How to use the product (Features)

- **Training:** Users can access various dog training exercises and lessons, which are personalized based on their dog.
- **Chatbot:** Users can chat with a chatbot to get personalized advice on anything dog related.
- **PlaceHolder:** More features to be added in the future.

## Use of AI

1. **Use of AI to help create application** We used ChatGPT to help debug issues ( so many type script errors ), teach us about the technologies we were using (MUI, Mantine, Prisma, NextJS, ReactJS) and to help us with the project.
2. **Dataset:** The data set we used had a 10/10 usaboility score, it was easy to use and it was easy to import into our database since we did not have to clean it.
3. **IntelliPaws ChatBot:** GPT-3.5-turbo model is used to generate chat messages and respond to user queries in the application to assist users in dog related questions.
4. **Lesson / Exercise Generation:** GPT-3.5-turbo model is used for generating personalized dog training lessons and exercises, as well as providing breed-specific recommendations.
5. **Dog Breed Reccomendation:** GPT-3.5-turbo model is used to create a guided conversation with the user to determine the best dog breed for them.
6. **Limitations:** The ai may return incorrect JSON format, we fixed this by using a try catch block and making prompt that to correct the JSON format. The chatbot will also answer questions that are unrealted to what it is supposed to talk about.

## Listing of File Contents

```bash
.
├── .env
├── .env.local
├── .env.example
├── .eslintrc.json
├── .gitignore
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
├── assets
│   └── images
│       ├── dog.gif
│       ├── dog1.png
│       ├── dog3.gif
│       ├── doggy4.jpg
│       ├── dogprofile.png
│       ├── Logo.png
│       └── lostDog.png
├── components
│   ├── AddDog.tsx
│   ├── Alert.tsx
│   ├── AuthWrapper.tsx
│   ├── ChatComponent.tsx
│   ├── DailyTip.tsx
│   ├── DogInformation.tsx
│   ├── Exercise.tsx
│   ├── Footer.tsx
│   ├── JourneyStep.tsx
│   ├── JourneyStepper.tsx
│   ├── MountedWrapper.tsx
│   ├── Navbar.tsx
│   ├── Provider.tsx
│   └── StyledStepper.tsx
├── Constants
│   ├── DogBehaviours.ts
│   ├── EmptyDog.ts
│   ├── EmptyDogBreed.ts
│   ├── index.ts
│   ├── InitialContext.ts
│   └── InitialState.ts
├── Context
│   ├── Context.tsx
│   ├── Reducer.tsx
│   └── State.tsx
├── dataset
│   ├── dog_breeds.csv
│   └── importCsvToPrisma.js
├── Hooks
│   └── useSmall.tsx
├── lib
│   ├── fetchDogBreeds.ts
│   └── prisma.ts
├── models
│   ├── IAlert.ts
│   ├── IChatGPTMessage.ts
│   ├── IContext.ts
│   ├── IDog.ts
│   ├── IDogBreed.ts
│   ├── IExercise.ts
│   ├── ILesson.ts
│   ├── index.ts
│   ├── IState.ts
│   └── IUser.ts
├── pages
│   ├── 404.tsx
│   ├── dog.tsx
│   ├── dogbreeds.tsx
│   ├── homepage.tsx
│   ├── index.tsx
│   ├── reccomendation.tsx
│   ├── temphome.tsx
│   ├── training.tsx
│   ├── user_profile.tsx
│   ├── _app.tsx
│   ├── add_dog
│   │   ├── adopted.tsx
│   │   ├── health.tsx
│   │   ├── index.tsx
│   │   └── training.tsx
│   ├── api
│   │   ├── auth
│   │   │   └── [...nextauth].ts
│   │   ├── dog
│   │   │   ├── add.ts
│   │   │   └── [ownerId].tsx
│   │   ├── openai
│   │   │   ├── generateChat.ts
│   │   │   ├── generateExercises.ts
│   │   │   ├── generateLessons.ts
│   │   │   └── generateRecomendation.ts
│   │   ├── user
│   │   │   └── [email].ts
│   │   └── vaccine
│   │       └── add.ts
│   ├── dog
│   │   └── [id].tsx
│   └── lessons
│       └── [id]
│           ├── generate.tsx
│           └── index.tsx
├── prisma
│   ├── schema.prisma
│   └── migrations
│       ├── 20230511214237_dogbreedremoval
│       │   └── migration.sql
│       ├── 20230511214415_restore
│       │   └── migration.sql
│       └── 20230511214754_
│           └── migration.sql
├── PromptUtils
│   ├── chatUtils.ts
│   ├── exerciseUtils.ts
│   ├── lessonUtils.ts
│   └── reccomendationUtils.ts
├── public
│   ├── favicon.ico
│   ├── next.svg
│   └── vercel.svg
├── styles
│   ├── globals.css
│   └── Homepage.module.css
└── Utils
    ├── correctJSON.ts
    └── openaiConfig.ts
```
