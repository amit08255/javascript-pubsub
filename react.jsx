import React from 'react';
import pubsub from './index';

const fallbackComponent = (channel) => () => (
    <div>
        <b>404 - Not Found </b>
        {channel}
    </div>
);

const publishComponent = (channel, fallback = null) => {
    const component = pubsub.publishSync(channel);

    if (component) {
        return component;
    }

    if (!component && !fallback) {
        return fallbackComponent(channel);
    }

    return fallback;
};

export default publishComponent;
