import { useState } from 'react';
import { Authentication } from './components/Authentication';
import { DashboardPremium } from './components/DashboardPremium';
import { DashboardFree } from './components/DashboardFree';
import { MyLessons } from './components/MyLessons';
import { History } from './components/History';
import { Settings } from './components/Settings';
import { ProfileOverlay } from './components/ProfileOverlay';
import { ContentReview } from './components/ContentReview';
import { QuizInterface } from './components/QuizInterface';
import { ComparisonCards } from './components/ComparisonCards';
import { TrendingTopicView } from './components/TrendingTopicView';

type Screen = 'auth' | 'dashboard' | 'lessons' | 'history' | 'settings' | 'content-review' | 'quiz' | 'comparison' | 'trending-topic';
type UserType = 'premium' | 'free' | null;

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('auth');
  const [userType, setUserType] = useState<UserType>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [userName, setUserName] = useState('');
  const [currentLessonId, setCurrentLessonId] = useState<number | null>(null);
  const [selectedTrendingTopic, setSelectedTrendingTopic] = useState<any>(null);

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
    setCurrentLessonId(null);
  };

  const handleViewLesson = (lessonId: number) => {
    setCurrentLessonId(lessonId);
    setCurrentScreen('content-review');
  };

  const handleStartQuiz = (lessonId: number) => {
    setCurrentLessonId(lessonId);
    setCurrentScreen('quiz');
  };

  const handleQuizComplete = () => {
    setCurrentScreen('lessons');
    setCurrentLessonId(null);
  };

  const handleIgniteLesson = () => {
    // Navigate to content review with a mock lesson ID
    setCurrentLessonId(1);
    setCurrentScreen('content-review');
  };

  const handleShowComparison = () => {
    setCurrentScreen('comparison');
  };

  const handleShowTrendingTopic = (topic: any) => {
    setSelectedTrendingTopic(topic);
    setCurrentScreen('trending-topic');
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
          onIgniteLesson={handleIgniteLesson}
          onShowComparison={handleShowComparison}
        />
      )}

      {currentScreen === 'dashboard' && userType === 'free' && (
        <DashboardFree 
          userName={userName}
          onNavigate={setCurrentScreen}
          onShowProfile={() => setShowProfile(true)}
          onLogout={handleLogout}
          onIgniteLesson={handleIgniteLesson}
          onShowComparison={handleShowComparison}
          onViewTrendingTopic={handleShowTrendingTopic}
        />
      )}

      {currentScreen === 'lessons' && (
        <MyLessons 
          onNavigate={setCurrentScreen}
          onShowProfile={() => setShowProfile(true)}
          onLogout={handleLogout}
          userName={userName}
          userType={userType}
          onViewLesson={handleViewLesson}
          onStartQuiz={handleStartQuiz}
        />
      )}

      {currentScreen === 'content-review' && currentLessonId && (
        <ContentReview
          lessonId={currentLessonId}
          onBack={() => {
            setCurrentScreen('lessons');
            setCurrentLessonId(null);
          }}
          onStartQuiz={() => handleStartQuiz(currentLessonId)}
        />
      )}

      {currentScreen === 'quiz' && currentLessonId && (
        <QuizInterface
          lessonId={currentLessonId}
          onBack={() => setCurrentScreen('lessons')}
          onComplete={handleQuizComplete}
        />
      )}

      {currentScreen === 'comparison' && (
        <ComparisonCards
          onClose={() => setCurrentScreen('dashboard')}
          onUpgrade={() => {
            // Handle upgrade action
            alert('Upgrade functionality would be implemented here');
          }}
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

      {showProfile && userType && (
        <ProfileOverlay 
          userName={userName}
          userType={userType}
          onClose={() => setShowProfile(false)}
          onShowComparison={handleShowComparison}
        />
      )}

      {currentScreen === 'trending-topic' && (
        <TrendingTopicView
          topic={selectedTrendingTopic}
          onClose={() => setCurrentScreen('dashboard')}
        />
      )}
    </div>
  );
}