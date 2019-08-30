import React from 'react';
import PropTypes from 'prop-types';

class Results extends React.Component {
    render() {
        return (
            <div>
               <div>Results</div>
                <pre>{JSON.stringify(this.props, null, 2)}</pre>
            </div>
        );
    }
}

Results.propTypes = {
    playerOne: PropTypes.string.isRequired,
    playerTwo: PropTypes.string.isRequired
};

export default Results;
