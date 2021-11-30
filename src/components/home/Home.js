import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


import WatchesSection from './WatchesSection';
import SunglassesSection from './SunglassesSection';
import HandbagsSection from "./HandbagsSection";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.light.main,
      overflow: "hidden",
      padding: "1rem 0.5rem"
    },
  }));
  
export default function Home() {
  const classes = useStyles();

    return (
      <div className={classes.root}>
         
         <WatchesSection />
         <SunglassesSection />  
         <HandbagsSection />
         
      </div>
    );
}
