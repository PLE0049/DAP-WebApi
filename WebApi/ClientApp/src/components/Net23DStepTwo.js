import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/WeatherForecasts';
import CustomSigma from './CustomSigma';
import { Sigma, RandomizeNodePositions, EdgeShapes, NodeShapes, LoadGEXF, Filter, ForceAtlas2, RelativeSize } from 'react-sigma';
import axios from 'axios';
import Plotly from 'plotly.js-dist';

class FormExample extends React.Component {

    constructor(props) {
        super(props);
        const _child = React.createRef();
        const { match: { params } } = this.props;


        var GraphPath = "";
        console.log(params.graphId);     
        var GraphType = "GEXF";
        switch (params.graphId) {
            case "0":
                GraphPath = "DefaultNets/karate.gexf";
                break;
            case "1":
                GraphPath = "DefaultNets/les-miserables.gexf";
                break;
            case "2":
                GraphPath = "DefaultNets/lesmis.gexf";
                break;
            case "3":
                GraphPath = "DefaultNets/netscience.gexf";
                break;
            case "4":
                GraphPath = "DefaultNets/CLASS_OF_188081.gexf";
                break;
            case "5":
                GraphPath = "DefaultNets/stanberk.gexf";
                break;
            default:
                if (params.graphId.endsWith(".csv")) {
                    GraphType = "CSV";
                }
                GraphPath = "Uploads/" + params.graphId;

        }

        var fig = {
            data: [{
                z: [],
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
                width: 500,
                height: 500,
                scene: {
                    aspectmode: "manual",
                    aspectratio: {
                        x: 1, y: 1, z: 1,
                    },
                },
                datarevision: 0,
            }

        };

        this.state = { figure: fig, AreDataLoaded: false, GraphPath: GraphPath, GraphType: GraphType, linLog: true, exponent: 1.4 };

    }

    componentDidMount = () => {
        this.parseData(this.state.GraphPath, this.doStuff);
    }

    parseData = (url, callBack) => {
        var Papa = require("papaparse/papaparse.min.js");
        Papa.parse(url, {
            download: true,
            header: false,
            dynamicTyping: true,
            step: function (row) {
                callBack(row.data);
            },
            complete: function (results) {
               //callBack(results.data);
            }
        });
    }

    doStuff = (data) => {
        this._child.importFromCsv(data);
    }

    sendDataOverApi = async (e) => {

        e.preventDefault();
        var test = this._child.ExportToCsv();
        var exp = this.state.exponent;
        var data = new Array();
        var url = '/api/NetTo3D/';
        var result = await axios.post(url, { test , exp })
            .then(res => {
                return res.data;
            });
        var lines = result.split("\n");
        for (let i = 0; i < lines.length; i++) {
            data[i] = lines[i].split(",");
        }
        var NewFig = this.state.figure;
        NewFig.data[0].z = data;
        NewFig.layout.datarevision = Math.random();
        Plotly.react("graph", NewFig);
    } 

    GoBackToStepOne = () => {
        console.log("test");
        this.props.history.push('/Net23DStepOne/');
    }


    handleChangeLinLog = (e) => {   
        this.setState({ linLog: !this.state.linLog });
        this._child.refresh();
    }

    handleChangeExponent = (e) => {
        this.setState({ exponent: e.target.value });
    }

    handleChangeZAspect = (e) => {

        var NewFig = this.state.figure;
        NewFig.layout.scene.aspectratio.z = e.target.value;
        NewFig.layout.datarevision = Math.random();
        Plotly.react("graph", NewFig);
        this.setState({ figure: NewFig });
    }

    handleChangeColorscale = (e) => {

        var NewFig = this.state.figure;
        console.log(e.target.value);
        NewFig.data[0].colorscale = String(e.target.value);
        NewFig.layout.datarevision = Math.random();
        Plotly.react("graph", NewFig);
        this.setState({ figure: NewFig });
    }

  render() {
    return (
        <div>
            <div className="container" ref={this.myRef}>
                <div className="row">
                    <button className="btn btn-secondary" onClick={this.GoBackToStepOne}>BACK</button>
                </div>
                <div className="row">
                    <h2>Network visualisation with 3D surface plot</h2>
                </div>
                <div className="row">
                    <div className="col-lg-6">                       
                        <p>Pellentesque commodo elementum purus, ac fringilla mauris porttitor ut. Sed maximus lectus neque, auctor lacinia leo porttitor in. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut massa odio, facilisis ultrices luctus vel, facilisis non mi. Quisque elementum aliquam libero, vitae auctor odio pulvinar sodales.</p>
                    </div>
                    <div className="col-lg-6">
                        <form onSubmit={e => this.sendDataOverApi(e)} >
                            <p>Choose exponent value that affects surface smoothness. Recomended values are in range 1 - 3. Lower value produce smoother surface.</p>
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-4 col-form-label">Exponent</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" onChange={this.handleChangeExponent} defaultValue={this.state.exponent} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <button className="btn btn-primary" >Show in 3D</button>
                            </div>
                        </form>
                    </div>                  
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="row">
                            <h4>Network Visualization Parameters</h4>
                            <div className="form-check row">
                                <label className="col-sm-4 form-check-label" htmlFor="exampleCheck1">linLog Mode</label>
                                <div className="col-sm-4">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={this.handleChangeLinLog} checked={this.state.linLog} />
                                </div>
                            </div>
                            <div className="form-check row">
                                <label className="col-sm-4 form-check-label" htmlFor="exampleCheck1">Adjust Size</label>                              
                                <div className="col-sm-4">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Gravity</label>
                                <div className="col-sm-4">
                                    <input type="number" className="form-control" defaultValue="1" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">barnesHutTheta</label>
                                <div className="col-sm-4">
                                    <input type="number" className="form-control" defaultValue="1" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {this.state.GraphType === "GEXF" && 
                                <Sigma renderer="webgl">
                                    <CustomSigma label="Label" ref={child => this._child = child} worker barnesHutOptimize barnesHutTheta={0.6} iterationsPerRender={10} linLogMode={this.state.linLog} adjustSizes />
                                    <LoadGEXF path={this.state.GraphPath}>
                                        <ForceAtlas2 worker barnesHutOptimize barnesHutTheta={0.6} iterationsPerRender={10} linLogMode adjustSizes timeout={3000} />
                                        <RelativeSize initialSize={15} />
                                    </LoadGEXF>
                                </Sigma>
                            }
                           
                                <Sigma renderer="webgl">
                                <CustomSigma label="Label" ref={child => this._child = child} worker barnesHutOptimize barnesHutTheta={0.6} iterationsPerRender={10} linLogMode={this.state.linLog} adjustSizes />                     
                                </Sigma>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="row">
                            <h4>Surface Visualization Parameters</h4>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Vertical Ratio</label>
                                <div className="col-sm-4">
                                    <input type="number" className="form-control" defaultValue="0.5" min="0" max="2" step="0.1" onChange={this.handleChangeZAspect} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label" htmlFor="ColorScaleSelect">Color Scale</label>
                                <div className="col-sm-4">
                                    <select className="form-control" id="ColorScaleSelect" onChange={this.handleChangeColorscale}>
                                        <option value="Jet">Jet</option>
                                        <option value="Earth">Earth</option>
                                        <option value="Blackbody">Blackbody</option>
                                        <option value="Electric">Electric</option>
                                        <option value="Bluered">Bluered</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div id="graph" />
                    </div>
                </div>
                <div className="row">
                    <div className="row">
                        <h2>What next</h2>
                    </div>
                    <div className="row">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>                     
                    </div>
                    <div className="row">
                        <p>You can download surface layout data for custom visualization</p>
                        <button className="btn btn-primary">Download</button>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
export default connect()(FormExample);