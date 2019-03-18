import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import CSVReader from 'react-csv-reader';
import Plotly from 'plotly.js-dist';

class GraphPage extends Component {
    constructor(props) {
        super(props);

        var fig = {
            data: [{
                z: [],
                /*colorscale: [
                    ['0.0', 'rgb(255, 0, 0)']
                    ['1.0', 'rgb(0, 255, 0)']
                ],*/
                colorscale: 'Jet',
                type: 'surface',
                contours: {
                    z: {
                        show: true,
                        usecolormap: true,
                        highlightcolor: "#42f462",
                        project: { z: true }
                    }
                }
            }],
            layout: {
                width: 800,
                height: 800,
                scene: {
                    aspectmode: "manual",
                    aspectratio: {
                        x: 1, y: 1, z: 1,
                    },
                    zaxis: {
                        nticks: 0.5,
                        range: [0, 3],
                    }
                },
                datarevision: 0,
            }

        };

        this.state = { figure: fig, frames: [], config: {}, AreDataLoaded: false };

    }

    componentDidMount() {

        
    }


    handleForce = (data) => {

        var frames = [
            { name: '2018', data: [] },
            { name: '2013', data: [] },
            { name: '2008', data: [] }
        ];

        frames[0].data = new Array();
        frames[1].data = new Array();
        frames[2].data = new Array();

        var lastX = -1;
        for (var i = 1; i < data.length; i++) {

            if (lastX !== data[i][0]) {
                lastX = data[i][0];
            }

            if (frames[0].data[lastX] === undefined) {
                frames[0].data[lastX] = new Array();
                frames[1].data[lastX] = new Array();
                frames[2].data[lastX] = new Array();
            }

            frames[0].data[lastX].push(data[i][2]);
            frames[1].data[lastX].push(data[i][3]);
            frames[2].data[lastX].push(data[i][4]);
        }

        this.setState({ frames: frames, AreDataLoaded: true });
        var NewFig = this.state.figure;
        NewFig.data[0].z = this.state.frames[0].data;
        NewFig.layout.datarevision = Math.random();
        Plotly.react("graph", NewFig);
    }


    startAnimation = (event) => {
        var NewFig = this.state.figure;
        NewFig.data[0].z = this.state.frames[event.target.value].data;
        NewFig.layout.datarevision = Math.random();
        Plotly.react("graph", NewFig);
    }   

    handleDarkSideForce = () => {


    } 

    render() {
        return (
            <div>
                <div className="row">
                    <div className="container">
                        <div className="col-lg-6">
                            <CSVReader
                                cssClass="csv-reader-input"
                                label="Select CSV with Data in format X,Y,Z1, .. , Zn"
                                onFileLoaded={this.handleForce}
                                onError={this.handleDarkSideForce}
                                inputId="ObiWan"
                                inputStyle={{ color: 'red' }}
                            />
                        </div>
                        <div className="col-lg-6">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ullamcorper, justo vel sollicitudin semper, enim ligula pharetra erat, eget mollis odio odio in eros. Donec in nulla risus. Maecenas in ligula vitae ipsum volutpat aliquet nec eu velit. Ut pellentesque lacus in suscipit vulputate. Quisque aliquet nulla sed elit tincidunt euismod placerat pretium tortor. Nunc eu libero quis velit vulputate tincidunt nec non sapien. Pellentesque convallis felis sed eros ornare pharetra. Nulla facilisi. Maecenas sed quam eu ipsum vulputate pharetra eu at purus. Donec lorem quam, bibendum ac viverra sed, cursus quis erat. Phasellus cursus fringilla justo sed viverra. Morbi placerat quis dolor at aliquam. </p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="container">
                        <div className="col-lg-4" style={{ display: this.state.AreDataLoaded ? 'block' : 'none' }}>
                            <p>Use slider to change curent presented Y column</p>
                            <div className="form-group">
                                <label htmlFor="formControlRange">Zn Range</label>
                                <input type="range" className="form-control-range" id="formControlRange" min="0" max="2" step="1" onChange={this.startAnimation} />
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div id="graph" />
                        </div>
                    </div>
                </div>
                
  
            </div>

        );
    };
}

export default GraphPage;  