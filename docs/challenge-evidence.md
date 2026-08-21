# PlotTwist Autopilot Challenge Evidence Guide

To prove that PlotTwist Autopilot runs autonomously and creates real scheduled stories, capture the following screenshots/logs from the AWS Console and deploy.

## Screenshot Checklist

### 1. Amazon EventBridge Scheduler
- **Location**: AWS Console -> Amazon EventBridge -> Schedule
- **Proof**: Verify the schedule named `plottwist-autopilot-scheduler-challenge` is **Enabled**, configured with the target execution rate expression (e.g. `rate(3 hours)`), pointing to the `plottwist-autopilot-generator-challenge` Lambda function target.

### 2. AWS Lambda Generator
- **Location**: AWS Console -> AWS Lambda -> Functions -> `plottwist-autopilot-generator-challenge`
- **Proof**: Show the Lambda configuration panel, its trigger mapping (EventBridge Scheduler), and general performance properties.

### 3. CloudWatch Auditable Logs
- **Location**: AWS Console -> CloudWatch -> Log Groups -> `/aws/lambda/plottwist-autopilot-generator-challenge`
- **Proof**: Display log lines containing the lifecycle logging sequence:
  - `AUTONOMOUS_GENERATION_STARTED`
  - `CREATIVE_BRIEF_CREATED`
  - `BEDROCK_GENERATION_STARTED`
  - `BEDROCK_GENERATION_SUCCESS`
  - `STORY_VALIDATION_SUCCESS`
  - `STORY_SAVED`
  - `AUTONOMOUS_GENERATION_COMPLETED`

### 4. DynamoDB Table Records
- **Location**: AWS Console -> DynamoDB -> Tables -> Explore items in `plottwist-autopilot-stories-challenge`
- **Proof**: Show table explorer displaying multiple story rows generated automatically on different schedule intervals, marked with `generationType = AUTONOMOUS`.

### 5. Frontend Autopilot View
- **Location**: Deployed Web App -> Autopilot Page
- **Proof**: Show the "While You Were Away" hero notification showing the actual new stories count since the user's last session, alongside automatically generated story cards with the "Autopilot Story" badge.

### 6. Agent Status Indicators
- **Location**: Autopilot View
- **Proof**: Shows the live connection statistics fetched from `GET /agent/status` (Active state, total story count, last execution timestamp).
