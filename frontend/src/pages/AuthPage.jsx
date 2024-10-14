import AuthForm from "../components/AuthForm"
import Box from "../components/Box"
import PageBox from "../components/PageBox"

const AuthPage = () => {
    return (
       <PageBox>
        <Box>
            <div className="page">
                <h2>Welcome</h2>
                <AuthForm />
            </div>
        </Box>
       </PageBox>
    )
}

export default AuthPage