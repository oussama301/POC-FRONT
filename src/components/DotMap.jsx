import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Typography, Box } from "@mui/material";
import chroma from "chroma-js";

// Define country coordinates
const countryCoordinates = {
  "North America": { lat: 54.526, lon: -105.2551 },
  Europe: { lat: 54.526, lon: 15.2551 },
  Asia: { lat: 34.0479, lon: 100.6197 },
  "South America": { lat: -14.235, lon: -51.9253 },
  "United States": { lat: 37.0902, lon: -95.7129 },
  Canada: { lat: 56.1304, lon: -106.3468 },
  France: { lat: 46.6034, lon: 2.2137 },
  Germany: { lat: 51.1657, lon: 10.4515 },
  India: { lat: 20.5937, lon: 78.9629 },
  China: { lat: 35.8617, lon: 104.1954 },
  Brazil: { lat: -14.235, lon: -51.9253 },
  Mexico: { lat: 23.6345, lon: -102.5528 },
  "South Africa": { lat: -30.5595, lon: 22.9375 },
};

// Define a heat-based color scale
const colorScale = chroma.scale(["#440154", "#21908d", "#fde725"]).domain([0, 1]);

const DotMap = ({ data }) => {
  if (!data || !data.x_data || !data.y_data) {
    return <p>Invalid data</p>;
  }

  const minVal = Math.min(...data.y_data);
  const maxVal = Math.max(...data.y_data);
  const totalValue = data.y_data.reduce((acc, val) => acc + val, 0);

  // Normalize the size of the dots between 5 and 50
  const getSize = (value) => {
    return 5 + ((value - minVal) / (maxVal - minVal)) * (50 - 5);
  };

  // Get color based on value
  const getColor = (value) => {
    const normalizedValue = (value - minVal) / (maxVal - minVal);
    return colorScale(normalizedValue).hex();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        borderRadius: "1px",
        overflow: "hidden",
        padding: 2,
      }}
    >
      {/* Map Container */}
      <Box sx={{ flex: 1, position: "relative" }}>
        <Typography variant="h6" align="center" sx={{ color: "white", marginBottom: 2 }}>
          {data.title}
        </Typography>
        <MapContainer center={[20, 0]} zoom={1} style={{ height: "250px", width: "100%", borderRadius: "2px" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {data.x_data.map((country, index) => {
            const coords = countryCoordinates[country];
            if (!coords) {
              console.warn(`Coordinates not found for ${country}`);
              return null;
            }

            const percentage = ((data.y_data[index] / totalValue) * 100).toFixed(2);
            const value = data.y_data[index];
            const dotColor = getColor(value);

            return (
              <CircleMarker
                key={country}
                center={[coords.lat, coords.lon]}
                radius={getSize(value)}
                fillColor={dotColor}
                fillOpacity={0.8}
                color="#fff"
                weight={1}
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                  <span style={{ fontWeight: "bold", color: dotColor }}>
                    {country}: {value} ({percentage}%)
                  </span>
                </Tooltip>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </Box>

      {/* Heat Legend */}
      <Box
        sx={{
          width: "50px",
          height: "200px",
          marginLeft: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Max Labels */}
        <Typography sx={{ fontSize: "12px", color: "black", marginTop: "5px" }}>{maxVal}</Typography>

        {/* Gradient Scale */}
        <Box
          sx={{
            width: "20px",
            height: "150px",
            background: `linear-gradient(to top, ${colorScale(0).hex()}, ${colorScale(0.5).hex()}, ${colorScale(1).hex()})`,
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        {/* Min Labels */}
        <Typography sx={{ fontSize: "12px", color: "black", marginBottom: "5px" }}>{minVal}</Typography>
      </Box>
    </Box>
  );
};

export default DotMap;
