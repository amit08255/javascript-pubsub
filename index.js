// eslint-disable-next-line func-names
(function (scope) {
    let pubsubInstance = null;

    function Pubsub() {
        let channels = {};
        const queue = {};

        function getSubscribers(channel) {
            channels[channel] = channels[channel] || [];
            return channels[channel];
        }

        function setSubscriber(channel, callback) {
            getSubscribers(channel);
            channels[channel].push(callback);
        }

        function getQueue(channel) {
            queue[channel] = queue[channel] || [];
            return queue[channel];
        }

        function clearQueue(channel) {
            queue[channel] = [];
        }

        function setQueue(channel, callback, data) {
            getQueue(channel);
            queue[channel].push({
                callback,
                data,
            });
        }

        async function queueExecutor(subscriber, queueObj) {
            return subscriber(queueObj.data);
        }

        async function queueHandler(subscriber, queueObj) {
            const promise = queueExecutor(subscriber, queueObj);

            promise.then((result) => {
                queueObj.callback(null, result);
            }).catch((err) => {
                queueObj.callback(err, null);
            });
        }

        return {
            async clearSubscribers(channel = null) {
                if (channel) {
                    channels[channel] = [];
                }

                channels = [];
            },
            async clearTaskQueue(channel) {
                clearQueue(channel);
            },
            publishSync(channel, data) {
                const channelList = getSubscribers(channel);

                if (channelList.length > 0) {
                    return channelList[0](data);
                }

                return undefined;
            },
            async publish(channel, callback = null, data = null) {
                const channelList = getSubscribers(channel);
                const queueList = getQueue(channel);

                if (callback) {
                    setQueue(channel, callback, data);
                }

                if (channelList.length > 0 && queueList.length > 0) {
                    const subscriberFunc = channelList[0];

                    queueList.map(async (queueObj) => {
                        return queueHandler(subscriberFunc, queueObj);
                    });

                    clearQueue(channel);
                    return true;
                }

                return false;
            },
            async subscribe(channel, callback) {
                setSubscriber(channel, callback);
                this.publish(channel);
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
