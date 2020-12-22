import pubsub from '../utilities';

pubsub.subscribe('locationChange', function(x){
    console.log('locationChange: ', x);
    if(typeof x !== 'number'){
        return Promise.reject("Invalid data type");
    }

    return x * 2;
});
