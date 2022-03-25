import { forceSimulation, forceManyBody, forceLink, forceCenter } from 'd3';
import { useState, useEffect} from 'react';

export const Graph = ({ data, width, height, superlocColors, clickedMetadata }) => {
    const nodes = data.superlocs.reduce((prev, curr) => { prev.push({id: curr.id}); return prev}, [])
    const links = data.metadata.reduce((m_prev, m_curr) => {
        return m_prev.concat(m_curr.trajectory);
        }, [])

    const [animatedNodes, setAnimatedNodes] = useState(nodes);
    const [animatedLinks, setAnimatedLinks] = useState(links);

    console.log(clickedMetadata);

    useEffect(() => {
        const simulation = forceSimulation(nodes)
            .force('charge', forceManyBody().strength(-500))
            .force('link', forceLink(links))
            .force('center', forceCenter());
  
        simulation.on('tick', () => {
            setAnimatedNodes([...simulation.nodes()]);
      });

      simulation.nodes([...nodes]);
      simulation.alpha(0.1).restart();

      return () => simulation.stop();
    }, [data]);

    return <svg width={width} height={height}>
        <g transform={`translate(${width / 2},${height / 2})`}>
            {animatedLinks.map((link) => {
                return <line
                    className='graph-link'
                    x1={link.source.x}
                    x2={link.target.x}
                    y1={link.source.y}
                    y2={link.target.y}
                />
            })}
            {animatedNodes.map((node) => (
                <circle 
                    cx={node.x}
                    cy={node.y}
                    r={10}
                    key={node.index}
                    fill={superlocColors[node.id]}
                />
            ))}
        </g>
    </svg>
}