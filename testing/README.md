# Testing

## Structure

| Directory | Purpose |
|-----------|---------|
| `api/` | API endpoint tests |
| `integration/` | Cross-service integration tests |
| `e2e/` | End-to-end user flow tests |
| `security/` | Security and penetration tests |

## Running Tests

```bash
# Backend unit tests
cd backend && npm test

# AI service tests
cd ai-service && python -m pytest
```

Testing frameworks and detailed test plans will be established in future phases.
