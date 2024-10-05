interface TileProps extends React.PropsWithChildren {
  title: string;
}


export const Tile = ({ children, title }: TileProps) => {
  return (
    <div className="w-full sm:w-48 sm:max-w-48 sm:h-52 sm:max-h-52 py-10 sm:py-6 px-6 rounded-lg bg-slate-600">
      <div className="flex flex-col justify-between sm:justify-center gap-3 sm:gap-0 items-center h-full">
        <h2 className="text-2xl font-bold sm:mb-auto">
          {title}
        </h2>
        <div className="text-lg sm:mb-auto">
          {children}
        </div>
      </div>
    </div>
  )
}