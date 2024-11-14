import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ShareBoard from './components/ShareBoard'
import './App.css'
import useDraw from './hooks/drawHook'

function App() {

  // Default parameters
  const [brushColor, setBrushColor] = useState('black');
  const [brushSize, setBrushSize] = useState(5);

  const {canvasRef, sendDrawData} = useDraw();

  return (
    <div className='App' >
      <h1>Very cool shareboard</h1>
      <div>
        <div className='settings'>
        <div>
            <span>Color: </span>
            <input type="color" value={brushColor} onChange={(e) => setBrushColor(e.target.value)} />
          </div>
          <div>
            <span>Size: </span>
            <input type="range" color='#fac176'
              min="1" max="100" value={brushSize} onChange={(e) => setBrushSize(Number(e.target.value))} />
            <span>{brushSize}</span>
          </div>
        </div>
        <ShareBoard brushColor={brushColor} brushSize={brushSize} canvasRef={canvasRef} sendDrawData={sendDrawData}  />
      </div>
    </div>
  )
}

export default App
