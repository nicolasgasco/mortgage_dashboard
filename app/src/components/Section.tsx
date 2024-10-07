import { PropsWithChildren } from "react"

interface SectionProps extends PropsWithChildren {
  title: string;
}

export const Section = ({ title, children }: SectionProps): JSX.Element => {
  return (
    <div className="flex flex-col md:flex-row gap-3 justify-center border-slate-400 border-2 rounded-md p-4 relative my-1">
      <h2 className="font-bold text-md absolute px-2" style={{ left: 20, top: -15, background: '#242424' }}>{title}</h2>
      {children}
    </div >
  )
}