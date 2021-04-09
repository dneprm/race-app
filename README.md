# insider-test-task

## Info

### Application allows:
1. Generate Race Laps
2. Start/pause Race

The initial list of 20 horses is generated randomly from horse.json file ( randomly generated json with 1000 horses each with its name, condition and color loaded from [mockaroo.com](https://www.mockaroo.com/)).

Button "Generate" creates a Race schedule consisting of 6 runs (1200m, 1400m, 1600m, 1800 m, 2000m, 2200m).

Button "Start/Pause" starts(pauses) the Race, 6 rounds run one by one. Results are written in the Result tables.

When the Race is finished the new Race can be generated an run again.

## Getting started

1. Go to project folder and install dependencies:

```bash
npm install
```

2. Launch development server, and open `localhost:8080` in your browser:

```bash
npm run serve
```

## Project structure

```
dist/                        compiled version
public/                      for index.html template and other static assets
src/                         project source code
|- assets/                   app assets (images, fonts, styles...)
|- components/               app components
|- helpers/                  helper functions
|- layouts/                  layouts
|- locales/                  translations files
|- pages/                    app pages used for routing
|- plugins/                  app plugins (axios, i18n, vuetify etc)
|- router/                   app routing
|- static/                   for static assets to be compiled (svg etc)
|- store/                    app vuex store
|- App.vue                   main app component
|- main.js                   app entry point
vue.config.js                vue configuration
babel.config.js              babel configuration
package.json                 
README.md                    
.env                                         
```

## Main tasks

| Tasks                         | Description                                                                                                                         |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| npm run serve                     | Compiles and hot-reloads for development. Runs development server on `http://localhost:8080`|                                                                                  
| npm run build                 | Compiles and minifies for production `dist/` folder                                                                              |
| npm run lint                  | Runs linter                                                                                    |
| npm run svg                   | Generates svg icon components                                                                        |


## Development server

Run `npm run serve` for a dev server. Navigate to `http://localhost:8080/`. The app will automatically reload if you change
any of the source files.


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
