import React, { useState } from "react";
import { Box, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Define sidebar items (icons + titles)
  const dashboardLinks = [
    { title: "Dashboard 1", icon: <DashboardIcon />, path: "/dashboard1" },
    { title: "Dashboard 2", icon: <DashboardIcon />, path: "/dashboard2" },
    { title: "Dashboard 3", icon: <DashboardIcon />, path: "/dashboard3" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isOpen ? 200 : 60,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isOpen ? 200 : 60,
          transition: "width 0.3s",
          overflowX: "hidden",
          backgroundColor: "rgba(10, 2, 52, 0.9)", // Sidebar background color
          color: "#fff", // Text color
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isOpen ? "space-between" : "center",
          padding: "10px",
        }}
      >
        <IconButton onClick={() => setIsOpen(!isOpen)} color="inherit">
          <MenuIcon />
        </IconButton>
      </Box>

      <List>
        {dashboardLinks.map((item, index) => (
          <ListItem button key={index} component={Link} to={item.path} sx={{ padding: "10px" }}>
            <Tooltip title={item.title} placement="right" arrow disableHoverListener={isOpen}>
              <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
            </Tooltip>
            {isOpen && <ListItemText primary={item.title} />}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
