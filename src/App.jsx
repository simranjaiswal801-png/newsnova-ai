import './index.css'
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function App() {

  const [page, setPage] = useState("home");
  const [aiResponse, setAiResponse] = useState("");
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem('newsnova_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    fetch("https://gnews.io/api/v4/top-headlines?lang=en&country=in&max=24&apikey=4390bd48f916120416cbb33621053601")
      .then(res => res.json())
      .then(data => setNews(data.articles || []));
  }, []);

  const filteredNews = news.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogin = () => {
    if (!loginEmail || !loginPassword) {
      setError("Please fill all fields");
      return;
    }
    localStorage.setItem('newsnova_user', JSON.stringify({
      name: loginEmail.split('@')[0],
      email: loginEmail
    }));
    setUser({ name: loginEmail.split('@')[0], email: loginEmail });
    setPage("home");
    setLoginEmail("");
    setLoginPassword("");
    setError("");
  };

  const handleSignup = () => {
    if (!signupName || !signupEmail || !signupPassword) {
      setError("Please fill all fields");
      return;
    }
    localStorage.setItem('newsnova_user', JSON.stringify({
      name: signupName,
      email: signupEmail
    }));
    setUser({ name: signupName, email: signupEmail });
    setPage("home");
    setSignupName("");
    setSignupEmail("");
    setSignupPassword("");
    setError("");
  };

  const handleLogout = () => {
    localStorage.removeItem('newsnova_user');
    setUser(null);
  };


  const handleExplain = (title) => {
    setAiResponse(`🤖 AI Explanation for ${user ? user.name : 'you'}: ${title} explained in simple words.`);
  };

  if (page === "login") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-blue-500/10"></div>
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 w-full max-w-md"
        >
          <Card className="bg-white/5 backdrop-blur-xl border-white/20 shadow-2xl">
            <CardContent className="p-8 space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2 tracking-tight">
                  NewsNova
                </h1>
                <p className="text-gray-400 text-lg">Welcome back</p>
              </div>
              {error && (
                <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm">
                  {error}
                </div>
              )}
              <div className="space-y-4">
                <Input 
                  placeholder="Email" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder-gray-400 h-12"
                />
                <Input 
                  placeholder="Password" 
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder-gray-400 h-12"
                />
                <Button 
                  className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg font-semibold shadow-lg"
                  onClick={handleLogin}
                >
                  Sign In
                </Button>
              </div>
              <div className="text-center pt-4 border-t border-white/10">
                <p className="text-sm text-gray-400">
                  Don't have an account?{' '}
                  <button onClick={() => setPage("signup")} className="text-purple-400 hover:text-purple-300 font-medium">
                    Sign Up
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (page === "signup") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-pink-900/20 to-black flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(var(--tw-gradient-stops))] from-pink-500/10 via-transparent to-purple-500/10"></div>
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 w-full max-w-md"
        >
          <Card className="bg-white/5 backdrop-blur-xl border-white/20 shadow-2xl">
            <CardContent className="p-8 space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-2 tracking-tight">
                  NewsNova
                </h1>
                <p className="text-gray-400 text-lg">Join the future of news</p>
              </div>
              {error && (
                <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm">
                  {error}
                </div>
              )}
              <div className="space-y-4">
                <Input 
                  placeholder="Full Name" 
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder-gray-400 h-12"
                />
                <Input 
                  placeholder="Email" 
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder-gray-400 h-12"
                />
                <Input 
                  placeholder="Password" 
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder-gray-400 h-12"
                />
                <Button 
                  className="w-full h-12 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-600 text-lg font-semibold shadow-lg"
                  onClick={handleSignup}
                >
                  Create Account
                </Button>
              </div>
              <div className="text-center pt-4 border-t border-white/10">
                <p className="text-sm text-gray-400">
                  Already have an account?{' '}
                  <button onClick={() => setPage("login")} className="text-purple-400 hover:text-purple-300 font-medium">
                    Sign In
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // HOME PAGE (default)
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <nav className="bg-gray-900/80 backdrop-blur-md border-b border-gray-700 p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            🧠 NewsNova AI
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
            <div className="relative flex-1 md:w-80">
              <Input 
                placeholder="Search news..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800/50 border-gray-600/50 backdrop-blur-sm pl-10"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="flex gap-2 items-center">
              {user ? (
                <>
                  <div className="text-sm bg-gradient-to-r from-green-500/20 to-blue-500/20 px-3 py-1 rounded-full backdrop-blur-sm border border-green-500/30">
                    Welcome, {user.name} 👋
                  </div>
                  <Button onClick={handleLogout} size="sm" variant="outline" className="border-gray-600 hover:bg-red-600/50">
                    Logout
                  </Button>
                </>
              ) : (
                <Button onClick={() => setPage("login")} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Sign In
                </Button>
              )}
              <Button onClick={() => setAiResponse("")} size="sm" variant="outline" className="border-gray-600 hover:bg-gray-700">
                Clear AI
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-grow p-6 max-w-7xl mx-auto w-full">
        {aiResponse && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12 p-8 bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-blue-900/40 rounded-3xl border border-indigo-500/50 backdrop-blur-xl shadow-2xl max-w-4xl mx-auto relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 z-10">
              <Button onClick={() => setAiResponse("")} variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10">
                ✕
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-1">
                <div className="flex flex-col items-center lg:items-start gap-4 mb-6 lg:mb-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl border-4 border-white/20">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="text-center lg:text-left">
                    <h3 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Nova AI</h3>
                    <p className="text-sm text-blue-300">Your intelligent assistant</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs backdrop-blur-sm border border-white/20">AI Generated</span>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs backdrop-blur-sm border border-white/20">Simplified</span>
                  </div>
                  <p className="text-lg leading-relaxed text-gray-200">
                    {aiResponse}
                  </p>
                  <div className="flex gap-3 pt-4 border-t border-white/10">
                    <Button 
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 flex items-center gap-2"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(aiResponse);
                        } catch (err) {
                          console.error('Failed to copy: ', err);
                        }
                      }}
                    >
                      📋 Copy
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-white/20 hover:bg-white/10 flex items-center gap-2"
                      onClick={async () => {
                        if (navigator.share) {
                          await navigator.share({
                            title: 'NewsNova AI Explanation',
                            text: aiResponse,
                          });
                        } else {
                          await navigator.clipboard.writeText(window.location.href);
                        }
                      }}
                    >
                      🔗 Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredNews.slice(0, 12).map((item, index) => (
            <motion.div 
              key={item.url || index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group"
            >
              <Card className="h-full rounded-3xl shadow-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm hover:shadow-2xl hover:border-purple-500/50 transition-all duration-300 group-hover:bg-gray-700/50 overflow-hidden">
                <CardContent className="p-6">
                  <img
                    src={item.image || "https://via.placeholder.com/400x200?text=News"}
                    alt={item.title}
                    className="rounded-2xl mb-4 h-48 w-full object-cover group-hover:brightness-110 transition-all"
                  />
                  <h2 className="text-xl font-bold mb-3 line-clamp-2 leading-tight">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-300 mb-4 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleExplain(item.title)}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 flex-1"
                    >
                      🤖 AI Explain
                    </Button>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 flex-1">
                        Read More →
                      </Button>
                    </a>
                  </div>
                  {item.source && (
                    <p className="text-xs text-gray-500 mt-3 font-medium">
                      {item.source.name}
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
          {filteredNews.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-20"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-400">No news found</h3>
              <p className="text-gray-500">Try a different search term</p>
            </motion.div>
          )}
        </div>
      </div>

      <footer className="bg-gray-900/50 backdrop-blur-md border-t border-gray-700/50 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                NewsNova AI
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Your AI-powered news companion. Get instant explanations and stay updated with trending stories.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">World</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Technology</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Business</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Science</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer" onClick={(e) => { e.preventDefault(); setPage("about"); }}>About</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer" onClick={(e) => { e.preventDefault(); setPage("careers"); }}>Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer" onClick={(e) => { e.preventDefault(); setPage("privacy"); }}>Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer" onClick={(e) => { e.preventDefault(); setPage("terms"); }}>Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4 mb-4">
                <a href="https://www.ndtv.com/" className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-purple-600 transition-all hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="https://theprint.in/" className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77 .35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83 .5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04 .67.11 .98C8.28 9.09 5.11 7.38 3 4.79c-.37 .63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93 .07 4.28 4.28 0 0 0 4 2.98 8.52 8.52 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79 0 .52-.01-1-.01-2.47 0-.37 0-.74.02-1.11z"/></svg>
                </a>
              </div>
              <p className="text-xs text-gray-500">hello@newsnova.ai</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
            <p>&copy; 2026 NewsNova AI. Built with ❤️ by Simran. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
