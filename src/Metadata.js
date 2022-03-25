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


export const Metadata = ({data, width, height, superlocColors, clickedMetadata, setClickedMetadata }) => {
    const markerHeight = 10;
    const padding = 10; // will be added to left and right
    const tooltipId = 'metadata-tooltip';
    const [tooltipStr, setTooltipStr] = useState('');

    const buttonWidth = width / 5;
    const svgWidth = width - buttonWidth - padding * 2;
    const svgInnerWidth = svgWidth - padding*2;

    var dates = [];
    data.metadata.map((d) => {
        return d.trajectory.map(traj => {
            dates.push(traj.source_date)
        })
    });

    console.log(min(dates), max(dates));

    const scale = scaleTime()
        .domain([min(dates), max(dates)])
        .range([0, svgWidth - padding*2]);

    console.log(clickedMetadata)

    return (
        <div className='metadata-container' width={width} height={height}>
            {data.metadata.map(d => {
                const isClicked = !clickedMetadata || clickedMetadata.name === d.name;
                const opacity = isClicked ? 1 : 0.2;
                const fontWeight = isClicked ? 800 : 400;
                return (
                    <div
                        className='metadata-group'
                        width={width}
                        height={4*markerHeight}
                        onClick={() => {
                            console.log(clickedMetadata);
                            if (clickedMetadata && isClicked) {
                                setClickedMetadata(null);
                                return;
                            }
                            const sources = d.trajectory.reduce((prev, curr) => {
                                prev.push(curr.source);
                                return prev;
                            }, []);
                            sources.name = d.name;
                            console.log('sources', sources)
                            setClickedMetadata(sources);
                        }}
                    >
                        <ReactTooltip id={tooltipId} />
                        <ButtonGroup fill style={{width: buttonWidth}}>
                            <Button
                                className='metadata-button'
                                text={d.name}
                                fontWeight={fontWeight}
                                data-tip={tooltipStr}
                                data-for={tooltipId}
                                onMouseEnter={() => setTooltipStr(d.type)}
                                onMouseLeave={() => setTooltipStr('')}
                            />
                        </ButtonGroup>
                        <svg
                            className='metadata-line'
                            width={svgWidth}
                            height={markerHeight*4}
                            opacity={opacity}
                        >
                            <line
                                stroke='#dadada'
                                x1={padding}
                                x2={svgInnerWidth}
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
                offsetx={buttonWidth + padding}
                width={width}
                height={markerHeight*4}
            />
        </div>
    )
};