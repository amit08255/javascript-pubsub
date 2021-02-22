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

    if (component) {
        return component;
    }

    if (!component && !fallback) {
        return fallbackComponent(channel);
    }

    return fallback;
};

export const publishComponentSafe = (channel, fallback = null) => {
    const component = pubsub.publishSync(channel);

    if (component) {
        return withErrorBoundary(component);
    }

    if (!component && !fallback) {
        return fallbackComponent(channel);
    }

    return fallback;
};

pubsub.subscribe(
    'components/with-error-boundary', () => withErrorBoundary,
);

pubsub.subscribe(
    'components/error-boundary', () => ErrorBoundary,
);

export default publishComponent;
