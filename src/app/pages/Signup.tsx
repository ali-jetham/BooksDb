import { useRef, useEffect } from "react"

declare global {
  interface Window {
    google: any;
  }
}

type CredentialResponse = {
  credential: string
  select_by: string

}

export default function Signup(): React.JSX.Element {
  const googleSignInBtnRef = useRef(null)

  function handleCredentialResponse(response: CredentialResponse): void {
    console.log(response.credential)
  }

  useEffect(() => {
    if (window.google) {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        ux_mode: "redirect",
        login_uri: "https://yeti-measured-correctly.ngrok-free.app/api/auth/google",
        use_fedcm_for_prompt: true,
        auto_select: false,
        context: "signup"
        // TODO:
        // nonce: 
      })

      if (googleSignInBtnRef !== null) {
        google.accounts.id.renderButton(googleSignInBtnRef.current,
          { type: "standard", theme: "outline", size: "large", shape: "rectangular" }
        )
      } else {
        console.log("googleSignInBtnRef is null")
      }
    }
  }, [googleSignInBtnRef])

  return (
    <div>
      <h1 className="pb-10 text-center text-2xl">Sign up</h1>
      <div ref={googleSignInBtnRef} id="buttonDiv" />
    </div>
  )
};

