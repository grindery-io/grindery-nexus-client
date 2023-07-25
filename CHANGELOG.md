# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.9.17] - 2022-07-25

### Added

- `source` property to some methods, for events tracking purposes.

## [0.9.16] - 2022-07-19

### Updated

- Default `choices` added for `_grinderyChain` field for all kinds of operations.

## [0.9.15] - 2022-07-14

### Fixed

- Updated CDS and Chains domain

## [0.9.14] - 2022-03-07

### Added

- Added `getUserProps`, `updateUserProps` and `requestEngine` methods.

## [0.9.13] - 2022-02-23

### Updated

- Added `access` argument to `listDrivers` method, to filter drivers by access level.

## [0.9.12] - 2022-01-24

### Added

- `getUserEmail` method, to get user's email address

### Fixed

- `sendEngineRequest` response when returned value is falsy

## [0.9.11] - 2022-01-23

### Added

- `updateUserEmail` method, to update user's email address
- `deleteUser` method, to delete user's account

## [0.9.10] - 2022-01-11

### Added

- `isUserHasEmail` method, to check if authenticated user provided an email address

## [0.9.8] - 2022-12-08

### Updated

- Added `app` argument to `requestEarlyAccess` method.

## [0.9.7] - 2022-12-07

### Updated

- `isAllowedUser` method now can check user access per app.

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
