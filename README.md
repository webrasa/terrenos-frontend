# Terranoss frontend for SaaS 🚀

Terranoss frontend code for marketing website and user dashboard for your SaaS. It includes example code to build a Todo SaaS application. The landing page includes 9 components blocks: Navbar, Hero, Features, VerticalFeatures, Testimonial, Pricing, FAQ, Banner and Footer. All components are highly customizable so you can modify to meet your requirements.

The Dashboard displays all Todos created by the user in the table component. It also comes up with CRUD operation: you can create, read, update and delete a Todo with the provided code. And the most important things, the frontend is integrated to Stripe with some backend help.

### Requirements

- Node.js 18+ (Node.js 20 recommended) and npm

### Getting started

Run the following command on your local environment after cloning the project:

```sh
cd my-project-name
npm install
code . # Open VSCode with command line or open it manually. Please make sure that the file `package.json` is at the root of the project in VSCode. `package.json` should NOT be in a subfolder.
```

Then, you can run locally in development mode with live reload:

```
npm run dev
```

Open http://localhost:3000 with your favorite browser to see your project.

### Bypass authentication (local only)

On you can local environment, you can login to the dashboard by directly browse to https://localhost:3000/dashboard and don't use https://localhost:3000/login.

### File structure, most important folder

```sh
.
├── README.md                               # README file
├── __mocks__                               # Jest mocks folder for mocking imports
├── cypress                                 # Cypress tests folder for E2E tests
│   ├── e2e.js                              # E2E tests
│   ├── fixtures                            # Cypress fixtures folder
│   ├── support                             # Cypress support folder
│   └── utils                               # Cypress utils folder
├── next.config.js                          # Next.js configuration
├── public                                  # Public folder
│   └── assets
│       └── images                          # Image used by default template
├── src
│   ├── hooks                               # React hooks
│   ├── layouts
│   │   └── Shell.tsx                       # Dashboard layout using https://nextjs.org/docs/basic-features/layouts
│   ├── pages                               # Next.js pages
│   │   ├── _app.tsx                        # Next.js app
│   │   ├── dashboard
│   │   │   ├── index.tsx                   # Dashboard index
│   │   ├── index.tsx                       # Landing page index
│   ├── pages.test                          # Next.js pages tests
│   │   └── dashboard
│   ├── styles
│   │   └── global.css                      # Tailwind CSS file
│   ├── templates                           # Templates components are directly used by NextJS pages and they uses primitives components
│   │   ├── account                         # Templates used in the account settings page
│   │   ├── auth                            # Templates used in the authentication process
│   │   ├── invite                          # Templates used in the invitation process
│   │   ├── shell                           # Templates used in the dashboard layout
│   │   └── team                            # Templates used in the team-related page
│   ├── types                               # Types for TypeScript
│   └── utils                               # Utilities
│   └── ...                                 # All other folders are for primitive components.
│                                           # Primitive components handle the visual part and the customization is done via React Props.
│                                           # Primitive components are used in templates and templates are used in pages.
└── tailwind.config.js                      # Tailwind CSS configuration
```

### Customization

You can easily configure Terranoss by making a search in the whole project with `FIXME:` for making quick customization. You also need to change the following files:

- `public/apple-touch-icon.png`, `public/favicon.ico`, `public/favicon-16x16.png` and `public/favicon-32x32.png`: your favicon, you can generate from https://favicon.io/favicon-converter/

You have access to the whole code source if you need further customization. The provided code is only example for you to start your SaaS products. The sky is the limit 🚀.

### Deploy to production with Amplify Hosting (like Vercel or Netlify on AWS)

If you deploy for the first time, please checkout [this guide](https://github.com/Nextlessjs/Quick-Start-sql/blob/main/PRODUCTION_DEPLOYMENT.md).

You can host the frontend on Vercel, Netlify or Cloudflare Pages without any issue. But, if you want to have everything inside your AWS account, you can host easily on Amplify Hosting. And, here is the steps.

Go your to AWS Console, then select `AWS Amplify` service. At the bottom of the page, you can select `Amplify Hosting` by clicking on `Get started` button. You just need to follow the setup process by selecting your Git repository. The project has already included a `amplify.yml`. So you don't need to configure anything.

At the end of the process, your frontend is now deployed on your AWS account.

### Manual deployment to production

You can see the results locally in production mode with:

```
$ npm run build
$ npm run start
```

The generated HTML and CSS files are minified (built-in feature from Next js). It will also removed unused CSS from [Tailwind CSS](https://tailwindcss.com).

You can create an optimized production build with:

```
npm run build-prod
```

Now, your frontend is ready to be deployed. All generated files are located at `out` folder and you can deploy these files to any hosting services. You should be able to deploy on Vercel, Netlify or Amplify Hosting without any issue. If you choose to host on AWS, you can read the previous section on how to deploy on Amplify Hosting. With all modern static hosting, you can setup an automated preview of every commit.

### Testing

All unit tests are located close to the source code in the same folder. For example, a file located at `src/layouts/` with the name `RandomLayout.ts` will have a unit test file located at `src/layouts/RandomLayout.test.ts`.

> :warning: The behavior for Next.js pages is different. The unit tests are located at `src/pages.test/`. This avoids Next.js to consider the test as a page.

In `./cypress` folder, you'll find all files related to Cypress, the E2E testing framework. To run the E2E tests, you can run the following command:

```sh
npm run e2e:headless
```

It'll run all the tests in headless mode and you can only see the final results. If you are writing a new test or editing an existing test, you can run the following command:

```sh
npm run e2e
```

It'll open the Cypress app where you can easily debug, visual see the results, time travel, and interact with the application.

### Server-side rendering (SSR)

All the Next.js pages are statically generated for the marketing pages and also for the dashboard pages. So, all the pages are pre-rendered for SEO and performance. If you need to enable SSR for a specific page, you can do it by adding `getServerSideProps` method to your page.

### VSCode information (optional)

If you are VSCode users, you can have a better integration with VSCode by installing the suggested extension in `.vscode/extension.json`. The starter code comes up with Settings for a seamless integration with VSCode. The Debug configuration is also provided for frontend and backend debugging experience.

Pro tips: if you need a project wide type checking with TypeScript, you can run a build with <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd> on Mac.

The debug configuration is also provided for VSCode. 3 debug configurations are provided:

| Name | Description |
| --- | ----------- |
| `Next: Chrome` | Launch Google Chrome in debug mode |
| `Next: Node` | Launch Next JS in debug mode |
| `Next: Full` | Launch Google Chrome and Next JS in debug mode |

### Going further with third party tool (optional)

- Setting up Sentry for Application Monitoring and Error Tracking.

### Contributions

Everyone is welcome to contribute to this project. Feel free to open an issue if you have question or found a bug.

---

Made with ♥ by [CreativeDesignsGuru](https://creativedesignsguru.com) [![Twitter](https://img.shields.io/twitter/url/https/twitter.com/cloudposse.svg?style=social&label=Follow%20%40Ixartz)](https://twitter.com/ixartz)
