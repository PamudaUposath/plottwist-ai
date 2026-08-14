import { useStory } from './hooks/useStory';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { StorySetup } from './components/StorySetup';
import { StoryExperience } from './components/StoryExperience';
import { FullStoryView } from './components/FullStoryView';
import { ConfirmationModal } from './components/ConfirmationModal';

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
      </main>

      {/* Bottom Footer */}
      <Footer />

      {/* Modals */}
      <ConfirmationModal
        isOpen={showNewStoryConfirm}
        onConfirm={confirmNewStory}
        onCancel={cancelNewStory}
      />
    </div>
  );
}

export default App;
