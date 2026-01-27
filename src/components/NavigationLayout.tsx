import { Home, BookOpen, Clock, Settings as SettingsIcon, Zap, User, LogOut } from 'lucide-react';
import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface NavigationLayoutProps {
  children: ReactNode;
  userName: string;
  userType: 'premium' | 'free' | null;
  currentScreen: string;
  onNavigate: (screen: any) => void;
  onShowProfile: () => void;
  onLogout: () => void;
}

export function NavigationLayout({
  children,
  userName,
  userType,
  currentScreen,
  onNavigate,
  onShowProfile,
  onLogout
}: NavigationLayoutProps) {
  const navItems = [
    { icon: Home, label: 'Home', screen: 'dashboard' },
    { icon: BookOpen, label: 'My Lessons', screen: 'lessons' },
    { icon: Clock, label: 'History', screen: 'history' },
    { icon: SettingsIcon, label: 'Settings', screen: 'settings' }
  ];

  return (
    <div className="h-screen bg-[#1E1B4B] flex flex-col lg:flex-row overflow-hidden">
      {/* Desktop Sidebar - Fixed */}
      <aside className="hidden lg:flex flex-col w-64 h-screen bg-[#312E81] border-r border-[#06B6D4]/20 p-6 flex-shrink-0">
        <div className="flex items-center gap-3 mb-8">
          <motion.div
            className="p-2 rounded-lg bg-gradient-to-br from-[#06B6D4] to-[#F472B6] glow-cyan"
            animate={{
              boxShadow: [
                '0 0 20px rgba(6, 182, 212, 0.5)',
                '0 0 30px rgba(6, 182, 212, 0.7)',
                '0 0 20px rgba(6, 182, 212, 0.5)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap className="w-6 h-6 text-white" />
          </motion.div>
          <h2 className="text-xl text-white">AI Tutor</h2>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item, idx) => {
            const isActive = currentScreen === item.screen;
            return (
              <motion.button
                key={idx}
                onClick={() => onNavigate(item.screen)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                  ? 'bg-[#06B6D4]/20 glow-cyan border border-[#06B6D4]'
                  : 'hover:bg-[#1E1B4B]'
                  }`}
                whileHover={{ x: 5 }}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-[#06B6D4]' : 'text-gray-400'}`} />
                <span className={isActive ? 'text-[#06B6D4]' : 'text-gray-400'}>{item.label}</span>
              </motion.button>
            );
          })}
        </nav>

        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#1E1B4B] hover:text-[#F472B6] transition-all mt-auto"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Bar - Fixed */}
        <header className="bg-[#312E81] border-b border-[#06B6D4]/20 p-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h1 className="text-xl lg:text-2xl text-white">Hello, {userName}! ⚡️</h1>
            <motion.button
              onClick={onShowProfile}
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#F472B6] p-0.5"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full h-full rounded-full bg-[#312E81] flex items-center justify-center">
                  <User className="w-5 h-5 text-[#FBBF24]" />
                </div>
              </motion.div>
              {userType === 'premium' ? (
                <div className="hidden lg:flex items-center gap-1 px-3 py-1 bg-[#FBBF24] rounded-full glow-yellow">
                  <Zap className="w-3 h-3 text-[#1E1B4B]" />
                  <span className="text-xs text-[#1E1B4B]">Premium</span>
                </div>
              ) : (
                <div className="hidden lg:block px-3 py-1 bg-gray-600 rounded-full text-xs text-gray-300">
                  Free
                </div>
              )}
            </motion.button>
          </div>
        </header>

        {/* Content Area - Scrollable */}
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#312E81] border-t border-[#06B6D4]/20 p-2 z-30">
        <div className="flex items-center justify-around">
          {navItems.map((item, idx) => {
            const isActive = currentScreen === item.screen;
            return (
              <motion.button
                key={idx}
                onClick={() => onNavigate(item.screen)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${isActive ? 'text-[#06B6D4]' : 'text-gray-400'
                  }`}
                whileTap={{ scale: 0.9 }}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'glow-cyan' : ''}`} />
                <span className="text-xs">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#06B6D4] rounded-t-full glow-cyan"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
