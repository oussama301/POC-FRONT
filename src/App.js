import { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard1 from "./scenes/dashboard/dashboard1";
import Dashboard2 from "./scenes/dashboard/dashboard2";
import Dashboard3 from "./scenes/dashboard/dashboard3";
import EmptyDashboard from "./scenes/emptyDashboard/EmptyDashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import SearchMenu from "./components/searchMenu/searchMenu";
import PromptContext, { PromptProvider } from "./context/PromptContext";
import ChartPage from "./scenes/chart/ChartPage"; // Dynamic chart page component
import { SearchMenuProvider } from "./context/SearchMenuContext";
// Import filtering components
import FilterBar from "./components/FilterBar";
import { FilterProvider } from "./context/FilterContext";

// Fetch and manage visuals
function App() {
  const [activeDashboard, setActiveDashboard] = useState(null); // Global dashboard state

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const { visualGroups, setVisualGroups } = useContext(PromptContext);

  // Fetch visual groups from backend
  useEffect(() => {
    fetch("https://fastapi-app2-ji8g.onrender.com/generate_visuals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: "As a Sales Manager, I need to assess..." }),
    })
      .then((response) => response.json())
      .then((data) => setVisualGroups(data.visual_groups))
      .catch((error) => console.error("Error fetching visuals:", error));
  }, [setVisualGroups]);

  // Assign each visual group to a dashboard
  const dashboard1Visuals = visualGroups[0]?.visuals || [];
  const dashboard2Visuals = visualGroups[1]?.visuals || [];
  const dashboard3Visuals = visualGroups[2]?.visuals || [];

  return (
    <PromptProvider>
      <SearchMenuProvider>
      <FilterProvider>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="app">
            <Sidebar activeDashboard={activeDashboard} setActiveDashboard={setActiveDashboard} />              <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Routes>
                <Route path="/" element={<SearchMenu activeDashboard={activeDashboard} setActiveDashboard={setActiveDashboard} />} />
                  
                  {/* Apply filtering for dashboard1 */}
                  <Route
                    path="/dashboard1"
                    element={
                      <>
                        <FilterBar visuals={dashboard1Visuals} />
                        <Dashboard1 visuals={dashboard1Visuals} />
                      </>
                    }
                  />

                  {/* Apply filtering for dashboard2 */}
                  <Route
                    path="/dashboard2"
                    element={
                      <>
                        <FilterBar visuals={dashboard2Visuals} />
                        <Dashboard2 visuals={dashboard2Visuals} />
                      </>
                    }
                  />

                  {/* Apply filtering for dashboard3 */}
                  <Route
                    path="/dashboard3"
                    element={
                      <>
                        <FilterBar visuals={dashboard3Visuals} />
                        <Dashboard3 visuals={dashboard3Visuals} />
                      </>
                    }
                  />

                  <Route path="/empty-dashboard" element={<EmptyDashboard />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/bar" element={<Bar />} />
                  <Route path="/pie" element={<Pie />} />
                  <Route path="/line" element={<Line />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/geography" element={<Geography />} />

                  {/* Dynamic Chart Route */}
                  <Route
                    path="/chart/:id"
                    element={
                      <>
                        <FilterBar visuals={dashboard1Visuals.concat(dashboard2Visuals, dashboard3Visuals)} />
                        <ChartPage visuals={dashboard1Visuals.concat(dashboard2Visuals, dashboard3Visuals)} />
                      </>
                    }
                  />
                </Routes>
              </main>
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </FilterProvider>
      </SearchMenuProvider>
    </PromptProvider>
  );
}

export default App;
