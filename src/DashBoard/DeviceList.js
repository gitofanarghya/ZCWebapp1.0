import React , {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Button, TableHead, TableRow, TableCell, Table, TableBody } from '@material-ui/core';
import { connect } from 'react-redux'
import { dashBoardActions } from '../_actions';
import WarningIcon from '@material-ui/icons/Warning';
import DoneIcon from '@material-ui/icons/Done';

const styles = theme => ({
  root: {
    width: '100%',
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: '10px',
  },
  heading: {
    marginTop: '5px',
    paddingLeft: '24px',
    display: 'flex',
    padding: 'inherit',
  },
  zoneImage: {
    height: '15%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  table: {
    overflow: 'auto',
    //height: '80%',
    //marginTop: 'auto',
  },
  row: {
    maxHeight: '10px'
  },
  image: {
    width: '35%',
    height: '140%',
    backgroundImage: 'url(/img/map.png)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  },
  dummy: {
    width: '35%',
    height: '100%',
  },
  tracker: {
    maxHeight: '30px',
    minWidth: '120px',
    maxWidth: '130px',
    border: '1px solid black',
    boxShadow: '1px 1px 5px black',
    cursor: 'pointer',
    textAlignLast: 'end',
    lineHeight: '0.5em'
  },
  clicked: {
    maxHeight: '30px',
    minWidth: '120px',
    maxWidth: '130px',
    border: '1px solid black',
    boxShadow: 'inset 1px 1px 5px black',
    cursor: 'pointer',
    textAlignLast: 'end',
    lineHeight: '0.5em'

  },
  selected: {
    backgroundColor: 'lightgrey'
  },
  head: {
    marginBottom: '4px',
  },
  yellow:{
    marginLeft: 'auto',
    height: 'fit-content',
    marginTop: 'auto',
  }
  
});

class DeviceList extends Component {

  trigger = () => {
    this.props.triggerDiscovery();
  }

  render(){
  const { classes, devices, selectedTrackerID } = this.props;
  const data = devices

      return (
        <Paper className={classes.root}>
            <Typography className={classes.heading} variant="headline" component="h3">
              <p className={classes.head}>Trackers Discovered</p>
              <Button variant="contained" className={classes.yellow} onClick={this.trigger}>
                          Trigger Discovery
            </Button>
            </Typography>


            <Table className={classes.table}>
              <TableHead>
              <TableRow>
                  <TableCell padding="none"><Typography variant="subheading" >TrackerID</Typography></TableCell>
                  <TableCell padding="none"><Typography variant="subheading">Status</Typography></TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
                {data.map(n => {
                    return (
                    <TableRow
                      hover
                      onClick={() => this.props.getTrackerDetails(n.trackerID)}
                      className={n.trackerID === selectedTrackerID ? classes.selected : classes.row}
                      key={n.id}
                    >
                        <TableCell component="th" scope="row" padding="none">
                            <Typography variant="body1">
                                {n.trackerID}
                            </Typography>
                        </TableCell>
                        <TableCell padding="none">{n.color === "red" ? <WarningIcon style={{ color: "red"}}/> : <DoneIcon style={{ color: "green"}}/>}</TableCell>
                    </TableRow>
                    );
                })}
              </TableBody>
            </Table>
        </Paper>
        
        /*             <Grid className={classes.table} container spacing={24} direction='row' alignItems='center'>
              {data.map(n => {
                      return (
                        <Grid item xs={3} sm={4} md={6} lg={12} style={{    margin: '3px'}}
                        className={classNames( (n.color ===  'red') ?  'overl' : 'trackerIcon', n.trackerID === selectedTrackerID ? classes.clicked : classes.tracker)}
                        onClick={() => this.props.getTrackerDetails(n.trackerID)}
                        key={n.trackerID}>{n.trackerID}</Grid>
                      )
              })}
            </Grid> */
/*             <div className={classes.zoneImage}>
                <div className={classes.image}></div>
              
                <div className={classes.dummy}></div>

            </div> */

        
      );
    }
}

DeviceList.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapDispatchToProps = (dispatch) => ({
  triggerDiscovery: () => {
      dispatch(dashBoardActions.triggerDiscovery()) 
  },
})

export default connect(null, mapDispatchToProps)(withStyles(styles, { withTheme: true })(DeviceList));