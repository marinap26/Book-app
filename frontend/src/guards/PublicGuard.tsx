import { FunctionComponent, ReactNode } from 'react'

interface PublicGuardProps {
  children: ReactNode
}

const PublicGuard: FunctionComponent<PublicGuardProps> = ({ children }) => {
  return <>{children}</>
}

export default PublicGuard
