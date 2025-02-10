import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import TableChartIcon from "@mui/icons-material/TableChart";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
import PublicIcon from "@mui/icons-material/Public";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";



const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === to}
      style={{
        color: "#333",
        borderRadius: "10px",
        transition: "all 0.3s ease-in-out",
        margin: "5px 0",
        padding: "12px 20px",
        fontWeight: "500",
        fontSize: "16px",
        background: selected === to 
          ? "linear-gradient(to right, #D4B886, #EAEAEA)"
          : "transparent",
        "&:hover": {
          background: "linear-gradient(to right, #E3C28D, #FAFAFA)",
          transform: "scale(1.05)",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        },
      }}
      onClick={() => setSelected(to)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ activeDashboard, setActiveDashboard }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("");
  const location = useLocation();
  useEffect(() => {
    setSelected(location.pathname);
  }, [location]);

  /*const chartIcons = {
    "bar chart": <BarChartOutlinedIcon />,
    "pie chart": <PieChartOutlineOutlinedIcon />,
    "line chart": <TimelineOutlinedIcon />,
    "donut chart": <DonutLargeIcon />,
    "table": <TableChartIcon />,
    "radial bar chart": <ScatterPlotIcon />,
    "choropleth map": <PublicIcon />,
    "circle packing": <GroupWorkIcon />,
    "area graph": <TimelineOutlinedIcon />,
  };*/
  const handleSidebarClick = (index) => {
    console.log(`Sidebar clicked for Dashboard ${index + 1}`);

    if (activeDashboard === index) {
      setActiveDashboard(null); // ✅ Close the dashboard

    } else {
      setActiveDashboard(index); // ✅ Open the dashboard

    }
  };
  /*const chartTitles = visuals
    .filter((visual) => visual.type in chartIcons)
    .map((visual) => ({
      id: visual.id,
      title: visual.title,
      to: `/chart/${visual.id}`,
      icon: chartIcons[visual.type] || null,
    }));*/

  return (
    <Box
      sx={{
        height: "200vh",
        display: "flex",
        flexDirection: "column",
        "& .pro-sidebar-inner": {
          background: "rgba(218, 220, 231) !important", // Effet Glassmorphism
          backdropFilter: "blur(10px)", // Effet de flou
          borderRadius: "0px 20px 20px 0px",
          boxShadow: "5px 0px 15px rgba(0, 0, 0, 0.1)",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "12px 25px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#D4B887 !important",
        },
        "& .pro-menu-item.active": {
          background: "linear-gradient(to right,rgb(201, 49, 49), #EAEAEA)",
          borderRadius: "10px",
          color: "#333 !important",
          fontWeight: "bold",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO ET MENU */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "15px 0 20px 0",
              color: "#333",
            }}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <Typography variant="h3" sx={{ color: "#333", fontWeight: "bold" }}>
                  AUTO DASH 
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* BARRE DE RECHERCHE */}
          {!isCollapsed && (
            <Box sx={{ padding: "15px", textAlign: "center" }}>
              <Box
                sx={{
                  background: "#F9F9f5",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <SearchIcon sx={{ color: "#AAB7B8" }} />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  style={{
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    marginLeft: "10px",
                    flex: 1,
                  }}
                />
              </Box>
            </Box>
          )}
          <Box paddingLeft={isCollapsed ? undefined : "5%"}>
          {/* SECTIONS */}
          <Item title="Search Menu" to="/" icon={<SearchIcon />} selected={selected} setSelected={setSelected} />

          <Typography variant="h6" sx={{ margin: "15px 0 5px 20px", color: "#777" }}>
            Data
          </Typography>
          <Item title="Manage Team" to="/team" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />
          <Item title="Contacts Information" to="/contacts" icon={<ContactsOutlinedIcon />} selected={selected} setSelected={setSelected} />
          <Item title="Invoices Balances" to="/invoices" icon={<ReceiptOutlinedIcon />} selected={selected} setSelected={setSelected} />

          <Typography variant="h6" sx={{ margin: "15px 0 5px 20px", color: "#777" }}>
            Pages
          </Typography>
          <Item title="Profile Form" to="/form" icon={<PersonOutlinedIcon />} selected={selected} setSelected={setSelected} />
          <Item title="Calendar" to="/calendar" icon={<CalendarTodayOutlinedIcon />} selected={selected} setSelected={setSelected} />
          <Item title="FAQ Page" to="/faq" icon={<HelpOutlineOutlinedIcon />} selected={selected} setSelected={setSelected} />

          {/* SECTION DASHBOARDS AVEC EFFET 3D */}
          <Typography variant="h6" sx={{ margin: "15px 0 5px 20px", color: "rgb(0, 0, 0)" }}>
            Dashboards
          </Typography>
          <MenuItem
            onClick={() => {
              //setActiveDashboard(0); // ✅ Set active dashboard
              handleSidebarClick(0); // ✅ Handle collapse
            }}
            sx={{ margin: "15px 0 5px 20px", color: "#333" }}
            icon={<CalendarTodayOutlinedIcon />}
          >
            Dashboard 1
          </MenuItem>

          <MenuItem
            onClick={() => {
              //setActiveDashboard(1); // ✅ Set active dashboard
              handleSidebarClick(1); // ✅ Handle collapse
            }}
            sx={{ margin: "15px 0 5px 20px", color: "#333" }}
            icon={<CalendarTodayOutlinedIcon />}

          >
            Dashboard 2
          </MenuItem>

          <MenuItem
            sx={{ margin: "15px 0 5px 20px", color: "#333" }}
            onClick={() => {
              //setActiveDashboard(2); // ✅ Set active dashboard
              handleSidebarClick(2); // ✅ Handle collapse
            }}
            
            icon={<CalendarTodayOutlinedIcon />}
          >
            Dashboard 3
          </MenuItem>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;