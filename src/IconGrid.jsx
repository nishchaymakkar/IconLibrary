import React, { useState, useMemo, useRef, useEffect } from 'react'
import { filenameToComponentName } from './svgToJsx'
import { FixedSizeGrid as Grid } from 'react-window'

function encodePath(...parts){
  return parts.map(p=>encodeURIComponent(p)).join('/')
}

function useSize(ref){
  const [size, setSize] = useState({width: 800, height: 600})
  useEffect(()=>{
    if(!ref.current) return
    const ro = new ResizeObserver(entries=>{
      for(const e of entries){
        setSize({ width: e.contentRect.width, height: e.contentRect.height })
      }
    })
    ro.observe(ref.current)
    return ()=>ro.disconnect()
  }, [ref])
  return size
}

export default function IconGrid({ category, icons, query = '' }){
  const [copied, setCopied] = useState(null)
  const containerRef = useRef()
  const { width, height } = useSize(containerRef)

  const list = useMemo(()=>{
    const q = query.trim().toLowerCase()
    return q ? icons.filter(n=>n.toLowerCase().includes(q)) : icons
  }, [icons, query])

  const colWidth = 140
  const rowHeight = 120
  const columnCount = Math.max(1, Math.floor((width || 800) / colWidth))
  const rowCount = Math.ceil(list.length / columnCount)

  async function handleClick(name){
    try{
      // Copy a simple React usage snippet (import + JSX usage)
      const compName = filenameToComponentName(name)
      const snippet = `import ${compName} from './components/${compName}'\n\n// usage\n<${compName} width={24} height={24} />`
      await navigator.clipboard.writeText(snippet)
      setCopied(name)
      setTimeout(()=>setCopied(null), 1500)
    }catch(e){
      console.error(e)
      alert('Failed to copy usage snippet')
    }
  }

  // removed unused handleCopyUsage to avoid referencing undefined state

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const idx = rowIndex * columnCount + columnIndex
    if(idx >= list.length) return null
    const name = list[idx]
    // Move padding inside to avoid increasing Grid cell size
    return (
      <div style={style}>
        <div style={{padding:8, height:'100%'}}>
          <div className="icon-card" onClick={()=>handleClick(name)} title={`Click to copy React usage`}>
            <img src={`/icons/${encodePath(category, name + '.svg')}`} alt={name} />
            <div className="label">{name}</div>
            {copied===name && <div className="copied">Copied</div>}
          </div>
        </div>
      </div>
    )
  }

  // clamp width slightly to avoid fractional/rounding overflows
  const gridWidth = Math.max(0, Math.floor((width || 800)))
  const gridHeight = Math.max(300, Math.floor((height || (window.innerHeight - 160))))

  return (
    <div ref={containerRef} style={{width:'100%',height:'calc(100vh - 120px)', overflowX:'hidden'}}>
      <div style={{width:'100%',height:'100%',overflowX:'hidden'}}>
        <Grid
          columnCount={columnCount}
          columnWidth={colWidth}
          height={gridHeight}
          rowCount={rowCount}
          rowHeight={rowHeight}
          width={gridWidth}
        >
          {Cell}
        </Grid>
      </div>
    </div>
  )
}
