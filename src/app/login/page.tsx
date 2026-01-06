import {
  AuthContainer,
  AuthForms,
  AuthHeader,
  ParticlesComp,
} from "./auth-components"
import { AuthProvider } from "./auth-context"

export default function LoginPage() {
  return (
    <AuthProvider>
      <AuthContainer>
        <AuthHeader />
        <AuthForms />
      </AuthContainer>
      <ParticlesComp />
    </AuthProvider>
  )
}
