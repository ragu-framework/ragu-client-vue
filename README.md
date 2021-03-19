<p align="center" style="color: #343a40">
  <p align="center" >
    <img src="repository-assets/banner.png" alt="Ragu" align="center" style="max-width: 100%">
  </p>
  <h1 align="center">Ragu Client Vue</h1>
</p>

![Testing](https://github.com/ragu-framework/ragu-client-vue/workflows/Testing/badge.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![npm version](https://badge.fury.io/js/ragu-client-vue.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

A React Client for [Ragu Server - A micro-frontend framework](https://ragu-framework.github.io).

## Installation

```shell script
npm install ragu-client-vue
```

## How to Use

```vue
<template>
    <RaguComponent
      src="https://ragu-framework.github.io/ragu-vue-server-adapter/quick-start.json"
      v-on:rendered="rendered"
      v-on:fetched="fetched"
      v-on:fetch-fail="fetchFail"
    />
</template>

<script>
import RaguComponent from 'ragu-client-vue';

export default {
  name: 'App',
  components: {
    RaguComponent
  },
  methods: {
    rendered() {
      console.log('rendered');
    },
    fetched() {
      console.log('fetched');
    },
    fetchFail() {
      console.log('fetched-fail');
    }
  }
}
</script>
```

| Property         	| Description                                                                           	| Required 	| Default 	|
|------------------	|---------------------------------------------------------------------------------------	|----------	|---------	|
| src              	| The micro-frontend URL                                                                	| true     	| -       	|
| v-on:fetched   	| A callback called when component fetch is finished.                                   	| false    	| -       	|
| v-on:fetch-fail  	| A callback called when component fetch fails.                                         	| false    	| -       	|
| v-on:rendered 	| A callback called when component was hydrated (it means, the render process finished) 	| false    	| -       	|


## Development notes

### Project setup
```
yarn install
yarn build
```

#### Compiles a demo using the library
```
yarn serve
```
