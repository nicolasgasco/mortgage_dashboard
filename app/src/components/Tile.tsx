interface TileProps extends React.PropsWithChildren {
  title: string;
}


export const Tile = ({ children, title }: TileProps) => {
  return (
    <div className="w-full sm:w-44 sm:max-w-48 sm:h-48 sm:max-h-52 py-10 sm:py-2 px-2 rounded-lg bg-zinc-700">
      <div className="flex flex-col justify-between sm:justify-center gap-3 sm:gap-0 items-center h-full">
        <h3 className="text-2xl font-bold sm:mb-auto">
          {title}
        </h3>
        <div className="text-lg sm:mb-auto">
          {children}
        </div>
      </div>
    </div>
  )
}