
<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h1 align="center">JavaScript PubSub</h1>

  <p align="center">
    Small and fast JavaScript PubSub library designed for writing maintainable and decoupled code in JavaScript.
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
This is simple library designed for writing maintainable code in JavaScript using PubSub pattern. This library is designed to work with both Node.js and browser without issue. PubSub is a messaging pattern is a design pattern that provides a framework for exchanging messages that allows for loose coupling and scaling between the sender of messages (publishers) and receivers (subscribers) on topics they subscribe to.
In the pub/sub messaging pattern, publishers do not send messages directly to all subscribers; instead, messages are sent via brokers. Publishers do not know who the subscribers are or to which (if any) topics they subscribe. This means publisher and subscriber operations can operate independently of each other. This is known as loose coupling and removes service dependencies that would otherwise be there in traditional messaging patterns.

### Built With
This library is designed with technologies listed below - 
* [JavaScript](https://www.javascript.com/)


<!-- GETTING STARTED -->
## Getting Started

Using this library is simple, you just have to add/import this library in your project. The simple technique is to add/import all modules which specify subscribers on your app entrypoint. Other modules do not need to add/import them, you simply has to publish events, subscribers callback will be called as event gets published. This technique keeps only your app entrypoint coupled with subscriber modules while keeping rest of your app decoupled.


<!-- USAGE EXAMPLES -->
## Usage

### Node.js example -

```js
const pubsub = require('./index');

pubsub.subscribe('locationChange', function(x){
    console.log('locationChange: ', x);
    if(typeof x !== 'number'){
        return Promise.reject("Invalid data type");
    }

    return x * 2;
});

pubsub.subscribe('locationUpdate', function(x){
    console.log('locationUpdate: ', x);
    return x * 3;
});

pubsub.publish('locationChange', 100)
    .then(function(x){console.log("100*2 = ", x)})
    .catch(function(e){console.log('error: ', e)})

pubsub.publish('locationChange', "100")
    .then(function(x){console.log("100*2 = ", x)})
    .catch(function(e){console.log('error: ', e)})
    
pubsub.publish('locationUpdate', 102)
    .then(function(x){console.log("102*3 = ", x)})
    .catch(function(e){console.log('error: ', e)})
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
                return x * 2;
            });

            pubsub.subscribe('locationUpdate', function(x){
                console.log('locationUpdate: ', x);
                return x * 3;
            });

            pubsub.publish('locationChange', 100)
                .then(function(x){console.log("100*2 = ", x)})
                .catch(function(e){console.log('error: ', e)})
                
            pubsub.publish('locationUpdate', 102)
                .then(function(x){console.log("102*3 = ", x)})
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

Event to subscribe to.

#### callback

Type: `function`

Callback to be executed when the publish event is received. Data passed with `publish` and `publishAll` is passed to this function as parameter. The data returned by this function can be accessed using promise resolve callback, whereas error occurred can be accessed using promise reject callback. If you intentionally want to pass error from subscriber callback use code - `return Promise.reject("error data");`.

### clearSubscribers(eventName)

Clear all subscribers or subscribers linked to a specific channel/event.

#### eventName

Type: `string`

Optional. When provided, it clear subscribers linked to specific channel/event. Otherwise, it clears all subscriber registered.
### publish(eventName, data)

Returns a promise, that defines the decision of subscriber. It can only be used with single subscriber, if multiple subscribers are added for same event, first one is used.

#### eventName

Type: `string`

Event published.

#### data

Type: `any`

Data to be passed to subscriber callback.

### publishAll(eventName, options, data)

Returns a promise, that defines the decision of subscribers. It can be used with multiple subscribers subscribing to same event.

#### eventName

Type: `string`

Event published.

#### options

Type: `object`

Options to be passed while publishing to an event.

##### options.promiseMethod

Type: `string`

#### data

Type: `any`

Data to be passed to subscriber callback.

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

Project Link: [https://github.com/amit08255/javascript-pubsub](https://github.com/amit08255/javascript-pubsub)

