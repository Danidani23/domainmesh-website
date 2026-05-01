---
description: Standardized system for Git operations and commit messages
---

# Git Workflow

## Execution Rules

- **Read-only commands**: You as an AI agent **should** run read-only Git commands directly to gather context. This includes: `git status`, `git diff`, `git log`, `git branch`, `git show`, `git stash list`, etc.
- **Mutating commands**: You must **NEVER** execute any mutating Git commands directly. Always print the exact commands for the user to copy and paste. This includes: `git add`, `git commit`, `git push`, `git pull`, `git merge`, `git rebase`, `git reset`, `git stash`, `git checkout`, `git switch`, etc.

## Branch Promotion Rules

> ⚠️ **Using the wrong merge method will break the branch history and block future deployments.**

Our branching model is `dev` → `stage` → `main`. Each transition has a **specific required merge method**:

| Transition | Method | Command / Tool |
|---|---|---|
| `dev → stage` | **Squash merge** (via GitHub PR or CLI) | `task promote-to-stage` |
| `stage → main` | **Fast-forward only** (CLI only) | `task promote-to-prod` |

### ⛔ NEVER merge `stage → main` via a GitHub Pull Request

GitHub PRs always create new commits (merge commit or squash), which produces duplicate commit SHAs and breaks the linear history. The `stage → main` promotion **must** be a fast-forward merge done from the CLI.

If a user mentions merging to `main` or creating a PR targeting `main`, **always warn them**:

> Use `task promote-to-prod` from the CLI. Do NOT create a GitHub PR for stage → main.

## Commit Message Format

We strictly adhere to the **Conventional Commits** specification.

```
<type>(<optional scope>): <description>

[optional body]

[optional footer(s)]
```

### Allowed Types

- **`feat`**: A new feature (e.g., adding a new page, a new API endpoint, or a new component).
- **`fix`**: A bug fix (e.g., fixing a broken layout, resolving an API error).
- **`docs`**: Documentation only changes (e.g., updating `README.md`).
- **`style`**: Changes that do not affect the meaning of the code (white-space, formatting, linting).
- **`refactor`**: A code change that neither fixes a bug nor adds a feature.
- **`perf`**: A code change that improves performance.
- **`test`**: Adding missing tests or correcting existing tests.
- **`build`**: Changes that affect the build system or external dependencies.
- **`chore`**: Other changes that don't modify `src` or test files.

### Scope (Optional but Recommended)

The scope provides context for where the change was made. It should be a short noun.
- `feat(auth): add JWT validation`
- `fix(navbar): correct mobile menu toggle`
- `build(ci): update deployment workflow`

### Subject Line (Description)

- Use the imperative, present tense: "change" not "changed" nor "changes".
- Do not capitalize the first letter (unless it's a proper noun).
- No dot (`.`) at the end.

### Rules for the Agent

- **Always** review the `git diff` before writing the commit message.
- If a single commit contains multiple types of changes, either:
  - Strongly prefer splitting them into separate commits.
  - If they must be combined, use the most significant type and detail the rest in the body.

### Examples

**Good:**
```
feat(i18n): add french language support
```
```
fix(api): resolve nil pointer in email sender
```

**Bad:**
```
Fixed the api bug
```
```
misc changes
```
