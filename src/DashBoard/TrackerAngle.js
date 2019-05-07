import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import { callbackify } from 'util';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    ...theme.mixins.gutters(),
    paddingBottom: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
    position: 'relative'
  },
  innerDiv: {
    height: 'calc(100% - 32px)',
    margin: 'auto',
  },  
  outerRow: {
    borderRight: '1px solid #e0e0e0'
  },
  angleText: {
    width: '100%',
    textAlign: 'center'
  },
  para: {
    margin: 0,
  },
  trackerImageRoot:{
    width: '100%',
  }
});

function TrackerDetails(props) {
  const { classes, angle } = props;
  return (
      
        <div className={classes.trackerImageRoot}>
 
        </div>
  );
}

TrackerDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TrackerDetails);