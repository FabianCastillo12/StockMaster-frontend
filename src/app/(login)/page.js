import LoginForm from "@/app/(login)/components/LoginForm";
import { Card, CardContent } from "@/app/(login)/components/ui/card";
import { LoginBackground } from "@/app/(login)/components/LoginBackground";
import { LoginHeader } from "@/app/(login)/components/LoginHeader";

function Login() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden">
      <LoginBackground />
      
      <Card className="relative w-full max-w-md bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-white/20 shadow-xl">
        <CardContent className="p-6 space-y-6">
          <LoginHeader />
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
