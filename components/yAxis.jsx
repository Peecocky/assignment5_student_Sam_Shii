
function YAxis(props){
    const { yScale, height, axisLable } = props;
    if(yScale){
        const ticks = yScale.ticks(5);

        return <g>
            {/* //the if(yScale){...} means when xScale is not null, the component will return the y-axis; otherwise, it returns <g></g>
            //we use the if ... else ... in this place so that the code can work with the SSR in Next.js;
            //all your code should be put in this block. Remember to use typeof check if the xScale is linear or discrete. */}
   
            <line y1={0} y2={height} stroke="black" />

            {ticks.map((tick, i) => (
                <g key={i} transform={`translate(0, ${yScale(tick)})`}>
                    <line x2={-6} stroke="black" />
                    <text style={{ textAnchor: 'end', fontSize: '11px' }} dx="-0.5em" dy="0.35em">
                        {tick}
                    </text>
                </g>
            ))}

            <text style={{ textAnchor:'middle', fontSize:'13px'}} transform={`translate(-28, ${height / 2})rotate(-90)`}>
                {axisLable}
            </text>
        </g>
    } else {
        return <g></g>
    }

}

export default YAxis
