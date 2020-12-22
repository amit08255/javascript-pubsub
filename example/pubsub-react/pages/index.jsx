import React, {useEffect} from 'react';
import pubsub from '../utilities/index';

const Card = pubsub.publishSync('components/card');

const Homepage = () => {
    useEffect(() => {
        pubsub.publishQueue('locationChange', function(x){console.log("100*2 = ", x)}, 100)
        pubsub.publishQueue('locationChange', function(x){console.log("300*2 = ", x)}, 300)
    }, []);

    return (
        <Card title="Amit">
            <p>Hello world</p>
        </Card>
    )
};

export default Homepage;
