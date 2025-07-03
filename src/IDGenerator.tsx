import { useEffect, type ReactNode } from 'react'

function IDGenerator({ children }: {children: ReactNode}) {
    function randomNumber(){
        return Math.floor((Math.random() * (800000 - 100000 + 1)) + 100000)
    }
    useEffect(() => {
        if (!localStorage.getItem("userID")) {
            localStorage.setItem("userID", randomNumber().toString())
        }
    }, [])
    return (
        <>
            {children}
        </>
    )
}

export default IDGenerator