import { styled, useTheme } from '@mui/material/styles';
import React from 'react'
import { useSelector } from 'react-redux'
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { Fade } from '@mui/material';

function SideBar(props) {
  const theme = useTheme();
  const barState = useSelector(state => state.barState.isOpenning)

  const [menuItems, setMenuItems] = useState([
    {
      label: "Home",
      link: "/home"
    },
    {
      label: "Gallery",
      link: "/gallery"
    },
    {
      label: "Search",
      link: "/search"
    },
    {
      label: "divider",
      link: ""
    },
    {
      label: "Account",
      link: "/account"
    }
  ])

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: props.drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );
  

const openedMixin = (theme) => ({
  width: props.drawerWidth,
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

  return (
    <Drawer variant="permanent" open={barState} sx={{height: "100%"}}>
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
      {/* {props.DrawerHeader} */}
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <>
          {
            item.label === "divider" ? <>
              <Divider/>
            </> : <>
              <ListItem key={index} disablePadding sx={{ display: 'block' }}>
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
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <Fade in={barState}>
                    <ListItemText primary={item} />
                  </Fade>
                </ListItemButton>
              </ListItem>
            </>
          }
          </>
        ))}
      </List>
      </OverlayScrollbarsComponent>
    </Drawer>
  )
}

export default SideBar