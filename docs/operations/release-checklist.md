# Release Checklist

## Code quality

- [ ] `scripts/qa-baseline.sh` passes.
- [ ] Type checks pass.
- [ ] Unit tests pass.
- [ ] Integration tests pass.
- [ ] API contract tests pass.
- [ ] Mobile build succeeds.
- [ ] API container builds.
- [ ] GitHub Actions CI is green.

## Product quality

- [ ] Main user flows tested.
- [ ] Empty/loading/error states tested.
- [ ] English and Turkish copy reviewed.
- [ ] Accessibility smoke test completed.

## Tax/compliance

- [ ] Tax rule changes reviewed.
- [ ] Rule version updated where needed.
- [x] Audit event model includes input hash and rule version.
- [x] Private-beta audit persistence baseline verified.
- [x] High-risk assistant escalation contract tested.
- [ ] Accountant pack export remains gated behind explicit user confirmation.
- [ ] Export previews checked for accidental PII leakage before file generation is enabled.

## Security/privacy

- [ ] No secrets committed.
- [ ] Logs checked for PII leakage.
- [ ] Auth and authorisation smoke tests pass.
- [ ] Document access is private.
- [ ] Retention/deletion jobs reviewed before production.

## Release operations

- [ ] Database migrations reviewed.
- [ ] Rollback plan documented.
- [ ] Monitoring dashboards checked.
- [ ] Error alerting enabled.
