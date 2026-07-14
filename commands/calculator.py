"""
Calculator command — safe arithmetic expression evaluation.
"""

from __future__ import annotations

import ast
import operator
from typing import Optional

from colorama import Fore, Style

from engine import Command
from context import ShellContext

# Allowed operators for safe evaluation
_OPS = {
    ast.Add: operator.add,
    ast.Sub: operator.sub,
    ast.Mult: operator.mul,
    ast.Div: operator.truediv,
    ast.Mod: operator.mod,
    ast.Pow: operator.pow,
    ast.FloorDiv: operator.floordiv,
    ast.USub: operator.neg,
    ast.UAdd: operator.pos,
}


def _safe_eval(node: ast.AST) -> float:
    """Recursively evaluate an AST node using only arithmetic ops."""
    if isinstance(node, ast.Expression):
        return _safe_eval(node.body)
    if isinstance(node, ast.Constant) and isinstance(node.value, (int, float)):
        return node.value
    if isinstance(node, ast.BinOp):
        op_type = type(node.op)
        if op_type not in _OPS:
            raise ValueError(f"Unsupported operator: {op_type.__name__}")
        left = _safe_eval(node.left)
        right = _safe_eval(node.right)
        if op_type in (ast.Div, ast.Mod, ast.FloorDiv) and right == 0:
            raise ZeroDivisionError("Division by zero")
        return _OPS[op_type](left, right)
    if isinstance(node, ast.UnaryOp):
        op_type = type(node.op)
        if op_type not in _OPS:
            raise ValueError(f"Unsupported operator: {op_type.__name__}")
        return _OPS[op_type](_safe_eval(node.operand))
    raise ValueError(f"Unsupported expression: {ast.dump(node)}")


def _calculator(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """
    Evaluate an arithmetic expression safely.
    Usage: calc <expression>
    Example: calc 2 + 3 * (4 - 1)
    """
    if not args:
        print(Fore.YELLOW + "Usage: calc <expression>")
        print(Fore.CYAN + "  Example: calc 2 + 3 * (4 - 1)")
        return None

    expr = " ".join(args)
    try:
        tree = ast.parse(expr, mode="eval")
        result = _safe_eval(tree)
        # Display nicely (int if whole number)
        if isinstance(result, float) and result == int(result):
            result = int(result)
        print(Fore.BLUE + Style.BRIGHT + f"  {expr} = {result}")
        return str(result)
    except ZeroDivisionError:
        print(Fore.RED + "Error: Division by zero.")
    except (ValueError, SyntaxError) as e:
        print(Fore.RED + f"Error: Invalid expression — {e}")
    return None


def register(engine) -> None:
    """Register calculator commands."""
    engine.register(Command(
        name="calc",
        description="Safe arithmetic calculator",
        usage="calc <expression>  (e.g. calc 2+3*4)",
        category="utility",
        handler=_calculator,
    ))
