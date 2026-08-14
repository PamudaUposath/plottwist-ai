import React, { useState } from 'react';
import {
  Crown,
  Rocket,
  Search,
  Compass,
  Ghost,
  Laugh,
  User,
  Sparkles,
  MapPin,
  Clock,
  Zap,
  CheckCircle2,
  Wand2,
} from 'lucide-react';
import { StoryConfig, PlotTwistLevel } from '../types/story';

interface StorySetupProps {
  onStartStory: (config: StoryConfig) => void;
  isGenerating: boolean;
}

const GENRES = [
  { id: 'Fantasy', name: 'Fantasy', description: 'Magic, ancient kingdoms and impossible quests.', icon: Crown },
  { id: 'Science Fiction', name: 'Science Fiction', description: 'Strange worlds, future technology and the unknown.', icon: Rocket },
  { id: 'Mystery', name: 'Mystery', description: 'Secrets, clues and unexpected discoveries.', icon: Search },
  { id: 'Adventure', name: 'Adventure', description: 'Dangerous journeys and bold decisions.', icon: Compass },
  { id: 'Horror', name: 'Horror', description: 'Dark places, strange events and difficult choices.', icon: Ghost },
  { id: 'Comedy', name: 'Comedy', description: 'Chaos, ridiculous situations and unexpected fun.', icon: Laugh },
];

const SETTINGS = [
  'Enchanted Forest',
  'Abandoned Space Station',
  'Cyberpunk City',
  'Ancient Kingdom',
  'Remote Island',
  'Haunted Mansion',
  'Underwater World',
  'University Campus',
];

