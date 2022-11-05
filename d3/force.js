const graph = {
  links: [
    { source: 0, target: 1 },
    { source: 1, target: 2 },
    { source: 2, target: 3 },
  ],
  nodes: [
    { name: 'a', id: 0, counter: 42 },
    { name: 'b', id: 1 },
    { name: 'c', id: 2 },
    { name: 'd', id: 3, counter: 7 },
  ]
}

const width = window.innerWidth
const height = window.innerHeight
const forceLink = d3.forceLink().id(node => node.id).distance(120)

const simulation =
  d3.forceSimulation()
    .force('link', forceLink)
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width / 2, height / 2))

function ticked() {
  d3.select('svg')
    .selectAll('circle')
    .data(graph.nodes)
    .join('circle')
    .attr('r', 15)
    .attr('cx', data => data.x)
    .attr('cy', data => data.y)
    .attr('fill', '#6657A6')

  d3.select('svg')
    .selectAll('line')
    .data(graph.links)
    .join('line').attr('stroke-width', 2)

    .attr('x1', node => node.source.x + 0.1).attr('y1', node => node.source.y + 0.1)
    .attr('x2', node => node.target.x).attr('y2', node => node.target.y)
    .attr('stroke', '#6657A6')
}

simulation.nodes(graph.nodes).on('tick', ticked)
simulation.force('link').links(graph.links)
