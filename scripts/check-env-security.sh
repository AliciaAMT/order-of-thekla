#!/bin/bash

# Security Check Script for Environment Files
# This script verifies that real environment files are not being committed

echo "🔒 Checking environment file security..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if real env files are tracked by git
ENV_FILES=(
  "src/environments/environment.ts"
  "src/environments/environment.prod.ts"
  "src/environments/environment.staging.ts"
  "src/environments/environment.prod.staging.ts"
)

ERRORS=0

for file in "${ENV_FILES[@]}"; do
  if git ls-files --error-unmatch "$file" > /dev/null 2>&1; then
    echo -e "${RED}❌ ERROR: $file is tracked by git!${NC}"
    echo -e "${YELLOW}   This file contains secrets and should NOT be committed.${NC}"
    echo -e "${YELLOW}   Run: git rm --cached $file${NC}"
    ERRORS=$((ERRORS + 1))
  else
    echo -e "${GREEN}✓ $file is properly ignored${NC}"
  fi
done

# Check if example files exist
if [ -f "src/environments/environment.example.ts" ] && [ -f "src/environments/environment.prod.example.ts" ]; then
  echo -e "${GREEN}✓ Example/template files are present${NC}"
else
  echo -e "${YELLOW}⚠ Warning: Example files may be missing${NC}"
fi

if [ $ERRORS -eq 0 ]; then
  echo -e "\n${GREEN}✅ All environment files are properly secured!${NC}"
  exit 0
else
  echo -e "\n${RED}❌ Security check failed! Please fix the issues above.${NC}"
  exit 1
fi







