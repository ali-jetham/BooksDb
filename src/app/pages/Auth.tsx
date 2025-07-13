import { DatabaseIcon } from "@phosphor-icons/react"
import { useEffect, useRef } from "react"
import { Outlet } from "react-router"

type AuthProps = {
  type: "signin" | "signup" | "use";
}

export default function Auth(props: AuthProps): React.JSX.Element {

  const googleSignInBtnRef = useRef(null)

  useEffect(() => {
    if (window.google) {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        ux_mode: "redirect",
        login_uri: "https://yeti-measured-correctly.ngrok-free.app/api/auth/google",
        use_fedcm_for_prompt: true,
        auto_select: false,
        context: props.type
        // TODO:
        // nonce: 
      })

      function tryRender() {
        if (googleSignInBtnRef.current !== null) {
          google.accounts.id.renderButton(googleSignInBtnRef.current,
            { type: "standard", theme: "outline", size: "large", shape: "rectangular", text: props.type === "signup" ? "signup_with" : "continue_with" }
          )
        } else {
          setTimeout(tryRender, 50)
          console.log("googleSignInBtnRef is null")
        }
      }
      tryRender()
    }
  }, [])

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center ">
      <DatabaseIcon size={96} color="#EF4764" />
      <h1 className="pb-10 text-center text-2xl">{props.type === "signup" ? "Sign up" : "Log in"}</h1>
      <div ref={googleSignInBtnRef} id="buttonDiv" />
      {/* <Outlet /> */}
    </div>
  )
};

