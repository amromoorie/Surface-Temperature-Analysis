
    weatherGraph()
    async function weatherGraph() {
        const data = await weatherData()
        const ctx = document.getElementById('chart').getContext('2d');
        let chart = new Chart(ctx, {
            // line type
            type: 'line',
            // dataset 
            data: {
                labels: data.xAxis, // years on x-axis
                datasets: [{
                    label: '',
                    backgroundColor: 'rgb(255, 255, 255)',
                    borderColor: '#4561BA',
                    data: data.yAxis // temps on y-axis
                }]
            },
            // configuration options go here
            options: {
                legend: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            // Include a ° sign in the ticks
                            callback: function(value, index, values) {
                                return value + '°';
                            },
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        // // adjusting chart boundaries relative to parent node
        // chart.canvas.parentNode.style.height = '200px';
        // chart.canvas.parentNode.style.width = '800px';
        
} 




async function weatherData() {
    try {

        // fetch and parse weather data
        const res = await fetch('ZonAnn.Ts+dSST.csv')
        const data = await res.text() 
        // console.log('data', data)
        
        //  x & y coordinates; where x labeling years; y labeling temps
        const xAxis = []   
        const yAxis = [] 
        
        // preparing data
        const table = data.split('\n').slice(1)
        // console.log('table ', table)
        table.forEach(row => {
            const col = row.split(',')
            // console.log('col ', col)
            const year = col[0]
            xAxis.push(year)
            const temp = col[1]
            yAxis.push(temp)
            // console.log(year, temp)
        })
        return {xAxis, yAxis}
    }
    catch(e) {
        console.log('err!')
        alert('Something unusual happened!')
    }
            
}
        
        