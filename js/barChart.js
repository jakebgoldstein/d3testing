d3.csv("data/data.csv").then(data => {
  data.forEach(d => {
    d.value = +d.value;
  });

  const width = 500;
  const height = 300;
  const margin = { top: 30, right: 20, bottom: 40, left: 40 };

  const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const x = d3.scaleBand()
    .domain(data.map(d => d.label))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .nice()
    .range([height - margin.bottom, margin.top]);

  svg.append("g")
    .attr("fill", "#69b3a2")
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr("x", d => x(d.label))
      .attr("y", d => y(d.value))
      .attr("height", d => y(0) - y(d.value))
      .attr("width", x.bandwidth());

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));
});
