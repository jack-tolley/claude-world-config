#!/bin/bash

# Fetch PR code review comments (inline comments on specific lines)
#
# Usage:
#   ./get-pr-review-comments.sh [pr_number] [limit]
#
# Arguments:
#   pr_number - PR number (auto-detected from current branch if omitted)
#   limit     - Max comments to retrieve (default: 100)
#
# Output:
#   JSON array of comments with id, body, author, path, line, in_reply_to_id

set -e

# Get repo info
REPO=$(gh repo view --json nameWithOwner --jq .nameWithOwner 2>/dev/null)

if [ -z "$REPO" ]; then
  echo "Error: Not in a GitHub repository" >&2
  exit 1
fi

# Get PR number (from arg or detect from branch)
PR_NUM="${1:-$(gh pr view --json number --jq .number 2>/dev/null)}"

if [ -z "$PR_NUM" ]; then
  echo "Error: Could not determine PR number. Provide as argument or ensure branch has an open PR." >&2
  exit 1
fi

LIMIT="${2:-100}"

# Fetch review comments
gh api "repos/$REPO/pulls/$PR_NUM/comments?per_page=$LIMIT" \
  --jq '.[] | {
    id: .id,
    body: .body,
    author: .user.login,
    path: .path,
    line: (.line // .original_line),
    in_reply_to_id: .in_reply_to_id,
    created_at: .created_at
  }'
