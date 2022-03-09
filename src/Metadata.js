import { Button, ButtonGroup } from "@blueprintjs/core";
import { min, max, scaleTime, timeFormat } from 'd3';
import { useState } from 'react';
import ReactTooltip from "react-tooltip";

import { AxisBottom } from './AxisBottom';

// utility formatting funcs
const timeFormatter = timeFormat('%b %d');

const formatTooltipStr = (name, date) => {
    return timeFormatter(date) + ': ' + name
};


export const Metadata = ({data, width, height, superlocColors}) => {
    const markerHeight = 10;
    const padding = 10; // will be added to left and right
    const tooltipId = 'metadata-tooltip';
    const [tooltipStr, setTooltipStr] = useState('');

    const buttonWidth = width / 5;

    var dates = [];
    data.metadata.map((d) => {
        return d.trajectory.map(traj => {
            dates.push(traj.source_date)
        })
    });

    const scale = scaleTime()
        .domain([min(dates), max(dates)])
        .range([0, width - 2*padding]);

    return (
        <div className='metadata-container' width={width} height={height}>
            {data.metadata.map(d => {
                console.log(superlocColors, d)
                return (
                    <div
                        className='metadata-group'
                        width={width}
                        height={4*markerHeight}
                        onClick={() => console.log('clicked a div', d)}
                    >
                        <ReactTooltip id={tooltipId} />
                        <ButtonGroup fill style={{width: buttonWidth}}>
                            <Button className='metadata-button' text={d.name} />
                        </ButtonGroup>
                        <svg
                            className='metadata-line'
                            width={width - buttonWidth - padding/2}
                            height={markerHeight*4}
                        >
                            <line
                                stroke='#dadada'
                                x1={0}
                                x2={width}
                                y1={markerHeight*2}
                                y2={markerHeight*2}
                            />
                            {d.trajectory.map((trajectory) => {
                                const trajectory_name = data.superlocs.find(d => d.id === trajectory.source).name;
                            return (
                            <circle
                                data-tip={tooltipStr}
                                data-for={tooltipId}
                                cx={scale(trajectory.source_date) + padding}
                                cy={markerHeight*2}
                                r={markerHeight}
                                fill={superlocColors[trajectory.source]}
                                onMouseEnter={() => setTooltipStr(formatTooltipStr(trajectory_name, trajectory.source_date))}
                                onMouseLeave={() => setTooltipStr('')}
                            />
                            )
                        })}
                        </svg>
                    </div>
                )
            })}
            <AxisBottom
                scale={scale}
                offsetx={buttonWidth}
                width={width - buttonWidth - 5}
                height={markerHeight*4}
            />
        </div>
    )
};