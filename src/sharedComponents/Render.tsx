import type { ReactNode } from "react"

type RenderProps = {
    if: boolean
    children: ReactNode
}

const Render = ({ if: shouldRender, children }: RenderProps) => !shouldRender ? null : <>{children}</>

export default Render