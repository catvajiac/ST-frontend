import { geoAlbersUsa, geoPath, geoGraticule } from 'd3';
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import ReactTooltip from 'react-tooltip';

export const Map = ({topodata, data, width, height, superlocColors}) => {

    const dummyGeoData = {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
               "coordinates": [[
                    [71.3577635769, -171.791110603],
                    [71.3577635769, -66.96466],
                    [18.91619, -66.96466],
                    [18.91619, -171.791110603],
                    [71.3577635769, -171.791110603]
                ]]
            }
        }]
    }


    const { land, interiors } = topodata;
    const projection = geoAlbersUsa()
        .fitSize([width, height], dummyGeoData)

    const path = geoPath(projection);
    const graticule = geoGraticule();

    const [tooltipData, setTooltipData] = useState({text: '', pos: {left: 0, top: 0}});
    const [SVGtoDOMRect, setSVGtoDOMRect] = useState();
    const [circletoSVGRect, setCircletoSVGRect] = useState();
    const tooltipId = 'map-tooltip';

     useEffect(() => ReactTooltip.rebuild(), [tooltipData.text]);


     const svgRef = useCallback(node => {
         if (!node) {
             return;
         }

         const ctm = node.getScreenCTM();
         const rect = node.getBoundingClientRect();

         setSVGtoDOMRect(rect);
      }, []);

      const circleRef = useCallback(circle => {
          if (!circle) {
              return;
          }
          const rect = circle.getBoundingClientRect();
          setCircletoSVGRect(rect);
      }, [])

    const convertSVGtoDOM = (x, y) => {
        if (!SVGtoDOMRect) {
            return {left: 0, top: 0}
        }

        return {left: circletoSVGRect.left - SVGtoDOMRect.left, top: circletoSVGRect.top - SVGtoDOMRect.top}
        //const { a, b, c, d, e, f } = SVGtoDOMRect;
        //return {left: a * x + c * y + e, top: b * x + d * y + f}
    }


    return (
        <div width={width} height={height}>
        <ReactTooltip id={tooltipId} overridePosition={(pos, currentEvent, currentTarget) => {
            //return convertSVGtoDOM(currentTarget.cx.baseVal.value, currentTarget.cy.baseVal.value)
            return pos;
        }}/>
        <svg className='marks' width={width} height={height} ref={svgRef} viewBox={0 + ' ' + 0 + ' ' + width + ' ' +  height} >
        {useMemo(() =>
          <>
            <path className="sphere" d={path({ type: 'Sphere' })} />
            <path className="graticules" d={path(graticule())} />
            {land.features.map(feature => (
            <path className="land" d={path(feature)} />
            ))}
            <path className="interiors" d={path(interiors)} />
         </>, [path, graticule, land, interiors])
        }
        {data.superlocs.map(d => {
            const [cx, cy] = projection(d.coords);
            const screen_coords = tooltipData.pos;
          return (
              <>
                <circle
                    data-tip={tooltipData.text}
                    data-for={tooltipId}
                    ref={circleRef}
                    cx={cx}
                    cy={cy}
                    r={11}
                    fill={superlocColors[d.id]}
                    onMouseEnter={() => setTooltipData({text: 'Superlocation: ' + d.name, pos: screen_coords})}
                    onMouseLeave={() => setTooltipData({text: '', pos: {left: 0, top: 0}})}/>
            </>
          )
        })}
        </svg>
        </div>
    )
};