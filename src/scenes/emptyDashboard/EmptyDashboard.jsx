import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
//import GeographyChart from "../../components/GeographyChart";
import ProgressCircle from "../../components/ProgressCircle";

const EmptyDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
        Empty Dashboard
      </Typography>
      <Typography variant="subtitle1" color={colors.grey[300]} marginBottom="20px">
        No data available at the moment. Please come back later when data is available.
      </Typography>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 - EMPTY METRICS */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h6" color={colors.grey[100]}>
            Emails Sent: N/A
          </Typography>
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h6" color={colors.grey[100]}>
            Sales Obtained: N/A
          </Typography>
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h6" color={colors.grey[100]}>
            New Clients: N/A
          </Typography>
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h6" color={colors.grey[100]}>
            Traffic Received: N/A
          </Typography>
        </Box>

        {/* ROW 2 - EMPTY LINE CHART */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                N/A
              </Typography>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            {/* Placeholder for Line Chart */}
            <LineChart isDashboard={true} data={[]} />
          </Box>
        </Box>

        {/* ROW 2 - EMPTY RECENT TRANSACTIONS */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {/* No recent transactions available */}
          <Box p="15px">
            <Typography color={colors.grey[100]}>
              No transactions available.
            </Typography>
          </Box>
        </Box>

        {/* ROW 3 - EMPTY PROGRESS CIRCLE */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign Progress
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" progress={0} />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              N/A revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>

        {/* ROW 3 - EMPTY BAR CHART */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            {/* Placeholder for Bar Chart */}
            <BarChart isDashboard={true} data={[]} />
          </Box>
        </Box>

        {/* ROW 3 - EMPTY GEOGRAPHY CHART */}
       
      </Box>
    </Box>
  );
};

export default EmptyDashboard;
