import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import CSVReader from 'react-csv-reader'

class GraphPage extends Component {
    constructor(props) {
        super(props);
        
        var z1 = [
            [8.83, 8.89, 8.81, 8.87, 8.9, 8.87],
            [8.89, 8.94, 8.85, 8.94, 8.96, 8.92],
            [8.84, 8.9, 8.82, 8.92, 8.93, 8.91],
            [8.79, 8.85, 8.79, 8.9, 8.94, 8.92],
            [8.79, 8.88, 8.81, 8.9, 8.95, 8.92],
            [8.8, 8.82, 8.78, 8.91, 8.94, 8.92],
            [8.75, 8.78, 8.77, 8.91, 8.95, 8.92],
            [8.8, 8.8, 8.77, 8.91, 8.95, 8.94],
            [8.74, 8.81, 8.76, 8.93, 8.98, 8.99],
            [8.89, 8.99, 8.92, 9.1, 9.13, 9.11],
            [8.97, 8.97, 8.91, 9.09, 9.11, 9.11],
            [9.04, 9.08, 9.05, 9.25, 9.28, 9.27],
            [9, 9.01, 9, 9.2, 9.23, 9.2],
            [8.99, 8.99, 8.98, 9.18, 9.2, 9.19],
            [8.93, 8.97, 8.97, 9.18, 9.2, 9.18]
        ];
        console.log(z1);
        var data = [{
            z: z1,
            type: 'surface',
            contours: {
                z: {
                    show: true,
                    usecolormap: true,
                    highlightcolor: "#42f462",
                    project: { z: true }
                }
            }
            }];

        

        var layout = {
            title: 'Mt Bruno Elevation With Projected Contours',
            scene: { camera: { eye: { x: 1.87, y: 0.88, z: -0.64 } } },
            autosize: false,
            width: 800,
            height: 800,
            margin: {
                l: 65,
                r: 50,
                b: 65,
                t: 90,
            }
        };
            this.state = { data: data, layout: layout, frames: [], config: {} };

    }

    componentDidMount() {
    }

    handleForce = (data) => {

        var myArray = new Array();
        var lastX = -1;
        for (var i = 1; i < data.length; i++) {

            if (lastX !== data[i][0]) {
                lastX = data[i][0];
            }

            if (myArray[lastX] === undefined) {
                myArray[lastX] = new Array();
            }

            myArray[lastX].push(data[i][2]);
        }
        
        console.log(myArray);

        var NewData = [{
            z: myArray,
            type: 'surface',
            contours: {
                z: {
                    show: true,
                    usecolormap: true,
                    highlightcolor: "#42f462",
                    project: { z: true }
                }
            }
        }];

        this.setState({ data: NewData });

        console.log(this._child.revision );
    };


    handleDarkSideForce = () => {


    } 

    render() {
        return (
            <div>
                <CSVReader
                    cssClass="csv-reader-input"
                    label="Select CSV with secret Death Star statistics"
                    onFileLoaded={this.handleForce}
                    onError={this.handleDarkSideForce}
                    inputId="ObiWan"
                    inputStyle={{ color: 'red' }}
                />
                <Plot
                    ref={(child) => { this._child = child; }}
                    data={this.state.data}
                    layout={this.state.layout}
                    frames={this.state.frames}
                    config={this.state.config}
                    onInitialized={(figure) => this.setState(figure)}
                    onUpdate={(figure) => this.setState(figure)}
                />
            </div>

        );
    };
}

export default GraphPage;  