export const StorySetup: React.FC<StorySetupProps> = ({ onStartStory, isGenerating }) => {
  const [genre, setGenre] = useState<string>('Science Fiction');
  const [characterOption, setCharacterOption] = useState<'create' | 'surprise'>('create');
  const [characterName, setCharacterName] = useState<string>('Alex');
  const [characterDescription, setCharacterDescription] = useState<string>(
    'A curious university student who loves technology but always gets into trouble.'
  );

  const [selectedSetting, setSelectedSetting] = useState<string>('Abandoned Space Station');
  const [customSetting, setCustomSetting] = useState<string>('');
  const [isCustomSetting, setIsCustomSetting] = useState<boolean>(false);

  const [totalChapters, setTotalChapters] = useState<number>(5); // Default 5 chapters
  const [plotTwistLevel, setPlotTwistLevel] = useState<PlotTwistLevel>('Unexpected');

  // Input Validation
  const isCharacterValid =
    characterOption === 'surprise' ||
    (characterName.trim().length >= 1 &&
      characterName.length <= 40 &&
      characterDescription.trim().length >= 5 &&
      characterDescription.length <= 250);

  const finalSetting = isCustomSetting ? customSetting.trim() : selectedSetting;
  const isSettingValid = finalSetting.length >= 1 && finalSetting.length <= 120;

  const isFormValid = genre.length > 0 && isCharacterValid && isSettingValid && !isGenerating;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    const config: StoryConfig = {
      genre,
      characterName: characterOption === 'create' ? characterName.trim() : undefined,
      characterDescription: characterOption === 'create' ? characterDescription.trim() : undefined,
      setting: finalSetting,
      totalChapters,
      plotTwistLevel,
    };

    onStartStory(config);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12 animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight">
          Create Your Story
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-light">
          Give PlotTwist a few ingredients. We&apos;ll take care of the unexpected part.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Section 1: Genre Selection */}
        <section className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800">
          <div className="flex items-center gap-2 mb-6 text-purple-400 font-heading font-semibold text-lg">
            <Sparkles className="h-5 w-5" />
            <span>1. Choose Genre</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {GENRES.map((g) => {
              const IconComponent = g.icon;
              const isSelected = genre === g.id;
              return (
                <button
                  type="button"
                  key={g.id}
                  onClick={() => setGenre(g.id)}
                  className={`group relative flex flex-col items-start p-4 rounded-xl border text-left transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                    isSelected
                      ? 'border-purple-500 bg-purple-950/40 shadow-lg shadow-purple-950/40 ring-1 ring-purple-500'
                      : 'border-slate-800/80 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <div
                      className={`p-2.5 rounded-lg transition-colors ${
                        isSelected ? 'bg-purple-600 text-white' : 'bg-slate-800 text-purple-300'
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </div>
                    {isSelected && <CheckCircle2 className="h-5 w-5 text-purple-400" />}
                  </div>
                  <h4 className="font-semibold text-white text-base mb-1">{g.name}</h4>
                  <p className="text-xs text-slate-400 leading-snug">{g.description}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Section 2: Main Character */}
        <section className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800">
          <div className="flex items-center gap-2 mb-6 text-purple-400 font-heading font-semibold text-lg">
            <User className="h-5 w-5" />
            <span>2. Main Character</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              type="button"
              onClick={() => setCharacterOption('create')}
              className={`flex-1 p-4 rounded-xl border text-left transition-all ${
                characterOption === 'create'
                  ? 'border-purple-500 bg-purple-950/40 text-white ring-1 ring-purple-500'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="font-semibold mb-1">Option A: Create My Own</div>
              <div className="text-xs opacity-80">Define your protagonist&apos;s name and traits.</div>
            </button>

            <button
              type="button"
              onClick={() => setCharacterOption('surprise')}
              className={`flex-1 p-4 rounded-xl border text-left transition-all ${
                characterOption === 'surprise'
                  ? 'border-purple-500 bg-purple-950/40 text-white ring-1 ring-purple-500'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="font-semibold mb-1">Option B: Surprise Me</div>
              <div className="text-xs opacity-80">Story engine will invent a suitable hero.</div>
            </button>
          </div>

          {characterOption === 'create' && (
            <div className="space-y-4 pt-2 border-t border-slate-800/80 animate-fade-in">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Character Name (1 to 40 chars)
                </label>
                <input
                  type="text"
                  maxLength={40}
                  value={characterName}
                  onChange={(e) => setCharacterName(e.target.value)}
                  placeholder="e.g. Alex"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Describe Your Character (5 to 250 chars)
                </label>
                <textarea
                  rows={3}
                  maxLength={250}
                  value={characterDescription}
                  onChange={(e) => setCharacterDescription(e.target.value)}
                  placeholder="e.g. A curious university student who loves technology but always gets into trouble."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                <div className="mt-1 text-right text-[11px] text-slate-500">
                  {characterDescription.length} / 250
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Section 3: Setting */}
        <section className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800">
          <div className="flex items-center gap-2 mb-6 text-purple-400 font-heading font-semibold text-lg">
            <MapPin className="h-5 w-5" />
            <span>3. Setting</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {SETTINGS.map((s) => {
              const isSelected = !isCustomSetting && selectedSetting === s;
              return (
                <button
                  type="button"
                  key={s}
                  onClick={() => {
                    setSelectedSetting(s);
                    setIsCustomSetting(false);
                  }}
                  className={`p-3 rounded-xl border text-xs font-medium text-center transition-all ${
                    isSelected
                      ? 'border-purple-500 bg-purple-950/50 text-purple-200 ring-1 ring-purple-500'
                      : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setIsCustomSetting(!isCustomSetting)}
              className={`text-xs font-semibold underline underline-offset-4 transition-colors ${
                isCustomSetting ? 'text-purple-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isCustomSetting ? 'Use Predefined Settings' : '+ Custom Setting'}
            </button>

            {isCustomSetting && (
              <div className="mt-3 animate-fade-in">
                <input
                  type="text"
                  maxLength={120}
                  value={customSetting}
                  onChange={(e) => setCustomSetting(e.target.value)}
                  placeholder="Enter custom setting (max 120 characters)..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
            )}
          </div>
        </section>

        {/* Section 4: Story Length & Plot Twist Level */}
        <section className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4 text-purple-400 font-heading font-semibold text-lg">
                <Clock className="h-5 w-5" />
                <span>4. Story Length</span>
              </div>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setTotalChapters(3)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    totalChapters === 3
                      ? 'border-purple-500 bg-purple-950/40 text-white ring-1 ring-purple-500'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold text-sm">Quick Adventure (3 Chapters)</div>
                  <div className="text-xs opacity-75 mt-0.5">A short adventure with fast decisions.</div>
                </button>

                <button
                  type="button"
                  onClick={() => setTotalChapters(5)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    totalChapters === 5
                      ? 'border-purple-500 bg-purple-950/40 text-white ring-1 ring-purple-500'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold text-sm">Standard Adventure (5 Chapters - Recommended)</div>
                  <div className="text-xs opacity-75 mt-0.5">A complete story with room for twists.</div>
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4 text-purple-400 font-heading font-semibold text-lg">
                <Zap className="h-5 w-5" />
                <span>Plot Twist Intensity</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['Gentle', 'Unexpected', 'Chaotic'] as PlotTwistLevel[]).map((level) => (
                  <button
                    type="button"
                    key={level}
                    onClick={() => setPlotTwistLevel(level)}
                    className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                      plotTwistLevel === level
                        ? 'border-purple-500 bg-purple-950/50 text-purple-200 ring-1 ring-purple-500'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-400">
                Determines how dramatically the story engine introduces narrative shifts.
              </p>
            </div>
          </div>
        </section>

        {/* Start Button */}
        <div className="text-center pt-4">
          <button
            type="submit"
            disabled={!isFormValid}
            className={`group inline-flex items-center justify-center gap-3 rounded-xl px-10 py-5 text-lg font-bold text-white shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 ${
              isFormValid
                ? 'bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 shadow-purple-950/60 hover:from-purple-500 hover:to-pink-500 hover:shadow-purple-900/80 active:scale-98'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            <Wand2 className="h-6 w-6 text-amber-300 group-hover:rotate-12 transition-transform" />
            <span>Begin My Story</span>
          </button>
        </div>
      </form>
    </div>
  );
};
