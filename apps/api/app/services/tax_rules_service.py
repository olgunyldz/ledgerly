import json
import subprocess
from pathlib import Path
from typing import Any


class TaxRulesServiceError(RuntimeError):
    pass


def estimate_self_employed_reserve(*, annual_profit: float, tax_year: str) -> dict[str, Any]:
    repo_root = Path(__file__).resolve().parents[4]
    cli_path = repo_root / "packages" / "tax-rules" / "src" / "cli.js"
    payload = {"annualProfit": annual_profit, "taxYear": tax_year}

    try:
        completed = subprocess.run(
            ["node", str(cli_path)],
            input=json.dumps(payload),
            capture_output=True,
            check=True,
            text=True,
        )
    except FileNotFoundError as exc:
        raise TaxRulesServiceError("tax rules runtime is unavailable") from exc
    except subprocess.CalledProcessError as exc:
        raise TaxRulesServiceError(exc.stderr.strip() or "tax rules calculation failed") from exc

    return json.loads(completed.stdout)
