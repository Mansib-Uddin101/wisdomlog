'use client'

import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const SignUpForm = () => {
  const router = useRouter()

  const handleSignUp = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    
    const { data, error } = await authClient.signIn.email({
      email,
      password
    });
    

    if (error) {
      toast.error(error.message || "Failed to Log in");
    } else {
      toast.success("Logged In successfully!");
      router.push('/');
    }
  };

  const handleGoogleSignIn = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    
    if (error) {
      toast.error(error.message || "Google sign in failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50/60 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-100/70 border border-slate-100">
        <div className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Login</h2>
            <p className="text-sm text-slate-500 mt-2">Join PetBuddy to find and manage your perfect companion.</p>
          </div>

          <button 
            type="button"
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 transition-colors rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 w-full shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
            Login with Google
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-400 font-medium tracking-wider">or email signin</span>
            </div>
          </div>

          <form onSubmit={handleSignUp} className="space-y-4">

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
              <input 
                name="email" 
                type="email" 
                placeholder="email@example.com" 
                required 
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-slate-800 placeholder:text-slate-400" 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
              <input 
                name="password" 
                type="password" 
                placeholder="••••••••" 
                required 
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-slate-800 placeholder:text-slate-400" 
              />
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full bg-[#D36B39] hover:bg-[#b9572b] text-white rounded-xl px-4 py-2.5 font-medium text-base transition-colors shadow-sm shadow-orange-700/10 focus:outline-none focus:ring-2 focus:ring-orange-300"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-slate-500">Don't have an account? </span>
            <Link href="/signup" className="font-semibold text-[#D36B39] hover:underline transition-all">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;