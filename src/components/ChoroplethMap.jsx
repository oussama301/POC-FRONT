import React, { useEffect, useState } from "react";
import Map, { Source, Layer, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import worldGeoJson from "./world.json"; // Ensure this file exists
import allData from "./all.json"; // Ensure this file exists

const MAPBOX_TOKEN = "pk.eyJ1Ijoib3Vzc2FtYTMwMSIsImEiOiJjbTZwMGhicWQxOThlMmpzODh5YjBodXZvIn0.uOclRlmauNnmhyv7T1ExJw"; // 🔑 Replace with your Mapbox key

// ✅ Fix region-country mappings
const regionCorrections = {
  "North America": "Americas",
  "South America": "Americas",
  "Europe": "Europe",
  "Asia": "Asia",
  "Africa": "Africa",
  "Australia": "Oceania",
};

// ✅ Fix country name mismatches between `world.json` and `all.json`
const countryNameCorrections = {
  "Czechia": "Czech Republic",
  "Russian Federation": "Russia",
  "Bolivia (Plurinational State of)": "Bolivia",
  "Venezuela (Bolivarian Republic of)": "Venezuela",
  
  "IIran, Islamic Republic of": "Iran",
};

// ✅ Function to map regions to corresponding country names
function getCountriesByRegion(regions) {
  if (!allData || !Array.isArray(allData)) {
      console.error("🚨 Error: all.json data is not an array!", allData);
      return [];
  }

  let countryList = [];

  regions.forEach(region => {
      if (!region) { 
          console.warn("⚠️ Found null or undefined region in x_data!", regions);
          return; // Skip this iteration
      }

      const correctedRegion = regionCorrections[region] || region;

      let countries = allData
          .filter(entry => entry.region && entry.region.toLowerCase() === correctedRegion.toLowerCase()) // Ensure entry.region is not null
          .map(entry => entry.name);

      if (countries.length === 0) {
          console.warn(`⚠️ Warning: No countries found for region '${region}'`);
      }

      countryList = [...countryList, ...countries];
  });

  return countryList;
}

const ChoroplethMap = ({ data = { x_data: [], y_data: [] } }) => {
  const [hoverInfo, setHoverInfo] = useState(null); // Tooltip state

  useEffect(() => {
      console.log("🗺️ ChoroplethMap received data:", data);
  }, [data]);

  // ✅ Ensure data is structured correctly
  if (!data.x_data || !data.y_data || !Array.isArray(data.x_data) || !Array.isArray(data.y_data) || data.x_data.length === 0) {
      console.error("🚨 Error: Data is missing or incorrectly structured!", data);
      return <p style={{ color: "red" }}>⚠️ No valid data available</p>;
  }

  // ✅ Log received regions and check for NULL values
  console.log("✅ Regions from API:", data.x_data);
  data.x_data.forEach(region => {
      if (!region) console.warn("⚠️ Found NULL or UNDEFINED region!", data.x_data);
  });

  // ✅ Remove null or undefined values from x_data
  const filteredRegions = data.x_data.filter(region => region);

  // ✅ Convert x_data from Regions → Countries using the corrected mappings
  const transformedCountries = getCountriesByRegion(filteredRegions);

  // ✅ Normalize values for proper color scale (per region)
  const regionColorScale = {};
  filteredRegions.forEach((region, idx) => {
      const minValue = Math.min(...data.y_data);
      const maxValue = Math.max(...data.y_data);
      const normalizedValue = (data.y_data[idx] - minValue) / (maxValue - minValue); // Normalize per region

      regionColorScale[region] = {
          value: data.y_data[idx],
          color: `rgba(${255 - normalizedValue * 255}, ${normalizedValue * 255}, 0, 0.8)`, // Gradient from Red to Yellow
      };
  });

  console.log("✅ Region Color Scale:", regionColorScale);

  // 🟡 Fix: Map each country to a corresponding y_data value based on its region
  const valueMap = {};
  transformedCountries.forEach((country) => {
      const correctedName = countryNameCorrections[country] || country;
      const region = filteredRegions.find(r => getCountriesByRegion([r]).includes(country));

      if (region && regionColorScale[region]) {
          valueMap[correctedName] = {
              color: regionColorScale[region].color,
              value: regionColorScale[region].value,
              region: region
          };
      }
  });

  // ✅ Log missing countries
  console.log("🌍 Checking for missing countries...");
  const geoJsonCountries = worldGeoJson.features.map(f => f.properties.name.toLowerCase());
  const mappedCountries = Object.keys(valueMap).map(c => c.toLowerCase());

  const missingCountries = geoJsonCountries.filter(country => !mappedCountries.includes(country));
  console.warn("❌ Missing countries:", missingCountries);

  // ✅ Assign a default color to unmapped countries
  worldGeoJson.features.forEach(feature => {
      const country = feature.properties.name;
      if (!valueMap[country]) {
          valueMap[country] = {
              color: "#dddddd", // Gray for missing data
              value: "N/A",
              region: "Unknown"
          };
      }
  });

  // 🎨 Define the color scale
  const layerStyle = {
      id: "choropleth",
      type: "fill",
      paint: {
          "fill-color": [
              "match",
              ["get", "name"],
              ...Object.entries(valueMap).flatMap(([country, data]) => [country, data.color]),
              "#cccccc" // Default color for missing countries
          ],
          "fill-opacity": 0.8,
          "fill-outline-color": "#ffffff" // Add border to better differentiate countries
      }
  };

  return (
      <div style={{ height: "450px", width: "100%", position: "relative" }}>
          <h3 style={{ textAlign: "center", color: "white", marginBottom: "10px" }}>{data.title}</h3>
          <Map
              initialViewState={{
                  longitude: 0,
                  latitude: 20,
                  zoom: 1.5
              }}
              style={{ width: "100%", height: "80%", borderRadius: "10px", position: "center", overflow: "hidden" }}
              mapStyle="mapbox://styles/mapbox/light-v10"
              mapboxAccessToken={MAPBOX_TOKEN}
              interactiveLayerIds={["choropleth"]}
              onMouseMove={(event) => {
                  const country = event.features?.[0]?.properties?.name;
                  if (country && valueMap[country]) {
                      setHoverInfo({
                          country,
                          region: valueMap[country].region,
                          value: valueMap[country].value,
                          color: valueMap[country].color,
                          lngLat: event.lngLat,
                      });
                  } else {
                      setHoverInfo(null);
                  }
              }}
              onMouseLeave={() => setHoverInfo(null)}
          >
              <Source id="geo-data" type="geojson" data={worldGeoJson}>
                  <Layer {...layerStyle} />
              </Source>

              {hoverInfo && (
                  <Popup
                      longitude={hoverInfo.lngLat.lng}
                      latitude={hoverInfo.lngLat.lat}
                      closeButton={false}
                      closeOnClick={false}
                      anchor="top"
                  >
                      <div style={{ background: hoverInfo.color, padding: "5px", borderRadius: "5px", color: "white" }}>
                          <strong>{hoverInfo.country}</strong> <br />
                          Region: {hoverInfo.region} <br />
                          Value: {hoverInfo.value}
                      </div>
                  </Popup>
              )}
          </Map>
      </div>
  );
};

export default ChoroplethMap;