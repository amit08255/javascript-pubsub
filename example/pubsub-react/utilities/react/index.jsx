import React from 'react';
import pubsub from '../index';
import ErrorBoundary, { withErrorBoundary } from './wrapper';

const fallbackComponent = (channel) => () => (
    <div>
        <b>404 - Not Found </b>
        {channel}
    </div>
);

const publishComponent = (channel, fallback = null) => {
    const component = pubsub.publishSync(channel);

    if (component.data) {
        return component.data;
    }

    if (!component.data && !fallback) {
        return fallbackComponent(channel);
    }

    return fallback;
};

export const publishComponentSafe = (channel, fallback = null) => {
    const component = pubsub.publishSync(channel);

    if (component.data) {
        return withErrorBoundary(component.data);
    }

    if (!component.data && !fallback) {
        return fallbackComponent(channel);
    }

    return fallback;
};

pubsub.subscribe(
    'components/withErrorBoundary', () => withErrorBoundary,
);

pubsub.subscribe(
    'components/errorBoundary', () => ErrorBoundary,
);

export default publishComponent;
