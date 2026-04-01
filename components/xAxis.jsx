//`<XAxis />` has the following properties,
// - xScale: the scale of the x-axis
// - height: the height of the scatter plot
// - width: the width of the scatter plot
// - axisLabel: the name of the axis
// - `<YAxis />` has the following properties,
// - yScale: the scale of y-axis
// - height: the height of the scatter plot
// - axisLabel: the name of the axis
// - **`<Points />`**: it is defined in the module points.js. The radius of each `<circle />` is 5 and the color is `steelblue`, and the `<Points />` has the following properties,
// - data: the data items
// - xScale: the scale for the x coordinate
// - yScale: the scale for the y coordinate

function XAxis(props){
    const { xScale, height, width, axisLable } = props;
    //Note:
    //1. XAxis works for two cases: the xScale is linear (i.e., scatter plot) and the xScalse is discrete (i.e., bar chart)
    //2. you can use typeof(xScale.domain()[0]) to decide the return value
    //3. if typeof(xScale.domain()[0]) is a number, xScale is a linear scale; if it is a string, it is a scaleBand.
    
    if(xScale) {
        //the if(xScale){...} means when xScale is not null, the component will return the x-axis; otherwise, it returns <g></g>
        //we use the if ... else ... in this place so that the code can work with the SSR in Next.js;
        //all your code should be put in this block. Remember to use typeof check if the xScale is linear or discrete.
        const isLinear = typeof(xScale.domain()[0]) === 'number';
        const ticks = isLinear ? xScale.ticks(5) : xScale.domain();

        return <g transform={`translate(0, ${height})`}>
            <line x1={0} x2={width} stroke="black" />

            {ticks.map((tick, i) => {
                let x = isLinear ? xScale(tick) : xScale(tick) + xScale.bandwidth() / 2;
                return <g key={i} transform={`translate(${x}, 0)`}>
                    <line y2={6} stroke="black" />
                    {isLinear ? (
                        <text style={{ textAnchor: 'middle', fontSize: '11px' }} dy="1.5em">{tick}</text>
                    ) : (
                        <text style={{ textAnchor: 'end', fontSize: '10px' }} transform="rotate(-40)" dx="-0.5em" dy="0.5em">
                            {tick}
                        </text>
                    )}
                </g>
            })}

            {axisLable && (
                <text style={{ textAnchor: 'middle', fontSize: '13px' }} x={width / 2} y={45}>
                    {axisLable}
                </text>
            )}
        </g>
    }else {
        return <g></g>
    }
}

export default XAxis
