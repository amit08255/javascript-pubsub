import pubsub from '../utilities';

pubsub.subscribe('locationChange', function(x){
    console.log('locationChange: ', x);
    if(typeof x !== 'number'){
        generateErrorNow();
    }

    return x * 2;
});
