import React from 'react';
import pubsub from '../../utilities/index';

const Card = ({title, children}) => (
    <div style={{'backgroundColor': 'blue'}}>
        <div style={{'backgroundColor': 'white', 'color': 'blue', 'padding': '20px', 'border': '5px solid red'}}>
            <h3>{title}</h3>
        </div>
        {children}
    </div>
);

pubsub.subscribe('components/card', function(){
    return Card;
});


export default Card;
