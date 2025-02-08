import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const KpiBox = ({ title, value, target, trend }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      width="60%"
      height="100%"
      padding="20px"
      backgroundColor={colors.primary[400]}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      borderRadius="8px"
    >
      <Typography variant="h6" fontWeight="600" color={colors.grey[100]}>
        {title}
      </Typography>
      <Typography variant="h5" fontWeight="bold" color={colors.greenAccent[500]} mt="10px">
        {value}
      </Typography>
      <Typography variant="body1" color={colors.grey[300]} mt="5px">
        Target: {target}
      </Typography>
      <Typography
        variant="body2"
        color={trend >= 0 ? colors.greenAccent[600] : colors.redAccent[600]}
        mt="5px"
      >
        Trend: {trend >= 0 ? `+${trend}` : trend}
      </Typography>
    </Box>
  );
};

export default KpiBox;
