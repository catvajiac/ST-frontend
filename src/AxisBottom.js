import { useRef, useEffect } from 'react';
import { select, axisBottom, timeFormat } from 'd3';

const timeFormatter = timeFormat('%b %d')

export const AxisBottom = ({ scale, offsetx, width, height }) => {
  const ref = useRef();
  useEffect(() => {
    const xAxisG = select(ref.current);
    const xAxis = axisBottom(scale)
      .tickPadding(18)
      .tickFormat(timeFormatter);
    xAxisG.call(xAxis);
     }, []);
  return <svg className='axis-label' ref={ref} width={width - 10} height={height} style={{paddingLeft: offsetx + 10}}/>
};