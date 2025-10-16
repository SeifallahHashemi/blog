import { login, signup } from "./action";


export default function LoginPage() {
  return (
    <form className="flex flex-col justify-center items-center gap-y-4 max-w-screen w-3/5 mx-auto" dir="ltr">
      <div className="flex flex-row gap-x-2">
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
      </div>
      <div className="flex flex-row gap-x-2">
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
      </div>
      <div className="flex flex-row gap-x-2">
        <button formAction={login}>Log in</button>
        <button formAction={signup}>Sign up</button>
      </div>
    </form>
  );
}
