import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const ArcDiagram = ({ data, title }) => {
  const svgRef = useRef();
  const tooltipRef = useRef(); // Tooltip reference for better DOM control
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    label: "",
    value: 0,
    color: "",
  });

  console.log("🚀 Arc Diagram received raw data:", JSON.stringify(data, null, 2));

  // 🔹 Validate data before processing
  const isValidData =
    data &&
    Array.isArray(data.x_data) &&
    Array.isArray(data.y_data) &&
    data.x_data.length > 0 &&
    data.y_data.length > 0 &&
    data.x_data.length === data.y_data.length;

  if (!isValidData) {
    console.error("❌ Invalid Arc Diagram data! Using fallback values.");
  }

  // 🔹 Provide fallback data if input is invalid
  const safeData = isValidData
    ? data
    : {
        x_data: ["Q1", "Q2", "Q3", "Q4"],
        y_data: [44970, 33214, 6804, 5048], // Default values
      };

  // Convert data into nodes and links
  const nodes = safeData.x_data.map((label, index) => ({
    id: label,
    value: safeData.y_data[index],
    color: d3.schemeCategory10[index % 10],
  }));

  const links = safeData.x_data.map((label, index) => {
    if (index === safeData.x_data.length - 1) return null;
    return {
      source: label,
      target: safeData.x_data[index + 1],
      value: Math.abs(safeData.y_data[index] - safeData.y_data[index + 1]),
    };
  }).filter(Boolean);

  useEffect(() => {
    const width = 400, height = 300;

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const x = d3.scalePoint()
      .domain(nodes.map(d => d.id))
      .range([50, width - 50]);

    // Create links (curved arcs)
    svg.selectAll("path")
      .data(links)
      .enter().append("path")
      .attr("fill", "none")
      .attr("stroke", "#999")
      .attr("stroke-width", d => Math.max(1, Math.sqrt(d.value / 2000)))
      .attr("d", d => {
        const startX = x(d.source);
        const endX = x(d.target);
        const midY = height / 1.5;
        return `M${startX},${midY} A${(endX - startX) / 2},${(endX - startX) / 2} 0 0,1 ${endX},${midY}`;
      });

    // Create nodes (circles)
    svg.selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("cx", d => x(d.id))
      .attr("cy", height / 1.5)
      .attr("r", 8)
      .attr("fill", d => d.color)
      .on("mouseover", function (event, d) {
        d3.select(this).transition().duration(150).attr("r", 12); // ✅ Increase size on hover

        // ✅ Set tooltip state
        setTooltip({
          visible: true,
          x: event.pageX + 10,
          y: event.pageY - 30,
          label: d.id,
          value: d.value,
          color: d.color,
        });

        if (tooltipRef.current) {
          tooltipRef.current.style.opacity = 1;
        }
      })
      .on("mousemove", function (event) {
        // ✅ Move tooltip dynamically
        setTooltip((prev) => ({
          ...prev,
          x: event.pageX + 10,
          y: event.pageY - 30,
        }));
      })
      .on("mouseout", function () {
        d3.select(this).transition().duration(150).attr("r", 8); // ✅ Reset size on hover out

        setTooltip({ visible: false, label: "", value: 0, color: "" });

        if (tooltipRef.current) {
          tooltipRef.current.style.opacity = 0;
        }
      });

    // Add labels
    svg.selectAll("text")
      .data(nodes)
      .enter().append("text")
      .attr("x", d => x(d.id))
      .attr("y", height / 1.5 + 20)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "#333")
      .text(d => d.id);
  }, [nodes, links]);

  return (
    <div style={{ width: "100%", height: "300px", textAlign: "center", position: "relative" }}>
      <h3 style={{ marginBottom: "10px", color: "#4CAF50" }}>{title}</h3>
      <svg ref={svgRef}></svg>

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          left: `${tooltip.x}px`,
          top: `${tooltip.y}px`,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "#fff",
          padding: "6px 12px",
          borderRadius: "4px",
          pointerEvents: "none",
          display: tooltip.visible ? "flex" : "none",
          alignItems: "center",
          gap: "6px",
          fontSize: "12px",
          opacity: tooltip.visible ? 1 : 0,
          transition: "opacity 0.2s ease-in-out",
        }}
      >
        {/* Color square */}
        <div
          style={{
            width: "12px",
            height: "12px",
            backgroundColor: tooltip.color,
            borderRadius: "50%",
          }}
        />
        <span>{tooltip.label}: {tooltip.value}</span>
      </div>
    </div>
  );
};

export default ArcDiagram;
