const AxpoLogo = () => {
    return (
        <svg viewBox="0 0 150 150">
            <title>Axpo Logo</title>
            <defs>
                <linearGradient
                    id="backgroundGradient"
                    x1="0%"
                    y1="28%"
                    x2="100%"
                    y2="72%"
                >
                    <stop
                        offset="0%"
                        style={{
                            stopColor: 'rgb(255,93,100)',
                            stopOpacity: 1.0,
                        }}
                    />
                    <stop
                        offset="15%"
                        style={{
                            stopColor: 'rgb(255,237,87)',
                            stopOpacity: 1.0,
                        }}
                    />
                    <stop
                        offset="30%"
                        style={{
                            stopColor: 'rgb(255,93,100)',
                            stopOpacity: 1.0,
                        }}
                    />
                    <stop
                        offset="45%"
                        style={{
                            stopColor: 'rgb(69,69,207)',
                            stopOpacity: 1.0,
                        }}
                    />
                    <stop
                        offset="60%"
                        style={{
                            stopColor: 'rgb(255,93,100)',
                            stopOpacity: 1.0,
                        }}
                    />
                    <stop
                        offset="75%"
                        style={{
                            stopColor: 'rgb(255,237,87)',
                            stopOpacity: 1.0,
                        }}
                    />
                    <stop
                        offset="90%"
                        style={{
                            stopColor: 'rgb(255,93,100)',
                            stopOpacity: 1.0,
                        }}
                    />
                </linearGradient>
            </defs>
            <mask id="mask">
                <rect fill="black" width="100%" height="100%"></rect>
                <path
                    fill="white"
                    style={{ transform: 'translate(-55px, 5px' }}
                    d="M158.39,67.84c-.2-5.55,9.26-15.11,16.21-22.13,9.39-9.47,17.49-17.64,17.22-26.4a13.22,13.22,0,0,0-4.77-9.68c-12.11-10.07-24.23,1.49-34.93,14.18C142,35.88,130.54,52.4,118.5,51.86c-6.13,0-13.58-4.43-21-12.33a71.78,71.78,0,0,1-14.2-21.76c5.79,2.89,15.8,10.55,24.93,20.23a27.8,27.8,0,0,0,5,4.19c.21.13.42.25.66.37l.44.21a8.73,8.73,0,0,0,4.37.88c2.51-.2,5-1.75,7.39-4.57C114.44,24.15,93.13,4.79,80.74,3.7a10.54,10.54,0,0,0-8.66,2.85c-5.14,5.14-1.48,14.1-.28,17,6.74,16.49,26.2,41,46.36,41.14,18,.85,32.33-19,43.81-32.62,4.76-5.65,13.59-13.37,16.42-12.86,0,0,.53.11.57.44.37,3-8.66,12.07-13.5,17-9.86,10-20,20.23-19.93,31.17h0v0s0,0,0,0h0C145.45,78.81,155.6,89.09,165.46,99c4.84,4.89,13.85,14,13.5,17,0,.35-.57.44-.57.44-2.83.51-11.66-7.21-16.42-12.86C150.49,90,133.28,70.11,115.33,71,95.17,71.13,75.71,95.61,69,112.1c-1.2,2.94-4.86,11.9.28,17A10.54,10.54,0,0,0,77.91,132c12.39-1.09,33.7-20.45,45.34-35.38-2.4-2.82-4.88-4.37-7.39-4.57a8.73,8.73,0,0,0-4.37.88,4.39,4.39,0,0,0-.44.21c-.23.12-.45.24-.66.37a27.8,27.8,0,0,0-5,4.19C96.3,107.37,86.29,115,80.5,117.92A71.78,71.78,0,0,1,94.7,96.16c7.39-7.9,14.84-12.28,21-12.34,12-.53,26.29,16,36.45,28.05,10.7,12.7,22.82,24.26,34.93,14.19a13.24,13.24,0,0,0,4.77-9.68c.27-8.76-7.83-16.94-17.22-26.4C167.65,83,158.19,73.4,158.39,67.84Z"
                ></path>
            </mask>
            <g mask="url(#mask)">
                <rect
                    className="bg-gradient"
                    width="100%"
                    height="100%"
                    fill="url(#backgroundGradient)"
                ></rect>
            </g>
        </svg>
    )
}

export default AxpoLogo
