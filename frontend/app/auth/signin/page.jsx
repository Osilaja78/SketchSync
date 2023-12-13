// signin page.
import SigninForm from "@/components/auth-forms/signinForm";
import Navbar from "@/components/navbar";


export default function SignupPage() {
    return (
        <>
            <Navbar home={false} />
            <hr />
            <SigninForm />
        </>
    )
}