(function(scope) {
	'use strict';
	let pubsubInstance = null;
    
    function Pubsub() {
        let channels = {};
    
        function getSubscribers(channel) {
            channels[channel] = channels[channel] || [];
            return channels[channel];
        }
    
        function setSubscriber(channel, callback) {
            getSubscribers(channel);
            channels[channel].push(callback);
        }
    
        return {
            publish: async function(channel, data) {
                let channels = getSubscribers(channel);
    
                if(channels.length > 0) {
                    return channels[0](data);
                }
            },
            publishAll: async function(channel, config, data) {
                config = config || {
                    promiseMethod: 'all'
                };
                let channels = getSubscribers(channel);
    
                if(channels.length > 0) {
                    const promises = channels.map(function(chan){
                        return chan(data);
                    });
                    return Promise[config.promiseMethod](promises);
                }
                return Promise.resolve();
            },
            subscribe: function(channel, callback) {
                setSubscriber(channel, callback);
            }
        }
    }

	pubsubInstance = new Pubsub();

	//if sbd's using requirejs library to load pubsub.js
	if(typeof define === 'function') {
		define(pubsubInstance);
	}

	//node.js
	if(typeof module === 'object' && module.exports) {
		module.exports = pubsubInstance;
    }

    //browser
	if(typeof window === 'object') {
		window.pubsub = pubsubInstance;
		if(window !== scope) {
			scope.pubsub = pubsubInstance;
		}
	}
})(this);