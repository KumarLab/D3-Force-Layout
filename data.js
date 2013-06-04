// JavaScript D3.js Data and Script
// by Prabhat Kumar; 04/06/2013; 05:46:44 PM
// Set the Page
var margin = 20;
var w = 1000 - margin;
var h = 680 - margin;
// Data
var dataset = {
	nodes:[
		{name:"HTML"},
		{name:"CSS"},
		{name:"JavaScript"},
		{name:"jQuery"},
		{name:"jQuery Mobile"},
		{name:"Ajax"},
		{name:"JSON"},
		{name:"D3"},
		{name:"Windows"},
		{name:"Technology"}
	],
	edges:[
		{source:0,target:9},
		{source:1,target:9},
		{source:2,target:9},
		{source:3,target:9},
		{source:4,target:9},
		{source:5,target:9},
		{source:6,target:9},
		{source:7,target:9},
		{source:9,target:8},
		/* Interlink */
		{source:0,target:1},
		{source:2,target:3},
		{source:3,target:4},
		{source:3,target:5},
		{source:2,target:6},
		{source:2,target:7},
		{source:3,target:7}
	]
};
// Initialize a default force layout, using the nodes and edges in dataset.
var force = d3.layout.force()
		     .nodes(dataset.nodes)
		     .links(dataset.edges)
		     .size([w, h])
		     .linkDistance([80])
		     .charge([-100])
		     .start();
var colors = d3.scale.category10();
// Create SVG element
var svg = d3.select("body")
			.append("svg")
			.attr("width", w)
			.attr("height", h);
// Create edges as lines.
var edges = svg.selectAll("line")
			   .data(dataset.edges)
			   .enter()
			   .append("line")
			   .style("stroke","#0CC")
			   .style("stroke-width",1);
// Create nodes as circles.
var nodes = svg.selectAll("circle")
			   .data(dataset.nodes)
			   .enter()
			   .append("circle")
			   .attr("r",10)
			   .style("fill",function(d,i){
				   return colors(i);
			   })
			   .call(force.drag);
// Every time the simulation "ticks", this will be called.
force.on("tick",function(){
	edges.attr("x1", function(d){return d.source.x;})
		 .attr("y1", function(d){return d.source.y;})
		 .attr("x2", function(d){return d.target.x;})
		 .attr("y2", function(d){return d.target.y;});
	nodes.attr("cx", function(d){return d.x;})
		 .attr("cy", function(d){return d.y;});
});
