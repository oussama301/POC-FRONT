import React, { useMemo, useCallback, useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  Modal,
  TextField,
} from "@mui/material";
import { Responsive, WidthProvider } from "react-grid-layout";
import { tokens } from "../../theme";

import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Chart from "../../components/Chart";
import { divideVisuals } from "../../utils/divideVisuals";
//import VisualRenderer from "../../utils/VisualRenderer";
import FilterBar from "../../components/FilterBar";
import { useFilters } from "../../context/FilterContext";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard3 = ({ visuals: allVisuals = [], isGridActive }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  console.log("Received visuals in Dashboard3:", allVisuals);

  // Safely divide visuals
  const { dashboard3 = [] } = divideVisuals(allVisuals) || {};
  console.log("Divided visuals for Dashboard3:", dashboard3);

  const [groupName, setGroupName] = useState("Loading...");
  const [logoPath, setLogoPath] = useState(""); // State to hold the logo path

 // Monitor visuals to dynamically update the groupName and logo
    useEffect(() => {
      if (allVisuals && allVisuals.length > 0) {
        // Get the first group's name or fallback to default
        const firstGroupName = allVisuals[2]?.group_name?.toLowerCase().replace(/\s+/g, '_') || "default_group";
        setGroupName(firstGroupName);

        // Construct logo URL from the public folder
        const logoURL = `/assets/logo/OCP.webp`;

        // Check if the logo file exists before setting the path
        fetch(logoURL, { method: 'HEAD' })
          .then((response) => {
            if (response.ok) {
              setLogoPath(logoURL);
            } else {
              setLogoPath('/assets/logo/OCP.webp'); // Fallback to default logo if not found
            }
          })
          .catch(() => {
            setLogoPath('/assets/logo/OCP.webp'); // Handle fetch errors
          });

        console.log("Assigned Logo Path:", logoURL);
      }
    }, [allVisuals]);


  console.log("Group Name for Dashboard:", groupName);
  console.log("Assigned Logo Path:", logoPath);
const Header = ({ title, subtitle, titleColor = "#FFFFFF", subtitleColor = "#4CAF50", sx = {} }) => {
    return (
      <Box sx={{ ...sx }}>
        {/* Title Styling */}
        <Typography variant="h3" fontWeight="bold" sx={{ color: titleColor }}>
          {title}
        </Typography>
        {/* Subtitle Styling */}
        <Typography variant="h6" sx={{ color: subtitleColor }}>
          {subtitle}
        </Typography>
      </Box>
    );
  };
  // Splitting visuals into KPIs and charts
  const kpis = useMemo(
    () => (dashboard3 || []).filter((visual) => visual.type === "KPI"),
    [dashboard3]
  );
  console.log("Filtered KPIs for Dashboard3:", kpis);

  const charts = useMemo(
    () => (dashboard3 || []).filter((visual) => visual.type !== "KPI"),
    [dashboard3]
  );
  console.log("Filtered Charts for Dashboard3:", charts);

  // Combine KPIs and Charts into currentVisuals
  const currentVisuals = useMemo(() => [...kpis, ...charts], [kpis, charts]);
  console.log("Combined visuals for Dashboard3:", currentVisuals);

 // Define filterable keywords to search for in dimension sentences



    const { filters } = useFilters();

    const filterKeywords = useMemo(() => [
      'month', 'product', 'time', 'regions', 'account', 'segments',
      'categories', 'sales_channel', 'performance', 'quantity', 
      'amount', 'number', 'countries'
    ], []);
    
    const filteredVisuals = useMemo(() => {
      return currentVisuals.filter((visual) => {
        if (visual.type === "KPI") return true; // Exclude KPI visuals from filtering
    
        if (!visual.dimension || typeof visual.dimension !== "string") return true;
    
        const dimensionText = visual.dimension.toLowerCase();
        const matchedKeyword = filterKeywords.find((keyword) =>
          dimensionText.includes(keyword)
        );
    
        if (!matchedKeyword || !filters || !filters[matchedKeyword] || filters[matchedKeyword].length === 0) {
          return true; // No filter applied or keyword not found
        }
    
        return visual.data?.x_data?.some((x) => filters[matchedKeyword].includes(x));
      });
    }, [currentVisuals, filterKeywords, filters]);
    
    
    console.log("Filtered visuals for Dashboard3:", filteredVisuals);
      


  console.log("Filtered visuals for Dashboard3:", filteredVisuals);

  // Default layout
  const defaultLayout = [
    { i: "0", w: 3, h: 3, x: 0, y: 0 },
    { i: "1", w: 3, h: 3, x: 6, y: 0 },
    { i: "2", w: 3, h: 3, x: 3, y: 0 },
    { i: "3", w: 3, h: 3, x: 9, y: 0 },
    { i: "4", w: 6, h: 10, x: 6, y: 3 },
    { i: "5", w: 6, h: 10, x: 0, y: 3 },
    { i: "6", w: 4, h: 11, x: 0, y: 13 },
    { i: "7", w: 4, h: 11, x: 4, y: 13 },
    { i: "8", w: 4, h: 11, x: 8, y: 13 },
  ];
  console.log("defaultLayout for Dashboard:", defaultLayout);

  const [layout, setLayout] = useState(defaultLayout);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [componentJson, setComponentJson] = useState("");

  const handleOpenModal = (component) => {
    setSelectedComponent(component);
    setComponentJson(JSON.stringify(component, null, 2));
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedComponent(null);
    setComponentJson("");
    setModalOpen(false);
  };

  const handleSaveChanges = () => {
    try {
      const updatedComponent = JSON.parse(componentJson);
      setLayout((prevLayout) =>
        prevLayout.map((visual) =>
          visual.id === selectedComponent.id
            ? { ...visual, ...updatedComponent }
            : visual
        )
      );
      handleCloseModal();
    } catch (error) {
      alert("Invalid JSON format. Please correct it and try again.");
    }
  };

  const onLayoutChange = useCallback((newLayout) => {
    setLayout(newLayout);
    console.log("newLayout for Dashboard:", newLayout);
  }, []);

  const handleDownloadPDF = async () => {
    const dashboardElement = document.getElementById("dashboard-content");
    const scale = 2;

    const canvas = await html2canvas(dashboardElement, {
      scale,
      useCORS: true,
      backgroundColor: "#000",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.setFillColor(0, 0, 0);
    pdf.rect(0, 0, pageWidth, pageHeight, "F");
    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor("#FFFFFF");
    pdf.text("Dashboard Report", 10, 7);
    pdf.save("dashboard_report.pdf");
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundImage: `linear-gradient(to bottom,rgb(230, 237, 241),rgb(222, 230, 236))`,
        color: colors.grey[100],
        padding: '20px',
      }}
    >
      <Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "3px",
    backgroundImage: `
      linear-gradient(to bottom, ${
        theme.palette.mode === 'dark' 
          ? 'rgba(156, 139, 139, 0.8), rgba(103, 98, 98, 0.5)' 
          : 'rgba(30, 115, 71, 0.2), rgba(95, 134, 119, 0.5)'
      }),
      url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='lozenge' patternUnits='userSpaceOnUse' width='30' height='30' patternTransform='rotate(45)'%3E%3Crect x='0' y='0' width='20' height='20' fill='${theme.palette.mode === 'dark' ? 'rgba(197, 197, 197, 0.6)' : 'rgba(0,0,0,0.1)'}'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23lozenge)'/%3E%3C/svg%3E")
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: "12px",
    boxShadow: "0px 5px 15px rgba(10, 9, 9, 0.3)",
    color: theme.palette.mode === "dark" ? colors.grey[100] : colors.grey[900],
    minHeight: "120px", // Ensures a good height for visibility
    width: "100%", // Makes it responsive
  }}
>


      <Box display="flex" alignItems="center" gap="30px">
              <img src={logoPath || "/assets/logo/OCP.webp"} alt="Dashboard Logo" width="100" height="100" />
              <Header 
            title={groupName} 
            subtitle="Welcome to your dashboard"
            titleColor="rgb(0, 0, 0)"   // Custom Title Color
            subtitleColor="rgba(0, 183, 255, 0.99)" // Custom Subtitle Color
          />
        </Box>

        <Box display="flex" alignItems="center" gap="20px">
          {dashboard3.length > 0 ? (
            <FilterBar visuals={dashboard3} />
          ) : (
            <Typography>No filters available</Typography>
          )}
          <Button
            sx={{
              backgroundColor: "#1565C1",
              color: "#fff",
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: "bold",
              borderRadius: "10px",
              boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
              transition: "0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                backgroundColor: "#0D47A0",
                boxShadow: "5px 5px 20px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download 
          </Button>
        </Box>
      </Box>
   

  
      <Box
        id="dashboard-content"
        mt="20px"
        sx={{ height: "calc(100vh - 150px)", overflowY: "auto" ,borderRadius: "10px"}}
      >
        <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: layout }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          width={1200}
          isDraggable={isGridActive}
          isResizable={isGridActive}
          onLayoutChange={onLayoutChange}
        >
          {filteredVisuals.length > 0 ? (
            filteredVisuals.map((visual, index) => (
              <div key={index} style={{ padding: "20px", backgroundColor: colors.primary[400] }} onClick={() => handleOpenModal(visual)}>
                
                <Chart visual={visual} />
              </div>
            ))
          ) : (
            <Typography variant="h6" color={colors.redAccent[400]}>
              No visuals available after filtering.
            </Typography>
          )}
        </ResponsiveGridLayout>

              </Box>
  
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.mode === "dark" ? colors.primary[400] : colors.grey[200],
            padding: "20px",
            borderRadius: "8px",
            width: "50%",
          }}
        >
          <Typography
            variant="h6"
            color={theme.palette.mode === "dark" ? colors.grey[100] : colors.grey[900]}
            sx={{ marginBottom: "10px" }}
          >
            Edit Component JSON
          </Typography>
          <TextField
            multiline
            rows={10}
            fullWidth
            value={componentJson}
            onChange={(e) => setComponentJson(e.target.value)}
            sx={{
              marginTop: "10px",
              backgroundColor: theme.palette.mode === "dark" ? colors.primary[500] : colors.grey[300],
            }}
            InputProps={{
              style: {
                color: theme.palette.mode === "dark" ? colors.grey[100] : colors.grey[900],
              },
            }}
          />
          <Box mt="10px" display="flex" justifyContent="flex-end" gap="10px">
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.redAccent[500],
                "&:hover": {
                  backgroundColor: colors.redAccent[600],
                },
                color: colors.grey[100],
              }}
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.greenAccent[500],
                "&:hover": {
                  backgroundColor: colors.greenAccent[600],
                },
                color: colors.grey[100],
              }}
              onClick={handleSaveChanges}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
    
  );
};
  export default Dashboard3;