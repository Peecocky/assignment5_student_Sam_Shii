
function Bars(props) {
    const {data, xScale, yScale, height, selectedStation, setSelectedStation} = props;

    //Note: 
    //the if(data){...} means when data is not null, the component will return the bars; otherwise, it returns <g></g>
    //we use the if ... else ... in this place so that the code can work with the SSR in Next.js;

    const getColor = (selectedStation, station) => {
        return station === selectedStation ? 'red' : 'steelblue';
    };

    const onMouseEnter = (event, d) => {
        setSelectedStation(d.station);
    };
    const onMouseOut = () => {
        setSelectedStation(null);
    };

    if(data){
        return <g>
            {data.map((d, i) => {
                return <rect key={i}
                    x={xScale(d.station)}
                    y={yScale(d.start)}
                    width={xScale.bandwidth()}
                    height={height - yScale(d.start)}
                    fill={getColor(selectedStation, d.station)}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={(event) => onMouseEnter(event, d)}
                    onMouseOut={onMouseOut}
                />
            })}
            </g>
    } else {
        return <g></g>
    }
}

export default Bars
