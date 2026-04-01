
function Points(props) {
    const {data, xScale, yScale, height, width, selectedStation, setSelectedStation, setTooltipX, setTooltipY} = props;

    //Note: 
    //the if(data){...} means when data is not null, the component will return the points; otherwise, it returns <g></g>
    //we use the if ... else ... in this place so that the code can work with the SSR in Next.js;

    const getColor = (selectedStation, station) => {
        return station === selectedStation ? 'red' : 'steelblue';
    };
    const getRadius = (selectedStation, station) => {
        return station === selectedStation ? 10 : 5;
    };

    const onMouseEnter = (event, d) => {
        setSelectedStation(d.station);
        setTooltipX(event.pageX);
        setTooltipY(event.pageY);
    };
    const onMouseOut = () => {
        setSelectedStation(null);
        setTooltipX(null);
        setTooltipY(null);
    };

    if(data){
        return <g>
        {data.map((d, i) => {
            return <circle key={i} cx={xScale(d.tripdurationS)} cy={yScale(d.tripdurationE)}
                r={getRadius(selectedStation, d.station)}
                fill={getColor(selectedStation, d.station)}
                style={{ cursor: 'pointer' }}
                onMouseEnter={(event) => onMouseEnter(event, d)}
                onMouseOut={onMouseOut}
            />
        })}

        {selectedStation && (
            <>
                <rect x={0} y={0} width={width} height={height}
                    fill="yellow" opacity={0.5}
                    style={{ pointerEvents: 'none' }} />
                {data.filter(d => d.station === selectedStation).map((d, i) => (
                    <circle key={`highlight-${i}`}
                        cx={xScale(d.tripdurationS)}
                        cy={yScale(d.tripdurationE)}
                        r={10} fill="red"
                        style={{ cursor: 'pointer' }}
                        onMouseEnter={(event) => onMouseEnter(event, d)}
                        onMouseOut={onMouseOut}
                    />
                ))}
            </>
        )}
        </g>
    } else {
        return <g></g>
    }
}

export default Points
