import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Typography, Box } from '@mui/material';

// Define country coordinates
const countryCoordinates = {
  "North America": { lat: 54.526, lon: -105.2551 },
  "Europe": { lat: 54.526, lon: 15.2551 },
  "Asia": { lat: 34.0479, lon: 100.6197 },
  "South America": { lat: -14.235, lon: -51.9253 },
  "United States": { lat: 37.0902, lon: -95.7129 },
  "Canada": { lat: 56.1304, lon: -106.3468 },
  "France": { lat: 46.6034, lon: 2.2137 },
  "Germany": { lat: 51.1657, lon: 10.4515 },
  "India": { lat: 20.5937, lon: 78.9629 },
  "China": { lat: 35.8617, lon: 104.1954 },
  "Brazil": { lat: -14.2350, lon: -51.9253 },
  "Mexico": { lat: 23.6345, lon: -102.5528 },
  "South Africa": { lat: -30.5595, lon: 22.9375 },
};

// Function to generate distinct colors for each country/region
const getColor = (index) => {
  const colors = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF',
    '#33FFF5', '#F5FF33', '#FFA533', '#33A1FF', '#F533FF',
  ];
  return colors[index % colors.length];
};

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

  return (
    <Box sx={{ width: '100%', borderRadius: '1px', overflow: 'hidden', padding: 2 }}>
      <Typography variant="h6" align="center" sx={{ color: 'white', marginBottom: 2 }}>
        {data.title}
      </Typography>
      <MapContainer
        center={[20, 0]}
        zoom={1}
        style={{ height: '250px', width: '100%', borderRadius: '2px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.x_data.map((country, index) => {
          const coords = countryCoordinates[country];
          if (!coords) {
            console.warn(`Coordinates not found for ${country}`);
            return null;
          }

          const percentage = ((data.y_data[index] / totalValue) * 100).toFixed(2);

          return (
            <CircleMarker
              key={country}
              center={[coords.lat, coords.lon]}
              radius={getSize(data.y_data[index])}
              fillColor={getColor(index)}
              fillOpacity={0.8}
              color="#fff"
              weight={1}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <span style={{ fontWeight: 'bold', color: getColor(index) }}>
                  {country}: {data.y_data[index]} ({percentage}%)
                </span>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </Box>
  );
};

export default DotMap;
