import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

// setting the type of our props
Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

// mapping the redux state to a prop in this component so we have access to it
// takes state as parameter
// "state.whatever" that we have in root reducer
const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
