import { ArrowRight, LockKeyhole, Mail, UserRound } from 'lucide-react';
import { useState } from 'react';

const Signup = ({ onSignup, onSwitch, loading }) => {
	const [form, setForm] = useState({ name: '', email: '', password: '' });
	const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

	return (
		<form onSubmit={(event) => { event.preventDefault(); onSignup(form); }} className="space-y-4">
			<label className="block text-sm font-semibold">Full name
				<span className="relative mt-2 block"><UserRound size={17} className="absolute left-4 top-3.5 text-neutral-400" /><input required name="name" value={form.name} onChange={update} placeholder="Alex Morgan" className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-11 pr-4 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10" /></span>
			</label>
			<label className="block text-sm font-semibold">Email
				<span className="relative mt-2 block"><Mail size={17} className="absolute left-4 top-3.5 text-neutral-400" /><input required type="email" name="email" value={form.email} onChange={update} placeholder="you@company.com" className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-11 pr-4 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10" /></span>
			</label>
			<label className="block text-sm font-semibold">Password
				<span className="relative mt-2 block"><LockKeyhole size={17} className="absolute left-4 top-3.5 text-neutral-400" /><input required minLength="6" type="password" name="password" value={form.password} onChange={update} placeholder="At least 6 characters" className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-11 pr-4 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10" /></span>
			</label>
			<button disabled={loading} className="group flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-950 py-3.5 font-bold text-white transition hover:bg-orange-500 disabled:opacity-60">{loading ? 'Creating account...' : 'Create account'} <ArrowRight size={18} className="transition group-hover:translate-x-1" /></button>
			<p className="text-center text-sm text-neutral-500">Already have an account? <button type="button" onClick={onSwitch} className="font-bold text-orange-600 hover:text-orange-700">Sign in</button></p>
		</form>
	);
};

export default Signup;
