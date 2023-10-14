import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export function graph_dist(dist) {
    // Filter out useless data (Probabilities that are practically 0)
    const keys = Object.keys(dist.probabilities);
    const data = keys.filter((key) => {
        return dist.probabilities[key] > 0.0000001;
    });

    // Declare the chart dimensions and margins.
    const width = 960;
    const height = 500;

    const margin = {
        left: 70,
        right: 40,
        top: 40,
        bottom: 50
    }

    // Declare the x (horizontal position) scale.
    const x_scale = d3.scaleBand()
        .domain(data.map((d) => d))
        .range([margin.left, width - margin.right]).padding(0.2);

    // Declare the y (vertical position) scale.
    const y_scale = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => dist.probabilities[d] + 0.025)])
        .range([height - margin.bottom, margin.top]);

    // Remove existing graph if it exists
    d3.select(".dist-output .dist-graph svg").remove("svg");

    // Create the SVG container.
    const svg = d3.select(".dist-output .dist-graph").append("svg");
    svg.attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height]);

    // Create tooltip when user hovers over a bar
    const tooltip = d3.select('#tooltip');
    const mouseover = (event, d) => {
        tooltip.style("opacity", 0.9);
    };
    const mouseleave = (event, d) => {
        tooltip.style('opacity', 0);
    }
    const mousemove = (event, d) => {
        const x = event.pageX + 15, y = event.pageY - 60;
        tooltip.select("label").text(`P(X = ${d})`);
        tooltip.select("#tooltip-val").text(`= ${dist.probabilities[d].toFixed(5)}`);
        tooltip.style('left', (x) + "px").style('top', (y) + "px");
    };

    // Create Rectangles
    svg.selectAll("rect")
        .data(data)
        .join("rect")
            .attr("class", "bar")
            .attr("fill", "steelblue")
            .attr("x", (d) => x_scale(d))
            .attr("y", (d) => y_scale(dist.probabilities[d]))
            .attr("width", x_scale.bandwidth())
            .attr("height", (d) => height - (y_scale(dist.probabilities[d]) + margin.bottom))
            .on("mousemove", mousemove)
            .on("mouseover", mouseover)
            .on("mouseout", mouseleave);

    // Create x-axis 
    svg.append("g")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(x_scale))
        .call((g) => g.append("text")
            .attr("x", (width + margin.left - margin.right) / 2)
            .attr("y", margin.top / 1.25)
            .attr("fill", "currentColor")
            .attr("text-anchor", "middle")
            .text("x"));

    // Create y-axis
    svg.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y_scale).ticks(5))
    .call((g) => g.select(".domain").remove())
    .call((g) => g.append("text")
        .attr("x", -height / 2)
        .attr("y", -margin.left / 1.5)
        .attr("fill", "currentColor")
        .attr("transform", "rotate(-90)")
        .text("P(X = x)"));
}