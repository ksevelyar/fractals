const graph = {
  links: [
    { source: 0, target: 1 },
    { source: 1, target: 2 },
    { source: 2, target: 3 },
    { source: 3, target: 4 },
  ],
  nodes: [
    { name: 'dev1', id: 0, user_counter: '42' },
    { name: 'dev2', id: 1 },
    { name: 'dev3', id: 2 },
    { name: 'dev4', id: 3, user_counter: '70' },
    { name: 'dev5', id: 4, user_counter: '99' },
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

const svg = d3.select('svg')
const node = svg.append('g')
  .attr('fill', '#fff')
  .selectAll('g')
  .data(graph.nodes)
  .join('g')

node
  .append('circle')
  .attr('r', 20)
  .attr('fill', '#666')

node.append('text')
  .text(d => d.name)
  .attr('fill', '#6657A6')
  .attr('dy', 42)

node
  .filter(d => d.user_counter)
  .append('circle')
  .attr('class', 'counter')
  .attr('r', 12)
  .attr('cy', -10)
  .attr('cx', 10)

node
  .filter(d => d.user_counter)
  .append('text')
  .text(d => d.user_counter)
  .attr('fill', 'black')
  .attr('x', -1)
  .attr('y', -5)

function ticked() {
  svg
    .selectAll('line')
    .data(graph.links)
    .join('line').attr('stroke-width', 2)

    .attr('x1', node => node.source.x + 0.1).attr('y1', node => node.source.y + 0.1)
    .attr('x2', node => node.target.x).attr('y2', node => node.target.y)
    .attr('stroke', '#666')

  node
    .attr('transform', data => 'translate(' + data.x + ', ' + data.y + ')')

}

simulation.nodes(graph.nodes).on('tick', ticked)
simulation.force('link').links(graph.links)
