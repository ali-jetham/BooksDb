// NOTE: this file is not used

import { useRef, useEffect } from "react";

export default function Signup(): React.JSX.Element {
	const googleSignInBtnRef = useRef(null);

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://accounts.google.com/gsi/client";
		script.async = true;
		document.body.appendChild(script);

		script.onload = () => {
			if (window.google) {
				google.accounts.id.initialize({
					client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
					ux_mode: "redirect",
					login_uri: "https://yeti-measured-correctly.ngrok-free.app/api/auth/google",
					use_fedcm_for_prompt: true,
					auto_select: false,
					context: "signup",
					// TODO:
					// nonce:
				});

				function tryRender() {
					if (googleSignInBtnRef.current !== null) {
						google.accounts.id.renderButton(googleSignInBtnRef.current, {
							type: "standard",
							theme: "outline",
							size: "large",
							shape: "rectangular",
						});
					} else {
						setTimeout(tryRender, 50);
						console.log("googleSignInBtnRef is null");
					}
				}
				tryRender();
			} else {
				console.log("Google accounts library not loaded yet");
			}

			return () => {
				document.body.removeChild(script);
			};
		};
	}, []);

	return (
		<div>
			<h1 className="pb-10 text-center text-2xl">Sign up</h1>
			<div ref={googleSignInBtnRef} id="buttonDiv" />
		</div>
	);
}
