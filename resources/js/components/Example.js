import React from 'react';
import ReactDOM from 'react-dom';

function Example() {
    return (
        <div className='landing-body'>

        </div>
    );
}

export default Example;

if (document.getElementById('welcome')) {
    ReactDOM.render(<Example />, document.getElementById('welcome'));
}
