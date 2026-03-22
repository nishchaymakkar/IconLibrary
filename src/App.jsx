import React, { useState, useMemo } from 'react'
import iconsSummary from '../icons_summary.json'
import IconGrid from './IconGrid'

export default function App(){
  const categories = useMemo(()=>Object.keys(iconsSummary.categories).sort((a,b)=>a.localeCompare(b,'en',{sensitivity:'base'})), [])
  const [active, setActive] = useState(categories[0] || '')
  const [query, setQuery] = useState('')

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>Categories</h2>
        <ul>
          {categories.map(cat => (
            <li key={cat} className={cat===active? 'active':''} onClick={()=>setActive(cat)}>
              {cat} <span className="count">{iconsSummary.categories[cat].length}</span>
            </li>
          ))}
        </ul>
      </aside>
      <main className="main">
        <header>
          <div>
            <h1>Icon Library</h1>
            <div className="summary">Total: {iconsSummary.total} icons</div>
          </div>
          <div className="controls">
            <input aria-label="Search icons" placeholder="Search icons..." value={query} onChange={e=>setQuery(e.target.value)} />
          </div>
        </header>
        <IconGrid category={active} icons={iconsSummary.categories[active]} query={query} />
      </main>
    </div>
  )
}
