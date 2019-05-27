import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomSigma from './CustomSigma';
import { Sigma, RandomizeNodePositions, EdgeShapes, NodeShapes, LoadGEXF, Filter, ForceAtlas2, RelativeSize } from 'react-sigma';
import axios from 'axios';
import Plotly from 'plotly.js-dist';

class Net23DStepOne extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 'get-id-from-somewhere',
            file: null,
            defaultNet: 0,
        };
    }

    async submitUpload(e) {
        e.preventDefault();

        if (this.state.file === null) {
            alert("File must be selected");
            return false;
        } 
        const url = `/api/FileUpload`;
        const formData = new FormData();
        console.log(this.state.file);

        formData.append('file', this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                "enctype" : "multipart/form-data",
            },
        };

        var result = await axios.put(url, formData, config).then(res => {
            return res.data;
        });

        this.props.history.push('/Net23DStepTwo/' + result);
    }

    setFile(e) {
        this.setState({ file: e.target.files[0] });
    }
    

    submitDefault(e) {
        console.log(this.state.defaultNet);
        this.props.history.push('/Net23DStepTwo/' + this.state.defaultNet);
    }

    _handleChange = (event) => {
        this.setState({ defaultNet: event.target.value });
    }

  render() {
    return (
        <div>
            <div className="container" ref={this.myRef}>
                <div className="row">
                    <div className="col-lg-6">
                        <h2>Net to 3D</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                    <div className="col-lg-6">
                        sdasd
                    </div>
                </div>
                <div className="row">
                   <div className="col-lg-6">
                        <h3>Upload graph as GEXF or CSV</h3>                   
                        <p>Choose a file in gexf file format or csv. Maximum file size is 1MB. Maximum network size is 1000 nodes. Its recomended upload only single one connected component.</p>
                        <p>CSV fiel format must contain list of edges in format "ID,ID,Weight"</p> 
                        <form onSubmit={e => this.submitUpload(e)}>
                            <input name="file" type="file" className="btn" onChange={e => this.setFile(e)} />
                            <button type="submit" className="btn btn-primary" >Go</button>
                        </form>
                    </div>
                    <div className="col-lg-6">
                        <h3>Choose prepared datasets</h3>
                        <p>Select one of your prepared datasets as example.</p>
                        <form onSubmit={e => this.submitDefault(e)}>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect1">Example select</label>
                                <select className="form-control" id="exampleFormControlSelect1" onChange={this._handleChange}>
                                    <option value="0" >Karate Klub</option>
                                    <option value="1" >les-miserables</option>
                                    <option value="2" >les-miserables 2</option>
                                    <option value="3" >netscience</option>
                                    <option value="4" >CLASS OF 188081</option>
                                    <option value="5" >cpan-authors</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Go</button>   
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
export default connect()(Net23DStepOne);