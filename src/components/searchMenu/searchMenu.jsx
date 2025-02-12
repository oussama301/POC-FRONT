import { Box, Button, TextField, CircularProgress, Typography, useTheme } from "@mui/material";
import React, { useContext, useState } from "react";
import { tokens } from "../../theme";
import PromptContext from "../../context/PromptContext";

// Import dashboards
import Dashboard1 from "../../scenes/dashboard/dashboard1";
import Dashboard2 from "../../scenes/dashboard/dashboard2";
import Dashboard3 from "../../scenes/dashboard/dashboard3";

const dashboardNames = ["Dashboard 1", "Dashboard 2", "Dashboard 3"];

const SearchMenu = ({ activeDashboard, setActiveDashboard }) => {
  console.log("Rendering SearchMenu component");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { prompt, setPrompt, visualGroups, setVisualGroups, setRole, setBusinessDomain } =
    useContext(PromptContext);

  const [loading, setLoading] = useState(false);
  //const [activeDashboard, setActiveDashboard] = useState(null); // Track the currently displayed dashboard
  const [isGridActive, setIsGridActive] = useState(false); // Track grid activation

  const handleSearch = async () => {
    if (!prompt) return;

    console.log("Search triggered with prompt:", prompt);

    setLoading(true);
    try {
      const response = await fetch("https://fastapi-app2-ji8g.onrender.com/generate_visuals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: prompt }),
      });

      console.log("Response received:", response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log("Data received from backend:", data);

      if (data.visual_groups) setVisualGroups(data.visual_groups);
      if (data.domain) setBusinessDomain(data.domain);
      if (data.Role) setRole(data.Role);
    } catch (error) {
      console.error("Failed to fetch data from the backend.", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreviewClick = (index) => {
    console.log(`Preview clicked for Dashboard ${index + 1}`);
    if (activeDashboard === index) {
      setActiveDashboard(null);
      setIsGridActive(false);
    } else {
      setActiveDashboard(index);
      setIsGridActive(false);
    }
  };

  // Dynamically assign visual groups to dashboards
  const dashboard1Visuals = visualGroups[0]?.visuals || [];
  const dashboard2Visuals = visualGroups[1]?.visuals || [];
  const dashboard3Visuals = visualGroups[2]?.visuals || [];

  console.log("Dashboard 1 visuals:", dashboard1Visuals);
  console.log("Dashboard 2 visuals:", dashboard2Visuals);
  console.log("Dashboard 3 visuals:", dashboard3Visuals);

  const dashboards = [dashboard1Visuals, dashboard2Visuals, dashboard3Visuals];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "1px",
        height: "100vh",
        textAlign: "center",
      }}
    >
      {/* Search Box - BARRE DE RECHERCHE STYLISÉE */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          width: "50%",
          padding: "12px",
          background: "linear-gradient(135deg,rgb(201, 220, 236),rgb(190, 192, 202))",
          borderRadius: "12px",
          boxShadow: "0 8px 16px rgba(47, 27, 102, 0.15)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <TextField
          label="Enter your prompt"
          variant="outlined"
          value={prompt}
          onChange={(e) => {
            console.log("Prompt updated:", e.target.value);
            setPrompt(e.target.value);
          }}
          sx={{ flex: 1 }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={loading}
          sx={{
            height: "56px",
            backgroundColor: colors.blueAccent[300],
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: colors.blueAccent[400],
            },
          }}
        >
          Search
        </Button>
      </Box>
      {loading && (
        <Box mt="40px" display="flex" justifyContent="center">
          <CircularProgress style={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }} />
        </Box>
      )}
      {/* Display Business Domain */}
      {!loading && visualGroups.length > 0 && (
        <Typography
          variant="h5"
          sx={{
            marginTop: "20px",
            color: colors.greenAccent[400],
            fontWeight: "bold",
          }}
        >
          Business Domain: {visualGroups[0]?.group_name || "N/A"}
        </Typography>
      )}
      {/* Dashboard Previews */}
      <Box
        mt="40px"
        display="flex"
        flexWrap="wrap"
        gap="20px"
        sx={{
          width: "80%",
          maxWidth: "1200px",
          justifyContent: "center",
        }}
      >
        {[Dashboard1, Dashboard2, Dashboard3].map((DashboardComponent, index) => (
          <Box key={index} sx={{ textAlign: "center" }}>
            <Box
              onClick={() => handlePreviewClick(index)}
              sx={{
                cursor: "pointer",
                border: `2px solid ${colors.grey[500]}`,
                borderRadius: "16px",
                overflow: "hidden",
                width: "300px",
                height: "200px",
                backgroundColor: colors.primary[400],
                marginBottom: "10px",
                position: "relative",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: colors.blueAccent[500],
                  transform: "scale(1.05)",
                  boxShadow: `0px 4px 20px ${colors.blueAccent[500]}`,
                },
              }}
            >
              {/* Dashboard Preview */}
              <Box
                sx={{
                  transform: "scale(0.4)",
                  transformOrigin: "top left",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              >
                <DashboardComponent visuals={dashboards[index]} isGridActive={false} />
              </Box>
            </Box>
            <Typography
              variant="h6"
              sx={{
                color: colors.grey[100],
                fontWeight: "bold",
              }}
            >
              {dashboardNames[index]}
            </Typography>
          </Box>
        ))}
      </Box>
      {/* Active Dashboard */}
      {activeDashboard !== null && (
        <Box
          mt="20px"
          sx={{
            width: "400%",
            maxWidth: "1500px",
            margin: "0 auto",
            backgroundColor: "rgb(212, 219, 214)",
            border: `2px solid rgb(247, 247, 247)`, 
            borderRadius: "16px",
            overflow: "visible",
            boxShadow: `0px 4px 20px rgb(201, 201, 205)`,  
            position: "relative",
          }}s
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "rgb(255, 255, 255)", // Gris clair
              padding: "5px",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            <Typography variant="h6" fontWeight="bold" color={colors.grey[100]}>
              {dashboardNames[activeDashboard]}
            </Typography>
            <Button
              variant="contained"
              onClick={() => setIsGridActive(!isGridActive)}
              sx={{
                backgroundColor: "rgb(224, 232, 241)",
                color: colors.grey[100],
                "&:hover": { backgroundColor: colors.blueAccent[800] },
              }}
            >
              {isGridActive ? "Disable Edit" : "Enable Edit"}
            </Button>
          </Box>
          {/* Render Active Dashboard */}
          {activeDashboard === 0 && <Dashboard1 visuals={visualGroups} isGridActive={isGridActive} />}
          {activeDashboard === 1 && <Dashboard2 visuals={visualGroups} isGridActive={isGridActive} />}
          {activeDashboard === 2 && <Dashboard3 visuals={visualGroups} isGridActive={isGridActive} />}
        </Box>
      )}
    </Box>
  );
};

export default SearchMenu;
