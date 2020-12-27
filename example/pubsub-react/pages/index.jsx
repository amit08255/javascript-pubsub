import React, {useEffect} from 'react';
import pubsub from '../utilities/index';

const Card = pubsub.publishSync('components/card');

const Homepage = () => {
    useEffect(() => {
        pubsub.publish('locationChange', function(error, x){
            console.log("error: ", error);
            console.log("Data should be null: ", x)
        }, null);

        pubsub.publish('locationChange', function(_error, x){
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
