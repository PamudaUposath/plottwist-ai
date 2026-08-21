# PlotTwist Autopilot Deployment Guide

This document outlines the steps to build, validate, and deploy **PlotTwist Autopilot** to AWS.

## Prerequisites

1. **AWS CLI & SAM CLI**: Installed and configured with appropriate execution credentials.
2. **Node.js**: Version 20.x or newer.
3. **Bedrock Model Access**: Ensure model access is enabled for Amazon Nova (e.g. `us.amazon.nova-lite-v1:0` or equivalent) in the active deployment region (e.g. `us-east-1`).

## Backend & Infrastructure Deployment

1. **Build and Validate Backend Package**:
   ```bash
   cd agent
   npm install
   npm run test
   npm run build
   ```

2. **Validate and Build SAM Infrastructure**:
   ```bash
   cd ../infrastructure
   sam validate
   sam build
   ```

3. **Deploy using SAM**:
   ```bash
   sam deploy --guided --stack-name plottwist-autopilot-challenge
   ```
   Specify parameters:
   - `Environment`: `challenge`
   - `BedrockModelId`: `us.amazon.nova-lite-v1:0`
   - `AgentTimezone`: `Asia/Colombo`
   - `StorySchedule`: `rate(3 hours)` (or `rate(15 minutes)` for test validation)
   - `AllowedOrigin`: Provide the target frontend web deployment URL or default `*`/`http://localhost:5173`.

4. **Verify Outputs**:
   Obtain the API Endpoint URL from the console output (e.g., `AutopilotApiUrl`).

## Frontend Integration

1. Create a **SEPARATE** AWS Amplify application connected to the repository:
   - **Repository**: `PamudaUposath/plottwist-ai`
   - **Branch**: `weekend-creative-challenge`
   - **App root**: `frontend`

2. Set the Environment Variable in Amplify:
   - Key: `VITE_AUTOPILOT_API_URL`
   - Value: `<The AutopilotApiUrl output from SAM deployment>`

3. Deploy/Build the branch in Amplify.

## Cleanup

To completely remove all deployed Autopilot challenge resources, execute:
```bash
sam delete --stack-name plottwist-autopilot-challenge
```

> [!WARNING]
> Never delete or modify the existing production PlotTwist Amplify application or any unrelated AWS resources.
