// eslint-disable-next-line func-names
(function (scope) {
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
            async clearSubscribers(channel = null) {
                if (channel) {
                    channels[channel] = [];
                }

                channels = [];
            },
            async publish(channel, data) {
                const channelList = getSubscribers(channel);

                if (channelList.length > 0) {
                    return channelList[0](data);
                }

                return Promise.resolve();
            },
            publishSync(channel, data) {
                const channelList = getSubscribers(channel);

                if (channelList.length > 0) {
                    return channelList[0](data);
                }

                return undefined;
            },
            async publishAll(channel, config, data) {
                const configData = config || {
                    promiseMethod: 'all',
                };
                const channelList = getSubscribers(channel);

                if (channelList.length > 0) {
                    const promises = channelList.map((chan) => chan(data));
                    return Promise[configData.promiseMethod](promises);
                }
                return Promise.resolve();
            },
            async subscribe(channel, callback) {
                setSubscriber(channel, callback);
            },
        };
    }

    pubsubInstance = new Pubsub();

    // if sbd's using requirejs library to load pubsub.js
    if (typeof define === 'function') {
        // eslint-disable-next-line no-undef
        define(pubsubInstance);
    }

    // node.js
    if (typeof module === 'object' && module.exports) {
        module.exports = pubsubInstance;
    }

    // browser
    if (typeof window === 'object') {
        window.pubsub = pubsubInstance;
        if (window !== scope) {
            // eslint-disable-next-line no-param-reassign
            scope.pubsub = pubsubInstance;
        }
    }
}(this));
