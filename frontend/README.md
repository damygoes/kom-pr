# KOM-PR

#### Built by a cylist for cyclists

[KOM-PR][kompr] is an app built to showcase various cycling climbs in different parts of the world (including those used in world tours) as well as help cyclists optimize PRs on various Strava segments.

## Features

- Explore and visit climbs (both local and world-famous) in different parts of the world.
- Optimize your PR on chosen segments through proper and adequate planning.
- Dynamic search using Elastic Search
- Image upload and optimization using Amazon S3

> As the saying goes:
> "He who fails to prepare, prepares to fail
> Therefore, Preparation is KEY

[KOM-PR][kompr] provides you with adequate information about a chosen climb of interest, suggest highly-rated hotels and holiday homes close to the climb. Cyclists can chose the time and day they wish to explore a climb or Strava segement and prepare actually to actualise a Personal Record. [KOM-PR][kompr] makes use of the cylist's information (such as weight, bike weight, FTP and Watt per Kilo) and weather conditons at the time chosen by the cyclist to calculate possible Personal Record estimates.

## Tech

[KOM-PR][kompr] uses a number of tools to provide you the best experience possible:

- The backend is built on:
  - [Node.js] - evented I/O for the backend
  - [Express] - fast node.js network app framework
  - [MongoDB] - developer-friendly NoSQL database
  - [Mongoose] - elegant [mongodb][mongodb] object modeling for [node.js][node.js]
  - [JSONWebToken] - JsonWebToken implementation for [node.js][node.js]
  - [Morgan] - HTTP request logger middleware for [node.js][node.js]
- The frontend is built on:
  - [Reactjs] - a JavaScript library for building user interfaces
  - [Material UI] - a comprehensive library of components that features the implementation of Google's Material Design system
  - [Axios] - Promise-based HTTP client for the browser and [node.js][node.js]
  - [Redux] - a Predictable State Container for JS apps
  - [Redux Toolkit] - the official, opinionated, batteries-included toolset for efficient Redux development

## The API

The [KOM-PR][kompr] backend API is a [REST API][rest api] that requires [Node.js](https://nodejs.org/) v16+ to run.

```sh
API URL: https://kompr-api.onrender.com
```

| HTTP | ROUTE               | DESCRIPTION                                                     |
| ---- | ------------------- | --------------------------------------------------------------- |
| GET  | /                   | returns an array of all climbs                                  |
| GET  | /random             | returns a random climb                                          |
| GET  | /climbs/:name       | returns a single document that matches the specified climb name |
| GET  | /countries/:country | returns an array of all climbs located in the specified country |

## Development

Want to contribute? Great! Feel free to contact me on:

- [Github][github]
- [LinkedIn][linkedin]
- 📬 Email: *badadamilola@gmail.com*

## License

MIT

**Free Software, Hell Yeah!**

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[kompr]: https://kom-pr.vercel.app
[github]: https://github.com/damygoes
[linkedin]: https://www.linkedin.com/in/damilolabada
[node.js]: http://nodejs.org
[express]: http://expressjs.com
[mongodb]: https://www.mongodb.com
[mongoose]: https://mongoosejs.com
[jsonwebtoken]: https://github.com/auth0/node-jsonwebtoken#readme
[morgan]: https://github.com/expressjs/morgan#readme
[reactjs]: https://reactjs.org
[material ui]: https://mui.com
[axios]: https://github.com/axios/axios
[redux]: https://redux.js.org
[redux toolkit]: https://redux-toolkit.js.org
[rest api]: https://www.ibm.com/cloud/learn/rest-apis
