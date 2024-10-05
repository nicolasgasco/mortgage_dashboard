interface TileProps extends React.PropsWithChildren {
  title: string;
}


export const Tile = ({ children, title }: TileProps) => {
  return (
    <div className="w-48 max-w-48 h-52 max-h-52 py-6 px-6 rounded-lg bg-slate-600">
      <div className="flex flex-col justify-center items-center h-full relative">
        <h2 className="text-2xl font-bold mb-auto">
          {title}
        </h2>
        <div className="text-lg mb-auto">
          {children}
        </div>
      </div>
    </div>
  )
}