function toPascalCase(name){
  return name
    .split(/[-_\s]+/)
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')
    .replace(/[^A-Za-z0-9]/g, '')
}

function replaceAttrs(svg){
  // remove xml declaration
  let out = svg.replace(/<\?xml[^>]*>/g, '').trim()
  // remove width/height so component can accept props
  out = out.replace(/\s(width|height)="[^"]*"/gi, '')
  // common attribute conversions
  const map = {
    'class=': 'className=',
    'stroke-width': 'strokeWidth',
    'stroke-linecap': 'strokeLinecap',
    'stroke-linejoin': 'strokeLinejoin',
    'fill-rule': 'fillRule',
    'clip-rule': 'clipRule',
    'stroke-miterlimit': 'strokeMiterlimit',
  }
  Object.entries(map).forEach(([k,v])=>{
    const re = new RegExp(k, 'gi')
    out = out.replace(re, v)
  })
  // ensure viewBox attribute is camelCased if lowercased
  out = out.replace(/viewbox=/gi, 'viewBox=')
  // inject {...props} into svg tag
  out = out.replace(/<svg(\s+)/i, '<svg {...props}$1')
  return out
}

export function svgToReactComponent(svgText, name){
  const compName = toPascalCase(name || 'Icon')
  const jsxBody = replaceAttrs(svgText)
  const component = `import React from 'react'

const ${compName} = (props) => (
  ${jsxBody}
)

export default ${compName}
`
  return component
}

export function svgToJsxElement(svgText){
  // produce a JSX fragment (svg tag only)
  return replaceAttrs(svgText)
}

export function filenameToComponentName(filename){
  // remove extension
  const base = filename.replace(/\.svg$/i,'')
  return toPascalCase(base)
}

export default svgToReactComponent
