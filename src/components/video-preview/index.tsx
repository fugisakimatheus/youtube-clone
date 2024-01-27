export type VideoPreviewProps = {
  variant?: 'column' | 'row' | 'row-compact'
}

export function VideoPreview(props: VideoPreviewProps) {
  const { variant = 'column' } = props
  return <div className=""></div>
}
