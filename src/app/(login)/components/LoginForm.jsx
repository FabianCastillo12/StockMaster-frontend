"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { signIn, useSession } from "next-auth/react";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
import { Input } from "@/app/(login)/components/ui/input";
import { Button } from "@/app/(login)/components/ui/button";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log("olitass", responseNextAuth);

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }
    console.log("session", session);

    if (responseNextAuth.ok) {
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "Autenticacion exitoso",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="relative group">
          <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <Input
            type="email"
            placeholder="Email address"
            className="pl-10 transition-all border-muted-foreground/20 focus:border-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="relative group">
          <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="pl-10 pr-10 transition-all border-muted-foreground/20 focus:border-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? (
              <EyeOffIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300 transform hover:scale-[1.02]"
      >
        Iniciar sesión
      </Button>
    </form>
  );
};

export default LoginForm;
