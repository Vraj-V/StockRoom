import { ArrowRight, LockKeyhole, Mail } from 'lucide-react';
import { useState } from 'react';

const Login = ({ onLogin, onSwitch, loading }) => {
	const [form, setForm] = useState({ email: '', password: '' });
	const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

	return (
		<form onSubmit={(event) => { event.preventDefault(); onLogin(form); }} className="space-y-5">
			<label className="block text-sm font-semibold">Email
				<span className="relative mt-2 block"><Mail size={17} className="absolute left-4 top-3.5 text-neutral-400" /><input required type="email" name="email" value={form.email} onChange={update} placeholder="you@company.com" className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10" /></span>
			</label>
			<label className="block text-sm font-semibold">Password
				<span className="relative mt-2 block"><LockKeyhole size={17} className="absolute left-4 top-3.5 text-neutral-400" /><input required type="password" name="password" value={form.password} onChange={update} placeholder="Your password" className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10" /></span>
			</label>
			<button disabled={loading} className="group flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-950 py-3.5 font-bold text-white transition hover:bg-orange-500 disabled:opacity-60">{loading ? 'Signing in...' : 'Sign in'} <ArrowRight size={18} className="transition group-hover:translate-x-1" /></button>
			<p className="text-center text-sm text-neutral-500">New to Stockroom? <button type="button" onClick={onSwitch} className="font-bold text-orange-600 hover:text-orange-700">Create an account</button></p>
		</form>
	);
};

export default Login;
