# Release Checklist

## Code quality

- [ ] Type checks pass.
- [ ] Unit tests pass.
- [ ] Integration tests pass.
- [ ] Mobile build succeeds.
- [ ] API container builds.

## Product quality

- [ ] Main user flows tested.
- [ ] Empty/loading/error states tested.
- [ ] English and Turkish copy reviewed.
- [ ] Accessibility smoke test completed.

## Tax/compliance

- [ ] Tax rule changes reviewed.
- [ ] Rule version updated where needed.
- [ ] Audit logging verified.
- [ ] High-risk assistant escalation tested.
- [ ] Accountant pack export remains gated behind explicit user confirmation.

## Security/privacy

- [ ] No secrets committed.
- [ ] Logs checked for PII leakage.
- [ ] Auth and authorisation smoke tests pass.
- [ ] Document access is private.

## Release operations

- [ ] Database migrations reviewed.
- [ ] Rollback plan documented.
- [ ] Monitoring dashboards checked.
- [ ] Error alerting enabled.
