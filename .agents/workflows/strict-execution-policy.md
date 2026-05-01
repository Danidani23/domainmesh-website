---
description: Strict execution policy — always discuss before touching code
---

# Strict Execution Policy

When working in this repository, the agent must adhere to the following rules:

1. **Discuss First:** Always present the proposed plan, architecture, or code changes to the user for discussion.
2. **Wait for Approval:** Do NOT execute any state-modifying tools (`write_to_file`, `replace_file_content`, `run_command`, etc.) until the user has explicitly given permission (e.g., "go ahead", "execute", "do it").
3. **Explicit Execution:** The user will specifically tell the agent when it is time to execute and touch the codebase. Until then, stay in PLANNING mode or simply converse.
