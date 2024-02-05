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
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import Header from './Header'
import { useDispatch, useSelector } from 'react-redux';
import { barActions } from '../store/sidebar-slice';
import { Drawer, Fade, Stack, useMediaQuery } from '@mui/material';
import { useContext } from 'react';
import { TransitionContext } from './TransitionProvider';
import Footer from './Footer';
import HomeIcon from '@mui/icons-material/Home';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AppsIcon from '@mui/icons-material/Apps';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
    '& .css-15b8vjn-MuiPaper-root-MuiDrawer-paper': {
      backgroundColor: "black",
    },
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

// the main layout for the app
export default function MainLayout(props) {
  // get mui's custom theme
  const theme = useTheme();

  // define dispatch function to send actions to redux
  const dispatch = useDispatch()

  // check if user is browsing on desktop or not to adapt layout
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"))

  // open/close state of sidebar from redux store
  const barState = useSelector(state => state.barState)

  // open/close state of sidebar
  const barOpen = barState.isOpenning ? barState.isOpenning : barState.isOpenningTemp

  // transition to other page
  const navigate = useNavigate()
  const Transition = useContext(TransitionContext)

  // get the current url path
  const location = useLocation();

  const handleItemClick = (link) => {
    Transition(()=>{navigate(link)})
  }

  //define the items that will be displayed on sidebar
  const [menuItems, setMenuItems] = React.useState([
    {
      label: "Home",
      link: "/0",
      pathRegex: /^\/[\w.]*\/?$/,
      logo: <HomeIcon/>
    },
    {
      label: "Trade",
      link: "/0/trade",
      pathRegex: /^\/[\w.]*\/trade\/?$/,
      logo: <CurrencyExchangeIcon/>
    },
    {
      label: "Gallery",
      link: "/0/gallery",
      pathRegex: /^\/[\w.]*\/gallery\/?$/,
      logo: <AppsIcon/>
    },
    {
      label: "Search",
      link: "/0/search",
      pathRegex: /^\/[\w.]*\/search\/?$/,
      logo: <SearchIcon/>
    },
    {
      label: "divider",
    },
    {
      label: "Account",
      link: "/0/account",
      pathRegex: /^\/[\w.]*\/account\/?$/,
      logo: <AccountCircleIcon/>
    }
  ])

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
        <OverlayScrollbarsComponent 
          defer 
          options={{
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
          }} style={{height: "100%"}}
        >
          <DrawerHeader/>
          <Divider />
          <List>
            {menuItems.map((item, index) => (
              <>
              {
                item.label === "divider" ? <>
                  <Divider/>
                </> : <>
                  <ListItem key={index} onClick={()=>{handleItemClick(item.link)}} disablePadding sx={{ 
                    display: 'block',
                    backgroundColor: location.pathname.match(item.pathRegex) ? "rgba(255,255,255,0.08)" : "transparent"
                  }}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: barState ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: barState ? 3 : 'auto',
                          justifyContent: 'center',
                        }}
                      >
                        {item.logo}
                      </ListItemIcon>
                      <Fade in={barState}>
                        <ListItemText primary={item.label} />
                      </Fade>
                    </ListItemButton>
                  </ListItem>
                </>
              }
              </>
            ))}
          </List>
        </OverlayScrollbarsComponent>
      </CustomDrawer>
      <Box component="main" sx={{flexGrow: 1, minWidth: 0, p: 3, position: "relative", float: "right"}}>
        <DrawerHeader />
        <Stack direction={"column"} spacing={"30px"} sx={{width: "100%", minHeight: "100vh"}}>
          <Outlet/>
        </Stack>
        <Footer/>
      </Box>
    </Box>
  );
}