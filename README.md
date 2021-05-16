# demo
This demo shows a way to construct web SPA(single page application) with [vue](https://vuejs.org/) framework.  

## architecture
The dialog, logger and UI are based on native javascript and css technology. For more information, please explore [document](https://github.com/rlsz/VN-framework).

## development
The development relies on [nodejs](https://nodejs.org/en/) and [vue-cli](https://cli.vuejs.org/guide/).
> My vue-cli version is 4.5.9. you can install it globally by `npm install -g @vue/cli@4.5.9`.

steps:
- Enter project root directory, which package.json located on.
- With nodejs installed, execute `npm install` to install all dependencies.
- with vue-cli installed, execute `npm run serve` to run development server. The server address will be shown in command line.
- You can modify any file in `src`. The change will be shown after compiling.

## building
Run command `npm run build`, the `dist` will be shown in project root directory. Zip and upload this folder to a well-configured server to deploy it.

For this demo, you can try a nodejs server in test_build directory:
- Enter test_build by `cd test_build`
- Install all server dependencies by `npm install`
- Start nodejs server by `npm start`
- Browser url `http://localhost:8011`, the server will return `dist/index.html`, the entry of SPA. Any logical address will be target to this entry file, while static address will be target to correct file in `dist` folder.
