import { useEffect, useState } from 'react';
import { useStory } from './hooks/useStory';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { StorySetup } from './components/StorySetup';
import { StoryExperience } from './components/StoryExperience';
import { FullStoryView } from './components/FullStoryView';
import { ConfirmationModal } from './components/ConfirmationModal';

// Autopilot elements
import { AutopilotPage } from './pages/AutopilotPage';
import { AutopilotStoryPage } from './pages/AutopilotStoryPage';
import { WhileYouWereAway } from './components/autopilot/WhileYouWereAway';
import { getLastVisitTimestamp, updateLastVisitTimestamp } from './utils/lastVisit';
import { fetchStories } from './services/autopilotApi';

export function App() {
  const {
    viewStage,
    setViewStage,
    storyState,
    isGenerating,
    loadingMessage,
    error,
    showNewStoryConfirm,
    createStory,
    selectChoice,
    retryLastAction,
    requestNewStory,
    confirmNewStory,
    cancelNewStory,
    restartSameConfig,
    restoreSavedStory,
  } = useStory();

  const [selectedAutopilotStoryId, setSelectedAutopilotStoryId] = useState<string | null>(null);
  const [awayStoriesCount, setAwayStoriesCount] = useState<number>(0);
  const [showAwayModal, setShowAwayModal] = useState<boolean>(false);

  // Setup navigation hook globally for Header access
  useEffect(() => {
    (window as any).__onNavigateAutopilot = () => {
      setViewStage('autopilot');
    };
    return () => {
      delete (window as any).__onNavigateAutopilot;
    };
  }, [setViewStage]);

  // While You Were Away logic on mount
  useEffect(() => {
    async function checkAwayStories() {
      const lastVisit = getLastVisitTimestamp();
      if (!lastVisit) {
        // First visit behaviour: Do not show the modal, but update visit timestamp
        updateLastVisitTimestamp();
        return;
      }

      try {
        const stories = await fetchStories(50);
        const lastVisitDate = new Date(lastVisit);
        const newStories = stories.filter(story => new Date(story.generatedAt) > lastVisitDate);

        if (newStories.length > 0) {
          setAwayStoriesCount(newStories.length);
          setShowAwayModal(true);
        }
      } catch (err) {
        console.error('Failed to calculate away stories:', err);
      } finally {
        updateLastVisitTimestamp();
      }
    }

    checkAwayStories();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0d14] text-slate-100 selection:bg-purple-600 selection:text-white">
      {/* Top Header Navigation */}
      <Header
        viewStage={viewStage}
        storyState={storyState}
        onRequestNewStory={requestNewStory}
        onGoToLanding={() => setViewStage('landing')}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {viewStage === 'landing' && (
          <LandingPage
            onStartAdventure={() => setViewStage('setup')}
            savedStoryExists={Boolean(storyState && storyState.chapters.length > 0)}
            onContinueSavedStory={restoreSavedStory}
          />
        )}

        {viewStage === 'setup' && (
          <StorySetup onStartStory={createStory} isGenerating={isGenerating} />
        )}

        {viewStage === 'story' && storyState && (
          <StoryExperience
            storyState={storyState}
            isGenerating={isGenerating}
            loadingMessage={loadingMessage}
            error={error}
            onSelectChoice={selectChoice}
            onRetry={retryLastAction}
            onViewFullStory={() => setViewStage('fullStory')}
            onRestartSameConfig={restartSameConfig}
            onRequestNewStory={requestNewStory}
          />
        )}

        {viewStage === 'fullStory' && storyState && (
          <FullStoryView
            storyState={storyState}
            onBackToStory={() => setViewStage('story')}
            onRestartSameConfig={restartSameConfig}
            onRequestNewStory={requestNewStory}
          />
        )}

        {viewStage === 'autopilot' && (
          <AutopilotPage
            onReadStory={(id) => {
              setSelectedAutopilotStoryId(id);
              setViewStage('autopilotStory');
            }}
          />
        )}

        {viewStage === 'autopilotStory' && selectedAutopilotStoryId && (
          <AutopilotStoryPage
            storyId={selectedAutopilotStoryId}
            onBack={() => setViewStage('autopilot')}
          />
        )}
      </main>

      {/* Bottom Footer */}
      <Footer />

      {/* Modals */}
      <ConfirmationModal
        isOpen={showNewStoryConfirm}
        onConfirm={confirmNewStory}
        onCancel={cancelNewStory}
      />

      {/* While You Were Away Notification */}
      {showAwayModal && (
        <WhileYouWereAway
          count={awayStoriesCount}
          onExplore={() => {
            setShowAwayModal(false);
            setViewStage('autopilot');
          }}
          onClose={() => setShowAwayModal(false)}
        />
      )}
    </div>
  );
}

export default App;
