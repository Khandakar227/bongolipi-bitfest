export default function Spinner({ size=12, border=3, color="#fff" }: { size?: number, border?: number, color?: string }) {
  return (
    <span className="loader" style={{ width: `${size}px`, height: `${size}px`, border: `${border}px dashed ${color}` }}></span>
  )
}
