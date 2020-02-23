// react, fabric and styles
import React, { Component } from 'react';
import { fabric } from 'fabric';
import { onMouseDown, onMouseMove, onMouseUp } from './utils/eventHandlers.js'

class DrawBoard extends Component {
  constructor(props){
    super(props);
    this.state = { 
      width: 0,
      height: 0,
      undoables: [],
      redoables:[],
      drawTool: false,
      toolSize: "7",
      toolColor: "yellow",
      xTool: false,
    };

    this.canvasRef = React.createRef();

    // Bind utils to this
    this.onMouseDown = onMouseDown.bind(this);
    this.onMouseMove = onMouseMove.bind(this);
    this.onMouseUp = onMouseUp.bind(this);
  }

  componentDidMount() {
    // Grouping the static objects for extensibility
    this.grid = new fabric.Group()
    let canvasID = "tictactoe-fabric-canvas-default-id"

    let canvasOpts = {
        backgroundColor: 'rgba(255,255,255,0)',
        height: this.state.height,
        width: this.state.width,
        selection:false,
        undone:[]
    }

    this.setState({canvasID:canvasID}, ()=>{ // In case we want state to know ID
      this.fabricCanvas = new fabric.Canvas(canvasID, canvasOpts)
      // After some experimentation this is a nice place to assign the brush
      this.fabricCanvas.freeDrawingBrush = new fabric['PencilBrush'](this.fabricCanvas);
      this.fabricCanvas.freeDrawingBrush.color = this.state.toolColor;
      this.fabricCanvas.freeDrawingBrush.width = this.state.toolSize;
      this.fabricCanvas.isDrawingMode = true

    })
    var w = window.innerWidth;
    var h = window.innerHeight;
    var m = Math.min(w, h)
    this.setState({ width: w, height: h }, ()=>{
      if (!(typeof this.fabricCanvas == "undefined")){
        this.fabricCanvas.setWidth(w)
        this.fabricCanvas.setHeight(h)}
        this.fabricCanvas.on("mouse:down", this.onMouseDown)
        this.fabricCanvas.on("mouse:move", this.onMouseMove)
        this.fabricCanvas.on("mouse:up", this.onMouseUp)
        this.fabricCanvas.on("path:created", this.onMouseDown)         
    });
  }

  render() {
    return (
      <div>
        <iframe 
          width="1280"
          height="720"
          src="https://www.youtube.com/embed/l_Ss_GJSPao?&autoplay=1"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
 
        <div style={{position: 'absolute', left: 0, top: 0}}>
          <canvas  ref={this.state.canvasID} id={this.state.canvasID} />
        </div>
      </div>
      )
  }
}

export default DrawBoard;