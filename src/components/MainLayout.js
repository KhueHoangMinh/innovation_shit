import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Outlet } from 'react-router-dom';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import Header from './Header'
import { useDispatch, useSelector } from 'react-redux';
import { barActions } from '../store/sidebar-slice';
import { Drawer, Stack, useMediaQuery } from '@mui/material';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const CustomDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open, applyresize, isdesktop }) => ({
    ...(applyresize ? {
        width: drawerWidth,
    }: {
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
          width: `calc(${theme.spacing(8)} + 1px)`,
        },
    }),
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': {
            ...openedMixin(theme),
        }
            
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': {
            ... closedMixin(theme),
        }
    }),

    
    ...(!isdesktop && {
        position: "absolute",
        width: drawerWidth,
        '& .MuiDrawer-paper': {
            transition: theme.transitions.create( "margin", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: drawerWidth,
            marginLeft: open ? "0px" : "-" + drawerWidth + "px",
        },
    })
  })
);

    
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

export default function MainLayout() {
  const theme = useTheme();
  const dispatch = useDispatch()
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"))

  const barState = useSelector(state => state.barState)

  const barOpen = barState.isOpenning ? barState.isOpenning : barState.isOpenningTemp

  console.log(barOpen)
  return (
    <Box sx={{ display: 'flex' }}>
        
      <CssBaseline />

      <Header/>
        
      <CustomDrawer 
        variant="permanent" 
        anchor='left' 
        isdesktop={isDesktop} 
        open={barOpen} 
        applyresize={barState.isOpenning} 
        onMouseEnter={()=>{if(isDesktop && !barState.isOpenning && !barState.isOpenningTemp) dispatch(barActions.setBarStateTemp(true))}} 
        onMouseLeave={()=>{if(isDesktop && !barState.isOpenning && barState.isOpenningTemp) dispatch(barActions.setBarStateTemp(false))}} 
      >
        <OverlayScrollbarsComponent defer options={{
        overflow: {
            x: 'hidden',
            y: 'scroll',
        },
        scrollbars: {
            theme: 'os-theme-light',
            visibility: 'auto',
            autoHide: 'leave',
            autoHideDelay: 300,
            autoHideSuspend: false,
            dragScroll: true,
            clickScroll: false,
            pointers: ['mouse', 'touch', 'pen'],
        },
        }} style={{height: "100%"}}>
        <DrawerHeader/>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: barOpen ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: barOpen ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: barOpen ? 1 : 0, transition: "opacity 0.2s ease-in-out" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam', 'Trashh', 'Spamm'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: barOpen ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: barOpen ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: barOpen ? 1 : 0, transition: "opacity 0.2s ease-in-out" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        </OverlayScrollbarsComponent>
      </CustomDrawer>
      <Box component="main" sx={{flexGrow: 1, minWidth: 0, p: 3, position: "relative", float: "right"}}>
        <DrawerHeader />
        <Stack direction={"column"} spacing={"30px"} sx={{width: "100%"}}>
          <Outlet/>
        </Stack>
      </Box>
    </Box>
  );
}