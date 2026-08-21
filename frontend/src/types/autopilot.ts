export interface AutopilotStatus {
  status: 'ACTIVE' | 'INACTIVE';
  lastGeneratedAt: string | null;
  totalAutonomousStories: number;
  schedule: string;
}
