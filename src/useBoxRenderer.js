import { useEffect } from 'react'

const renderPredictions = (predictions, canvasRef) => {
  const ctx = canvasRef.current.getContext('2d')
  // Font options.
  const font = '16px sans-serif'
  ctx.font = font
  ctx.textBaseline = 'top'
  predictions.forEach(prediction => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    const x = prediction.bbox[0]
    const y = prediction.bbox[1]
    const width = prediction.bbox[2]
    const height = prediction.bbox[3]
    // Draw the bounding box.
    
    //ctx.strokeStyle = '#00FFFF'
    //ctx.lineWidth = 4
    //ctx.strokeRect(x, y, width, height*2)
    
    //fill circle wihth color
    ctx.beginPath();
    ctx.arc(x+width/2, y+height, (width+height)/2.7, 0, 2 * Math.PI, false);
    ctx.filter = "blur(8px)"
    ctx.fillStyle = 'gray';
    ctx.fill();
    

  
    // Draw the label background.
    /*ctx.fillStyle = '#00FFFF'
    const textWidth = ctx.measureText(prediction.class).width
    const textHeight = parseInt(font, 10) // base 10
    ctx.fillRect(x, y, textWidth + 4, textHeight + 4)
    */
  })
  
  
}

const detectFrame = async (model, videoRef, canvasRef) => {
  const predictions = await model.detect(videoRef.current)
  renderPredictions(predictions, canvasRef)
  requestAnimationFrame(() => {
    detectFrame(model, videoRef, canvasRef)
  })
}

const useBoxRenderer = (model, videoRef, canvasRef, shouldRender) => {
  useEffect(() => {
    if (model && shouldRender) {
      detectFrame(model, videoRef, canvasRef)
    }
  }, [canvasRef, model, shouldRender, videoRef])
}

export default useBoxRenderer
