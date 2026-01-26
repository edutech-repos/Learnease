import { useState } from 'react';
import { Authentication } from './components/Authentication';
import { DashboardPremium } from './components/DashboardPremium';
import { DashboardFree } from './components/DashboardFree';
import { MyLessons } from './components/MyLessons';
import { History } from './components/History';
import { Settings } from './components/Settings';
import { ProfileOverlay } from './components/ProfileOverlay';

type Screen = 'auth' | 'dashboard' | 'lessons' | 'history' | 'settings';
type UserType = 'premium' | 'free' | null;

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('auth');
  const [userType, setUserType] = useState<UserType>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [userName, setUserName] = useState('');

  const handleLogin = (email: string) => {
    if (email === 'premium@spark.com') {
      setUserType('premium');
      setUserName('Alex Chen');
    } else {
      setUserType('free');
      setUserName('Jordan Smith');
    }
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setUserType(null);
    setUserName('');
    setCurrentScreen('auth');
    setShowProfile(false);
  };

  return (
    <div className="min-h-screen">
      {currentScreen === 'auth' && (
        <Authentication onLogin={handleLogin} />
      )}

      {currentScreen === 'dashboard' && userType === 'premium' && (
        <DashboardPremium 
          userName={userName}
          onNavigate={setCurrentScreen}
          onShowProfile={() => setShowProfile(true)}
          onLogout={handleLogout}
        />
      )}

      {currentScreen === 'dashboard' && userType === 'free' && (
        <DashboardFree 
          userName={userName}
          onNavigate={setCurrentScreen}
          onShowProfile={() => setShowProfile(true)}
          onLogout={handleLogout}
        />
      )}

      {currentScreen === 'lessons' && (
        <MyLessons 
          onNavigate={setCurrentScreen}
          onShowProfile={() => setShowProfile(true)}
          onLogout={handleLogout}
          userName={userName}
          userType={userType}
        />
      )}

      {currentScreen === 'history' && (
        <History 
          onNavigate={setCurrentScreen}
          onShowProfile={() => setShowProfile(true)}
          onLogout={handleLogout}
          userName={userName}
          userType={userType}
        />
      )}

      {currentScreen === 'settings' && (
        <Settings 
          onNavigate={setCurrentScreen}
          onShowProfile={() => setShowProfile(true)}
          onLogout={handleLogout}
          userName={userName}
          userType={userType}
        />
      )}

      {showProfile && (
        <ProfileOverlay 
          userName={userName}
          userType={userType}
          onClose={() => setShowProfile(false)}
        />
      )}
    </div>
  );
}
