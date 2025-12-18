import { useState } from 'react';
import { Lock, User, Mail, LayoutDashboard, LogOut, Activity, Users, DollarSign } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setLoggedInUser(data.user);
        setCurrentView('dashboard');
        setEmail('');
        setPassword('');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Cannot connect to server. Make sure backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setLoggedInUser(data.user);
        setCurrentView('dashboard');
        setName('');
        setEmail('');
        setPassword('');
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (err) {
      setError('Cannot connect to server. Make sure backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedInUser(null);
    setCurrentView('login');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      if (currentView === 'login') {
        handleLogin();
      } else if (currentView === 'signup') {
        handleSignup();
      }
    }
  };

  // ===========================
  // DASHBOARD VIEW
  // ===========================
  if (currentView === 'dashboard') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50">
        <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40">
                  <LayoutDashboard className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <span className="block text-sm text-slate-400">Control Panel</span>
                  <span className="block text-lg font-semibold tracking-tight text-slate-50">
                    Analytics Dashboard
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-slate-400">Signed in as</p>
                  <p className="text-sm font-medium text-slate-100">
                    {loggedInUser?.name}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-red-500/90 hover:bg-red-500 text-white shadow-md shadow-red-500/30 transition-transform hover:-translate-y-0.5"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                Overview
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Quick snapshot of your application metrics and recent activity.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/70 border border-slate-800 rounded-full px-3 py-1">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 mr-1" />
              Live connection
            </div>
          </header>

          {/* Stats cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 shadow-lg shadow-slate-900/60 hover:border-indigo-500/60 hover:-translate-y-1 transition-transform">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Total Users
                  </p>
                  <p className="mt-1 text-3xl font-semibold text-slate-50">
                    1,234
                  </p>
                </div>
                <div className="w-11 h-11 flex items-center justify-center rounded-2xl bg-blue-500/15 border border-blue-500/40">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <p className="text-xs text-emerald-400">
                ▲ 12% <span className="text-slate-400">vs last week</span>
              </p>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 shadow-lg shadow-slate-900/60 hover:border-emerald-500/60 hover:-translate-y-1 transition-transform">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Revenue
                  </p>
                  <p className="mt-1 text-3xl font-semibold text-slate-50">
                    $45,678
                  </p>
                </div>
                <div className="w-11 h-11 flex items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/40">
                  <DollarSign className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
              <p className="text-xs text-slate-400">
                Last updated <span className="text-slate-300">2 mins ago</span>
              </p>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 shadow-lg shadow-slate-900/60 hover:border-purple-500/60 hover:-translate-y-1 transition-transform">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Active Sessions
                  </p>
                  <p className="mt-1 text-3xl font-semibold text-slate-50">
                    892
                  </p>
                </div>
                <div className="w-11 h-11 flex items-center justify-center rounded-2xl bg-purple-500/10 border border-purple-500/40">
                  <Activity className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <p className="text-xs text-amber-400">
                ● Real-time monitoring enabled
              </p>
            </div>
          </section>

          {/* Recent activity */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl shadow-slate-950/70">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-50">
                Recent Activity
              </h2>
              <span className="text-xs text-slate-400 bg-slate-800/80 border border-slate-700 rounded-full px-3 py-1">
                Last 24 hours
              </span>
            </div>
            <div className="divide-y divide-slate-800">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between py-3 hover:bg-slate-800/50 rounded-xl px-2 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-100">
                      Activity {item}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Description of recent activity
                    </p>
                  </div>
                  <span className="text-xs text-slate-500">
                    2 hours ago
                  </span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  }

  // ===========================
  // LOGIN / SIGNUP VIEW
  // ===========================
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      {/* Background gradient blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 -left-24 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-24 w-72 h-72 bg-pink-500/30 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-10 items-center">
        {/* Left side - marketing / info */}
        <div className="hidden md:flex flex-col gap-6 text-slate-100">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-1 w-fit text-xs text-indigo-100">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            
          </div> 
        </div>

        {/* Right side - auth card */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-70" />
          <div className="relative bg-slate-950/90 border border-slate-800 rounded-3xl shadow-2xl shadow-slate-950/80 p-8 sm:p-9">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-3 bg-indigo-500/15 border border-indigo-500/40 rounded-2xl mb-4">
                <Lock className="w-7 h-7 text-indigo-300" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-50">
                {currentView === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-xs text-slate-400 mt-2">
                {currentView === 'login'
                  ? 'Sign in to continue to your dashboard.'
                  : 'Fill in your details to get started.'}
              </p>
            </div>

            {error && (
              <div className="mb-4 rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs text-red-100">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {currentView === 'signup' && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full bg-slate-900/70 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      placeholder="John Doe"
                      disabled={loading}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full bg-slate-900/70 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="you@example.com"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full bg-slate-900/70 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="••••••••"
                    disabled={loading}
                  />
                </div>
              </div>

              <button
                onClick={currentView === 'login' ? handleLogin : handleSignup}
                disabled={loading}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold py-2.5 rounded-xl shadow-md shadow-indigo-500/40 transition-transform hover:-translate-y-0.5 disabled:bg-indigo-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Please wait...' : currentView === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setCurrentView(currentView === 'login' ? 'signup' : 'login');
                  setError('');
                }}
                className="text-xs font-medium text-indigo-300 hover:text-indigo-200 underline-offset-4 hover:underline"
                disabled={loading}
              >
                {currentView === 'login'
                  ? "Don't have an account? Sign up"
                  : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
