import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  heading: {
    paddingLeft: '24px'
  },
  innerDiv: {
    width: '90%',
    height: '100%',
    margin: 'auto'
  },  
  outerRow: {
    borderRight: '1px solid #e0e0e0'
  }
});

function TrackerDetails(props) {
  const { classes, angle } = props;
  return (
      
        <div className={classes.root}>
          <div className={classNames(classes.innerDiv,
           angle > 58 ? 'angle60' :
           angle > 56 ? 'angle58' :
           angle > 54 ? 'angle56' :
           angle > 52 ? 'angle54' :
           angle > 50 ? 'angle52' :
           angle > 48 ? 'angle50' :
           angle > 46 ? 'angle48' :
           angle > 44 ? 'angle46' :
           angle > 42 ? 'angle44' :
           angle > 40 ? 'angle42' :
           angle > 38 ? 'angle40' :
           angle > 36 ? 'angle38' :
           angle > 34 ? 'angle36' :
           angle > 32 ? 'angle34' :
           angle > 30 ? 'angle32' :
           angle > 28 ? 'angle30' :
           angle > 26 ? 'angle28' :
           angle > 24 ? 'angle26' :
           angle > 22 ? 'angle24' :
           angle > 20 ? 'angle22' :
           angle > 18 ? 'angle20' :
           angle > 16 ? 'angle18' :
           angle > 14 ? 'angle16' :
           angle > 12 ? 'angle14' :
           angle > 10 ? 'angle12' :
           angle > 8 ? 'angle10' :
           angle > 6 ? 'angle8' :
           angle > 4 ? 'angle6' :
           angle > 2 ? 'angle4' :
           angle > 0 ? 'angle2' :
           angle > -2 ? 'angle0' :
           angle > -4 ? 'angle_2' :
           angle > -6 ? 'angle_4' :
           angle > -8 ? 'angle_6' :
           angle > -10 ? 'angle_8' :
           angle > -12 ? 'angle_10' :
           angle > -14 ? 'angle_12' :
           angle > -16 ? 'angle_14' :
           angle > -18 ? 'angle_16' :
           angle > -20 ? 'angle_18' :
           angle > -22 ? 'angle_20' :
           angle > -24 ? 'angle_22' :
           angle > -26 ? 'angle_24' :
           angle > -28 ? 'angle_26' :
           angle > -30 ? 'angle_28' :
           angle > -32 ? 'angle_30' :
           angle > -34 ? 'angle_32' :
           angle > -36 ? 'angle_34' :
           angle > -38 ? 'angle_36' :
           angle > -40 ? 'angle_38' :
           angle > -42 ? 'angle_40' :
           angle > -44 ? 'angle_42' :
           angle > -46 ? 'angle_44' :
           angle > -48 ? 'angle_46' :
           angle > -50 ? 'angle_48' :
           angle > -52 ? 'angle_50' :
           angle > -54 ? 'angle_52' :
           angle > -56 ? 'angle_54' :
           angle > -58 ? 'angle_56' :
           angle > -60 ? 'angle_58' :
           'angle_60')}>
               Angle = {angle}
          </div>
        </div>
  );
}

TrackerDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TrackerDetails);