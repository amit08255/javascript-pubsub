import React, {useEffect} from 'react';
import pubsub from '../utilities/index';

const Card = pubsub.publishSync('components/card');

const Homepage = () => {
    useEffect(() => {
        const pr1 = pubsub.publish('locationChange', function(error, x){
            console.log("publish error: ", error);
            console.log("Data should be null: ", x)
        }, null);

        const pr2 = pubsub.withDebugging('locationChange').publish('locationChange', function(_error, x){
            console.log("300*2 = ", x)
        }, 300);

        pr1.then((c) => {
            console.log("ch1: ", c);
        }).catch((err) => {
            console.log("ee: ", err);
        })
    }, []);

    return (
        <Card title="Amit">
            <p>Hello world</p>
        </Card>
    )
};

export default Homepage;
