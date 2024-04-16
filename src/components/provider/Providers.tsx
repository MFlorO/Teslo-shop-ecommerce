'use client'
import { SessionProvider } from "next-auth/react"
import { Provider as StoreReduxProvider} from "react-redux"
import { store } from "@/store"

interface Props {
  children: React.ReactNode
}

const Providers = ({ children }:Props) => {
  return (
    <SessionProvider>
      <StoreReduxProvider store={store}>
      { children }
      </StoreReduxProvider>
    </SessionProvider>
  )
}

export default Providers