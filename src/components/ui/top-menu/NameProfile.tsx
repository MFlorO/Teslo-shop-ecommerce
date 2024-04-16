import { useSession } from "next-auth/react"

const NameProfile = () => {

  const { data } = useSession()
  const sessionName = data?.user?.name

  return ( 
    sessionName &&
    <div className="hidden sm:block">
      ¡ Hola {sessionName} !
    </div>
  )
}

export default NameProfile