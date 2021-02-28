
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
        generateErrorNow();
    }

    return x * 2;
});

pubsub.subscribe('locationUpdate', function(x){
    console.log('locationUpdate: ', x);
    return x * 3;
});

pubsub.publish('locationChange', function(error, x){
    console.log("Error: ", error);
    console.log("Data should be null: ", x);
}, "102");
    
pubsub.publish('locationUpdate', function(_error, x){
    console.log("102*3 = ", x)
}, 102);
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

            pubsub.publish('locationChange', function(_error, x){
                console.log("100*2 = ", x)
            }, 100);
                
            pubsub.publish('locationUpdate', function(_error, x){
                console.log("102*3 = ", x)
            }, 102);
        </script>
    </body>
</html>
```

### Next.js example -

#### utilities/demo/index.js

```js
import pubsub from '../pubsub';

pubsub.subscribe('locationChange', function(x){
    console.log('locationChange: ', x);
    if(typeof x !== 'number'){
        generateErrorNow();
    }

    return x * 2;
});
```

#### components/Card/index.js

```js
import React from 'react';
import pubsub from '../../pubsub';

const Card = ({title, children}) => (
    <div style={{'backgroundColor': 'blue'}}>
        <div style={{'backgroundColor': 'white', 'color': 'blue', 'padding': '20px', 'border': '5px solid red'}}>
            <h3>{title}</h3>
        </div>
        {children}
    </div>
);

pubsub.subscribe('components/card', function(){
    return Card;
});

export default Card;
```

#### pages/_app.jsx

```js
import React from 'react';
import '../utilities/demo';
import '../components/Card';

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}

export default MyApp;
```

#### pages/index.jsx

```js
import React, {useEffect} from 'react';
import pubsub from '../pubsub';
import publishComponent from '../pubsub/react';

const Card = publishComponent('components/card');

const Homepage = () => {
    useEffect(() => {
        pubsub.publish('locationChange', function(error, x){
            console.log("error: ", error);
            console.log("Data should be null: ", x)
        }, null);

        pubsub.withDebugging('locationChange').publish('locationChange', function(_error, x){
            console.log("300*2 = ", x)
        }, 300);
    }, []);

    return (
        <Card title="Amit">
            <p>Hello world</p>
        </Card>
    )
};

export default Homepage;
```

<!-- API -->

## API

All API functions exists inside pubsub object such as - `pubsub.subscribe`.

### subscribe(eventName, callback, key)

Allows subscribing to the event and executing the callback when an event is published. Key is used to prevent same subscriber from registering twice. By default the key is `index` when subscriber with same key is passed, the previous subscriber is replaced with new one.

#### eventName

Type: `string`

Event to subscribe to.

#### callback

Type: `function`

Callback to be executed when the publish event is received. Data passed with `publish` and `publishAll` is passed to this function as parameter. The data returned by this function can be accessed using promise resolve callback, whereas error occurred can be accessed using promise reject callback. If you intentionally want to pass error from subscriber callback use code - `return Promise.reject("error data");`.

#### key

Type: `string`

Used to identify subscriber in a channel to prevent duplicate subscriber from registering twice. The value is optional and default key is `index`, if you want to register multiple subscriber, all must have unique key.

### unsubscribe(eventName)

Clear all subscribers or subscribers linked to a specific channel/event. If channel/event name is not provided, all subscribers are cleared.

### clearTaskQueue(eventName)

Clear all task in queues linked to a specific channel/event.

#### eventName

Type: `string`

Optional. When provided, it clear subscribers linked to specific channel/event. Otherwise, it clears all subscriber registered.
### publish(eventName, callback, data)

Returns a promise with boolean value, that specifies whether the task is executing or in queue waiting for subscriber. If returned value is `true`, task is being executed otherwise task is waiting for its subscriber. It can only be used with single subscriber, if multiple subscribers are added for same event, first one is used.

#### eventName

Type: `string`

Event published.

#### callback

Type: `function`

Callback function to get result after task execution. Callback function should have two parameters, where first one is `error` and second one is `response`.
#### data

Type: `any`

Data to be passed to subscriber callback.

### publishSync(eventName, data, defaultValue)

Run a task synchronously. Returns data provided by subscriber callback after task execution. When no subscriber is found, returns undefined. It can only be used with single subscriber, if multiple subscribers are added for same event, first one is used. It returns a JSON object -
```js
{ error: errorData, data: dataValue }
```

#### eventName

Type: `string`

Event published.

#### data

Type: `any`

Data to be passed to subscriber callback.

#### defaultValue

Type: `any`

Default data to be passed when no subscriber is found for channel/event.

### withDebugging(eventName)

Enable debugging for event/channel which displays all communications such as subscriber is executed or failed. It returns pubsub object.

#### eventName

Type: `string`

Event published.

### endDebugging(eventName)

Disable debugging for event/channel. It returns pubsub object.

#### eventName

Type: `string`

Event published.

### clearDebugger()

Clear all debugging. It returns pubsub object.

## React APIs

To help designing decoupled ReactJS application, the library provides `pubsub/react` module which allows you to safely render component with pubsub without any issue. The library includes default fallback component to prevent any issue if component subscriber is not registered. React APIs add two channels which allows access to error boundaries for React components.

* `components/withErrorBoundary` - Higher Order Component to render component with error boundaries.

* `components/errorBoundary` - React error boundary component to wrap around other components.

### publishComponent(channel, fallback)

Get instance of component from pubsub subscriber. It returns function/class of react component which means component is not rendered so that you can store it in variable and render when required.

#### channel

Type: `string`

Channel/event name where component subscriber is registered.

#### fallback

Type: `any`

Optional fallback component to display if component subscriber is not found. It is used to prevent app from crashing. If not provided, the default fallback component is used.

### publishComponentSafe

This function works same as `publishComponent` except that it wraps the target component with React error boundaries. It prevents app from crashing from any rendering error. It displays a fallback UI when error occurs.

#### channel

Type: `string`

Channel/event name where component subscriber is registered.

#### fallback

Type: `any`

Optional fallback component to display if component subscriber is not found. It is used to prevent app from crashing. If not provided, the default fallback component is used.

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

