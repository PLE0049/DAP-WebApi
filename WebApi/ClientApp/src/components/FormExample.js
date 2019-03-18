import React from 'react';
import { connect } from 'react-redux';
import { Sigma, RandomizeNodePositions, EdgeShapes, NodeShapes, LoadGEXF, Filter, ForceAtlas2, RelativeSize } from 'react-sigma';

let myGraph = { nodes: [{ id: "n1", label: "Alice" }, { id: "n2", label: "Rabbit" }], edges: [{ id: "e1", source: "n1", target: "n2", label: "SEES" }] };

const FormExample = props => (
  <div>
        <div className="container">
            <div className="row">
                <h2>Algorithm 1</h2>
                <p>Pellentesque commodo elementum purus, ac fringilla mauris porttitor ut. Sed maximus lectus neque, auctor lacinia leo porttitor in. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut massa odio, facilisis ultrices luctus vel, facilisis non mi. Quisque elementum aliquam libero, vitae auctor odio pulvinar sodales.</p>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <form>
                        <div className="form-group row">
                            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Parameter one</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" value=""/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Parameter one</label>
                            <div className="col-sm-10">
                                <input type="number" className="form-control" placeholder="Parameter one"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Parameter one</label>
                            <div className="col-sm-10">
                                <input type="number" className="form-control" placeholder="Parameter one" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <button type="submit" className="btn btn-primary">Sign in</button>
                        </div>

                    </form>
                </div>
                <div className="col-lg-6">

                    <Sigma renderer="canvas">
                        <LoadGEXF path={"les-miserables.gexf"}>

                        </LoadGEXF>
                    </Sigma>
                </div>
            </div>
        </div>
  </div>
);
export default connect()(FormExample);
