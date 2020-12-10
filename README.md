
<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h1 align="center">JavaScript PubSub</h1>

  <p align="center">
    Small and fast JavaScript PubSub library designed for writing maintainable and code in JavaScript.
    <br />
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
* [Usage](#usage)
* [API](#api)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)


<!-- ABOUT THE PROJECT -->
## About The Project
This is simple library designed with NextJS and ReactJS demonstrate how to handle session data between pages with client-side routing.

### Built With
This library is designed with technologies listed below - 
* [JavaScript](https://www.javascript.com/)


<!-- GETTING STARTED -->
## Getting Started

This library is designed to work with both Node.js and browser without issue. PubSub is a messaging pattern is a design pattern that provides a framework for exchanging messages that allows for loose coupling and scaling between the sender of messages (publishers) and receivers (subscribers) on topics they subscribe to.
In the pub/sub messaging pattern, publishers do not send messages directly to all subscribers; instead, messages are sent via brokers. Publishers do not know who the subscribers are or to which (if any) topics they subscribe. This means publisher and subscriber operations can operate independently of each other. This is known as loose coupling and removes service dependencies that would otherwise be there in traditional messaging patterns.


<!-- USAGE EXAMPLES -->
## Usage

### Node.js example -

```js
const pubsub = require('./index');

pubsub.subscribe('locationChange', (x) => {
    console.log('locationChange: ', x);
});

pubsub.subscribe('locationUpdate', (x) => {
    console.log('locationUpdate: ', x);
});

pubsub
	.publish('locationChange', "100")
	.then((x) => console.log("values1: ", x))
    .catch((e) => console.log('error: ', e))
    
pubsub
	.publish('locationUpdate', "102")
	.then((x) => console.log("values2: ", x))
    .catch((e) => console.log('error: ', e))
```

### Browser example -

```html
<html>
    <head>
        <script src="./pubsub.js" />
    </head>
    <body>
        <script>
            pubsub.subscribe('locationChange', function(x){
                console.log('locationChange: ', x);
            });

            pubsub.subscribe('locationUpdate', function(x){
                console.log('locationUpdate: ', x);
            });

            pubsub
                .publish('locationChange', "100")
                .then(function(x){console.log("values1: ", x)})
                .catch(function(e){console.log('error: ', e)})
                
            pubsub
                .publish('locationUpdate', "102")
                .then(function(x){console.log("values2: ", x)})
                .catch(function(e){console.log('error: ', e)})
        </script>
    </body>
</html>
```

<!-- API -->

## API

All API functions exists inside pubsub object such as - `pubsub.subscribe`.

### subscribe(eventName, callback)

Allows subscribing to the event and executing the callback when an event is published.

#### eventName

Type: `string`

Event published.

#### callback

Type: `function`

Callback to be executed when the publish event is received.

### publish(eventName, options)

Returns a promise, that defines the decision of subscribers.

#### eventName

Type: `string`

Event published.

#### options

Type: `object`

Options to be passed while publishing to an event.

##### options.promiseMethod

Type: `string`

Method to be applied at the collection of promises such as `all`, `any` etc.

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the Apache License 2.0. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Amit Kumar - amitcute3@gmail.com

Project Link: [https://github.com/amit08255/nextjs-passport](https://github.com/amit08255/nextjs-passport)

