import { ForgotPasswordBox } from "app/forgot/forgotbox"
import { SetNewPasswordBox } from "app/forgot/setnewpassbox"

export default function Home() {
  return (
    <main className="bg-f4f4f4 min-h-screen flex justify-center items-center">
    <ForgotPasswordBox />
    {/* <SetNewPasswordBox /> */}
    </main>
  )
}
