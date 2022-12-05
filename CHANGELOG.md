# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.9.6] - 2022-12-05

### Updated

- Filtering drivers by access type

## [0.9.5] - 2022-12-01

### Added

- Hidden actions/triggers will no longer be returned by getDriver and listDrivers methods

## [0.9.4] - 2022-11-30

### Fixed

- getDriver enriched response

## [0.9.3] - 2022-11-29

### Updated

- Added enrichment to getDriver method

## [0.9.2] - 2022-11-28

### Updated

- Source argument added to the early access request method

## [0.9.1] - 2022-11-24

### Added

- A method to get a list of supported blockchains

## [0.9.0] - 2022-11-23

### Added

- A method to run a single action

## [0.8.1] - 2022-11-23

### Updated

- Added notification token to user notification state saving method

## [0.8.0] - 2022-11-18

### Added

- Save user notification state method

## [0.7.0] - 2022-10-07

### Added

- Credential manager methods

## [0.6.1] - 2022-09-09

### Fixed

- Allow `workspaceKey` to be an empty string in `moveWorkflowtoWorkspace` method

## [0.6.0] - 2022-09-08

### Added

- Workspaces API methods

## [0.5.0] - 2022-09-05

### Added

- Workspace param to `createWorkflow` and `listWorkflows` methods
- Method to get drivers index
- Method to get single driver CDS

### Removed

- `userAccountID` requirement from all methods

## [0.4.1] - 2022-08-31

### Fixed

- Missing access token in some requests

## [0.4.0] - 2022-08-31

### Added

- Environment param to `testAction`, `callInputProvider` and `callWebhook` methods.
