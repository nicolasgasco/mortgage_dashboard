interface TileProps extends React.PropsWithChildren {
  title: string;
}


export const Tile = ({ children, title }: TileProps) => {
  return (
    <div className="w-48 max-w-48 h-60 max-h-60 py-6 px-6 rounded-lg bg-slate-600">
      <div className="flex flex-col justify-center h-full relative">
        <p className="text-2xl font-bold absolute top-0 left-2/4" style={{
          transform: 'translateX(-50%)'
        }}>
          {title}
        </p>
        <div className="mt-14 text-lg">
          {children}
        </div>
      </div>
    </div>
  )
}