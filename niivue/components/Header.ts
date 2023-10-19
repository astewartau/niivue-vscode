import { html } from 'htm/preact'
import { ShowHeaderButton } from './ShowHeaderButton'
import { AppProps } from './App'

export const Header = ({ nv0, headerRef }: AppProps) => {
  const nv = nv0.value
  if (!nv.isLoaded || nv.volumes.length < 1) {
    return html``
  }

  return html`
    <div class="horizontal-layout" ref=${headerRef}>
      <button onClick=${() => location.reload()}>Home</button>
      <${ShowHeaderButton} info=${nv.volumes[0].hdr.toFormattedString()} />
      <p>${getMetadataString(nv)}</p>
    </div>
  `
}

function getMetadataString(nv: Niivue) {
  const meta = nv?.volumes?.[0]?.getImageMetadata()
  if (!meta || !meta.nx) {
    return ''
  }
  const matrixString =
    'matrix size: ' + meta.nx + ' x ' + meta.ny + ' x ' + meta.nz
  const voxelString =
    'voxelsize: ' +
    meta.dx.toPrecision(2) +
    ' x ' +
    meta.dy.toPrecision(2) +
    ' x ' +
    meta.dz.toPrecision(2)
  const timeString = meta.nt > 1 ? ', timepoints: ' + meta.nt : ''
  return matrixString + ', ' + voxelString + timeString
}
