import {
    Button,
    ButtonGroup,
    Intent,
    Slider,
    KeyCombo
  } from "@blueprintjs/core";

import {scaleLinear, scaleTime, min, max} from 'd3';
import {useRef, useState, useLayoutEffect} from 'react';

export const Metadata = ({data, offsetx, offsety, width, height, superlocColors}) => {
    const markerHeight = 10;
    const padding = 10; // will be added to left and right

    const buttonWidth = width / 5;
    const ref = useRef();

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
        <div className='metadata-container' width={width}>
            {data.metadata.map(d => {
                console.log(superlocColors, d)
                return (
                    <div className='metadata-group' width={width} onClick={() => console.log('clicked a div', d)}>
                        <ButtonGroup fill style={{width: buttonWidth}}>
                            <Button ref={(el) => ref.current = el} className='metadata-button' text={d.name} />
                        </ButtonGroup>
                        <svg className='metadata-line' width={width - buttonWidth - 5} height={4*markerHeight}>
                            <line stroke='#dadada' x1={0} x2={width} y1={markerHeight*2} y2={markerHeight*2}/>
                            {d.trajectory.map((trajectory) => {
                                console.log(trajectory.source_date, scale(trajectory.source_date));
                            return <circle cx={scale(trajectory.source_date) + padding} cy={markerHeight*2} r={markerHeight} fill={superlocColors[trajectory.source]}/>
                        })}
                        </svg>
                    </div>
                )
            })}
            {// put an axis here
            }
        </div>
    )
};