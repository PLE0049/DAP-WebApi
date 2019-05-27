import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/WeatherForecasts';

type State = {
    running: boolean,
    timer?: number,
    drawEdges?: ?boolean
};

type Props = {
    worker: boolean,
    barnesHutOptimize?: boolean,
    barnesHutTheta?: number,
    adjustSizes?: boolean,
    iterationsPerRender?: number,
    linLogMode: boolean,
    outboundAttractionDistribution?: boolean,
    edgeWeightInfluence?: number,
    scalingRatio?: number,
    strongGravityMode?: boolean,
    slowDown?: number,
    gravity?: number,
    timeout?: number,
    sigma?: sigma
};

type DefaultProps = {
    worker: boolean,
    linLogMode: boolean
};

class CustomSigma extends React.Component {

    state: State;
    props: Props;
    static defaultProps: DefaultProps = {
        worker: true,
        linLogMode: true
    }
    sigma = null;

    constructor(props) {
        super(props);
        this.sigma = props.sigma;
        this.state = { running: false };
    }

    componentDidMount() {
        /*console.log(this.sigma.graph.nodes());
        this.props.sigma.graph.addNode();
        this.props.sigma.refresh();
        console.log(this.props.sigma.graph.nodes());*/
    }

    // Change sigma status only after react rendering complete
    componentDidUpdate(prevProps, prevState) {
        let s = this.props.sigma;

        if (prevState.running && !this.state.running && s) {
            s.stopForceAtlas2();
        }
    }

    componentWillUnmount() {
        if (this.props.sigma) this.props.sigma.killForceAtlas2()
        if (this.state.timer) clearTimeout(this.state.timer)
    }


    importFromCsv = (data) => {
        console.log(data);
        var sigma = this.props.sigma;

        var sourceNode = data[0][0];
        var targetNode = data[0][1];
        var weight = data[0][2];


        if (!sigma.graph.nodes(sourceNode))
            sigma.graph.addNode({ id: sourceNode });

        if (!sigma.graph.nodes(targetNode))
            sigma.graph.addNode({ id: targetNode });

        sigma.graph.addEdge({
            id: sigma.graph.edges().length + 1,
            source: sourceNode,
            target: targetNode,
            weight: weight
        });
        
    }

    ExportToCsv = () => {

        var resultString = "";
        var nodes = this.props.sigma.graph.nodes();
        for (let i = 0; i < nodes.length; i++)
        {
            resultString += nodes[i].id + "," + nodes[i].label + "," + nodes[i].x + "," + nodes[i].y + "," + this.props.sigma.graph.degree(nodes[i].id) + ", \n";
        }


        return resultString;

        /*
        resultString += "/n";
        var edges = this.props.sigma.graph.edges();
        for (let i = 0; i < edges.length; i++) {
            resultString += edges[i].id;
        }

        console.log("Hit");
        console.log(this.props.sigma.graph.edges());
        console.log(resultString);*/
        
    }

    refresh = () => {
        console.log(this._stripOptions(this.props));
        let s = this.props.sigma;

        
        s.startForceAtlas2(this._stripOptions(this.props));

        let timer = setTimeout(() => {
            this.setState({ running: false, timer: undefined });
        }, this.props.timeout || s.graph.nodes().length * 8);


        this.setState({ running: true, timer});
    }

    _stripOptions(props){
        return Object.assign({}, props, { sigma: undefined });
    }

    render() {
        return (
            <div>
            </div>);
    };
}

export default CustomSigma;  
