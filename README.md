# Nextless.js frontend for SaaS 🚀

Nextless.js frontend code for marketing website and user dashboard for your SaaS. It includes example code to build a Todo SaaS application. The landing page includes 9 components blocks: Navbar, Hero, Features, VerticalFeatures, Testimonial, Pricing, FAQ, Banner and Footer. All components are highly customizable so you can modify to meet your requirements.

The Dashboard displays all Todos created by the user in the table component. It also comes up with CRUD operation: you can create, read, update and delete a Todo with the provided code. And the most important things, the frontend is integrated to Stripe with some backend help.

### Requirements

- Node.js and npm

### Getting started

Run the following command on your local environment after cloning the project:

```
cd my-project-name
npm install
```

Then, you can run locally in development mode with live reload:

```
npm run dev
```

Open http://localhost:3000 with your favorite browser to see your project.

### File structure, most important folder

```
.
├── README.md                            # README file
├── netlify.toml                         # Netlify configuration file
├── next.config.js                       # Next JS configuration
├── public                               # Public folder
│   ├── assets
│   │   └── images                       # Image used by default template
├── src
│   ├── hooks                            # React hooks
│   ├── layout
│   │   └── Shell.tsx                    # Dashboard layout using https://nextjs.org/docs/basic-features/layouts
│   ├── pages                            # Next JS Page folder
│   │   ├── _app.tsx                     # Next JS app file
│   │   ├── dashboard
│   │   │   └── index.tsx                # Dashboard index
│   │   └── index.tsx                    # Landing page index
│   ├── styles
│   │   └── main.css                     # Tailwind CSS file
│   ├── templates                        # Templates components are directly used by NextJS pages and they uses primitives components
│   ├── types                            # Types for TypeScript
│   ├── utils                            # Utility folder
│   └── ...                              # All other folders are for primitive components.
│                                        # Primitive components handle the visual part and the customization is done via React Props.
└── tailwind.config.js                   # Tailwind CSS configuration
```

### Customization

You can easily configure Nextless by making a search in the whole project with `FIXME:` for making quick customization. You also need to change the following files:

- `public/apple-touch-icon.png`, `public/favicon.ico`, `public/favicon-16x16.png` and `public/favicon-32x32.png`: your favicon, you can generate from https://favicon.io/favicon-converter/

You have access to the whole code source if you need further customization. The provided code is only example for you to start your SaaS products. The sky is the limit 🚀.

### Deploy to production

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

Now, your blog is ready to be deployed. All generated files are located at `out` folder, which you can deploy with any hosting service. You should be able to deploy on Vercel, Netlify or Amplify Hosting without any issue (more detailed guide will be provided or contact if you need any helps).

### VSCode information (optional)

If you are VSCode users, you can have a better integration with VSCode by installing the suggested extension in `.vscode/extension.json`. The starter code comes up with Settings for a seamless integration with VSCode. The Debug configuration is also provided for frontend and backend debugging experience.

Pro tips: if you need a project wide type checking with TypeScript, you can run a build with <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd> on Mac.

The debug configuration is also provided for VSCode. 3 debug configurations are provided:

| Name | Description |
| --- | ----------- |
| `Next: Chrome` | Launch Google Chrome in debug mode |
| `Next: Node` | Launch Next JS in debug mode |
| `Next: Full` | Launch Google Chrome and Next JS in debug mode |

### Contributions

Everyone is welcome to contribute to this project. Feel free to open an issue if you have question or found a bug.

---

Made with ♥ by [CreativeDesignsGuru](https://creativedesignsguru.com) [![Twitter](https://img.shields.io/twitter/url/https/twitter.com/cloudposse.svg?style=social&label=Follow%20%40Ixartz)](https://twitter.com/ixartz)
