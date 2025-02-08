import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="90%" m="0 30px">
      {/* Section titre et icône */}
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          {icon}
          <Typography
            variant="h3" // Plus grand pour plus de visibilité
            fontWeight="bold"
            sx={{
              color: "rgb(3, 3, 3)", // Noir en RGB
              textShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)", // Ombre légère
              textTransform: "uppercase",
              ml: 1, // Ajoute un petit espace entre l'icône et le texte
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle progress={progress} />
        </Box>
      </Box>

      {/* Section sous-titres */}
      <Box display="flex" justifyContent="space-between" mt={1}>
        <Typography
          variant="h4" // Plus grand pour plus de lisibilité
          fontWeight="600" // Texte plus visible
          sx={{ 
            color: "rgb(28, 85, 192)", // Bleu foncé
            textAlign: "center", 
            fontSize: "1.2rem" // Ajusté pour plus de clarté
          }}
        >
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: "rgb(201, 220, 236)" }} // Bleu clair
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
