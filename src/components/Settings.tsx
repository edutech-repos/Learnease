import { motion } from 'motion/react';
import { Moon, Volume2, Mail, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';
import { useState } from 'react';
import { NavigationLayout } from './NavigationLayout';

interface SettingsProps {
  userName: string;
  userType: 'premium' | 'free' | null;
  onNavigate: (screen: any) => void;
  onShowProfile: () => void;
  onLogout: () => void;
}

export function Settings({ userName, userType, onNavigate, onShowProfile, onLogout }: SettingsProps) {
  const [darkMode, setDarkMode] = useState(true);
  const [soundEffects, setSoundEffects] = useState(false);
  const [emailDigests, setEmailDigests] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const ToggleSwitch = ({ 
    enabled, 
    onChange,
    color = '#06B6D4'
  }: { 
    enabled: boolean; 
    onChange: (value: boolean) => void;
    color?: string;
  }) => (
    <motion.button
      className={`w-14 h-7 rounded-full p-1 transition-colors ${
        enabled ? 'bg-[#06B6D4]' : 'bg-[#1E1B4B]'
      }`}
      onClick={() => onChange(!enabled)}
      whileTap={{ scale: 0.95 }}
      style={{ backgroundColor: enabled ? color : '#1E1B4B' }}
    >
      <motion.div
        className="w-5 h-5 rounded-full bg-white shadow-lg"
        animate={{ x: enabled ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </motion.button>
  );

  const settingsSections = [
    {
      title: 'Appearance',
      icon: Moon,
      items: [
        {
          label: 'Dark Mode',
          description: 'Use dark theme across the app',
          enabled: darkMode,
          onChange: setDarkMode,
          icon: Moon,
          color: '#06B6D4'
        }
      ]
    },
    {
      title: 'Sound & Notifications',
      icon: Volume2,
      items: [
        {
          label: 'Sound Effects',
          description: 'Play sounds for interactions',
          enabled: soundEffects,
          onChange: setSoundEffects,
          icon: Volume2,
          color: '#F472B6'
        },
        {
          label: 'Push Notifications',
          description: 'Get notified about quiz reminders',
          enabled: notifications,
          onChange: setNotifications,
          icon: Bell,
          color: '#FBBF24'
        },
        {
          label: 'Email Digests',
          description: 'Receive weekly progress reports',
          enabled: emailDigests,
          onChange: setEmailDigests,
          icon: Mail,
          color: '#10B981'
        }
      ]
    }
  ];

  const actionItems = [
    {
      label: 'Privacy & Security',
      description: 'Manage your data and security settings',
      icon: Shield,
      action: () => console.log('Privacy settings')
    },
    {
      label: 'Help & Support',
      description: 'Get help or contact support',
      icon: HelpCircle,
      action: () => console.log('Help center')
    },
    {
      label: 'Logout',
      description: 'Sign out of your account',
      icon: LogOut,
      action: onLogout,
      danger: true
    }
  ];

  return (
    <NavigationLayout
      userName={userName}
      userType={userType}
      currentScreen="settings"
      onNavigate={onNavigate}
      onShowProfile={onShowProfile}
      onLogout={onLogout}
    >
      <div className="p-4 lg:p-8 max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl lg:text-3xl text-white mb-2">Settings ⚙️</h2>
          <p className="text-gray-400 text-sm lg:text-base">
            Customize your learning experience
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingsSections.map((section, sectionIdx) => (
            <motion.div
              key={sectionIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIdx * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#312E81] rounded-lg">
                  <section.icon className="w-5 h-5 text-[#06B6D4]" />
                </div>
                <h3 className="text-xl text-white">{section.title}</h3>
              </div>

              <div className="space-y-3">
                {section.items.map((item, itemIdx) => (
                  <motion.div
                    key={itemIdx}
                    className="bg-[#312E81] rounded-xl p-5 border border-[#06B6D4]/30 hover:border-[#06B6D4] transition-all"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <motion.div
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: `${item.color}20` }}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <item.icon className="w-5 h-5" style={{ color: item.color }} />
                        </motion.div>

                        <div className="flex-1">
                          <h4 className="text-white mb-1">{item.label}</h4>
                          <p className="text-sm text-gray-400">{item.description}</p>
                        </div>
                      </div>

                      <ToggleSwitch
                        enabled={item.enabled}
                        onChange={item.onChange}
                        color={item.color}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Action Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl text-white mb-4">More Options</h3>
            <div className="space-y-3">
              {actionItems.map((item, idx) => (
                <motion.button
                  key={idx}
                  onClick={item.action}
                  className={`w-full bg-[#312E81] rounded-xl p-5 border transition-all text-left ${
                    item.danger
                      ? 'border-[#F472B6]/30 hover:border-[#F472B6]'
                      : 'border-[#06B6D4]/30 hover:border-[#06B6D4]'
                  }`}
                  whileHover={{ x: 5, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="p-2 rounded-lg"
                      style={{
                        backgroundColor: item.danger ? '#F472B620' : '#06B6D420'
                      }}
                      whileHover={{ rotate: item.danger ? 0 : 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon
                        className="w-5 h-5"
                        style={{ color: item.danger ? '#F472B6' : '#06B6D4' }}
                      />
                    </motion.div>

                    <div className="flex-1">
                      <h4 className={item.danger ? 'text-[#F472B6]' : 'text-white'}>
                        {item.label}
                      </h4>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>

                    <motion.div
                      className="text-gray-400"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      →
                    </motion.div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* App Info */}
          <motion.div
            className="bg-[#312E81]/50 rounded-xl p-6 border border-[#312E81] text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-gray-400 text-sm mb-2">AI Tutor v2.0.1</p>
            <p className="text-gray-500 text-xs">
              © 2025 AI Tutor. All rights reserved.
            </p>
            <div className="flex items-center justify-center gap-4 mt-4 text-xs">
              <a href="#" className="text-[#06B6D4] hover:underline">Privacy Policy</a>
              <span className="text-gray-600">•</span>
              <a href="#" className="text-[#06B6D4] hover:underline">Terms of Service</a>
            </div>
          </motion.div>
        </div>
      </div>
    </NavigationLayout>
  );
}
