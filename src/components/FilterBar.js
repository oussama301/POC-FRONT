import React, { useState } from "react";
import { FormControl, InputLabel, useTheme, Select, MenuItem, Button } from "@mui/material";
import { useFilters } from "../context/FilterContext";
import { tokens } from "../theme";



const filterKeywords = [
  "month", "product", "time", "regions", "account", "segments",
  "categories", "sales_channel", "performance", "quantity",
  "amount", "number", "countries", "weekly"
];

const FilterBar = ({ visuals }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  const { filters, setFilters } = useFilters();
  const [selectedKeyword, setSelectedKeyword] = useState("");

  // Extract available filters dynamically based on visuals data
  const availableFilters = visuals.reduce((acc, visual) => {
    if (visual.dimension && typeof visual.dimension === "string") {
      const dimensionText = visual.dimension.toLowerCase();
      filterKeywords.forEach((keyword) => {
        if (dimensionText.includes(keyword)) {
          acc[keyword] = visual.data?.x_data || [];
        }
      });
    }
    return acc;
  }, {});

  // Handle keyword selection
  const handleKeywordChange = (event) => {
    setSelectedKeyword(event.target.value);
  };

  // Handle filter selection, including "Select All" option
  const handleFilterChange = (event, filterKey) => {
    const { value } = event.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: value.includes("all") 
        ? availableFilters[filterKey]  // Select all values if "Select All" is chosen
        : value,  // Specific selections
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({});
    setSelectedKeyword("");
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
      <FormControl style={{ minWidth: 250 }}>
        <InputLabel>Select Filter</InputLabel>
        <Select value={selectedKeyword} onChange={handleKeywordChange}>
          {Object.keys(availableFilters).map((key) => (
            <MenuItem key={key} value={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedKeyword && (
        <FormControl style={{ minWidth: 250 }}>
          <InputLabel>{selectedKeyword}</InputLabel>
          <Select
            multiple
            value={filters[selectedKeyword] || []}
            onChange={(e) => handleFilterChange(e, selectedKeyword)}
          >
            <MenuItem value="all">
              <em>Select All</em>
            </MenuItem>
            {availableFilters[selectedKeyword]?.map((value, index) => (
              <MenuItem key={index} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <Button
        sx={{
            backgroundColor: "#1565C1",
            color:"#fff",
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        onClick={resetFilters}
        
        
      >
        RESET FILTERS
      </Button>
    </div>
  );
};

export default FilterBar;
