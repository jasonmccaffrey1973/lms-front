import { useEffect, useRef } from "react"
import StyledLoader from "./Loader.styles"

const Loader = () => {
    const dialogRef = useRef<HTMLDialogElement | null>(null)

    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) {
            return
        }

        if (!dialog.open) {
            dialog.showModal()
        }

        return () => {
            if (dialog.open) {
                dialog.close()
            }
        }
    }, [])

    return (
        <StyledLoader ref={dialogRef} role="status" aria-live="polite" aria-label="Loading" />
    )
}

export default Loader