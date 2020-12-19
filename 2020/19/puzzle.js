import { runPuzzles } from '../../utils.js';

function puzzleA(input) {
  let { i, rules } = createRules(input);
  let count = 0;
  while (i < input.length) {
    const result = checkRule(input[i], rules[0], rules);
    if (result.isMatch && result.chars === input[i].length) {
      count++;
    }
    i++;
  }

  return count;
}

function createRules(input) {
  const rules = [];
  let i = 0;
  while (input[i].includes(':')) {
    let [key, description] = input[i].split(':');
    key = parseInt(key);
    description = description.trim();
    if (description.startsWith('"')) {
      rules[key] = {
        value: description.substring(1, description.length - 1),
      };
    } else {
      rules[key] = {
        insideRules: description.split('|').map(rule =>
          rule
            .trim()
            .split(/\s+/)
            .map(x => parseInt(x))
        ),
      };
    }
    i++;
  }

  return {
    i,
    rules,
  };
}

function checkRule(text, rule, rules) {
  if (text && text[0] === rule.value) {
    return {
      isMatch: true,
      chars: 1,
    };
  }

  if (!rule.insideRules) {
    return {
      isMatch: false,
    };
  }

  for (const insideRule of rule.insideRules) {
    let i = 0;
    let success = true;
    for (const key of insideRule) {
      const result = checkRule(text.substring(i), rules[key], rules);
      if (!result.isMatch) {
        success = false;
        break;
      }
      i += result.chars;
    }
    if (success) {
      return {
        isMatch: true,
        chars: i,
      };
    }
  }

  return {
    isMatch: false,
  };
}

function puzzleB(input) {
  let { i, rules } = createRules(input);
  let count = 0;
  while (i < input.length) {
    let j = 0;
    let rule42Count = 0;
    while (j < input[i].length) {
      const result = checkRule(input[i].substring(j), rules[42], rules);
      if (!result.isMatch) {
        break;
      }
      j += result.chars;
      rule42Count++;
    }

    let rule31Count = 0;
    while (j < input[i].length) {
      const result = checkRule(input[i].substring(j), rules[31], rules);
      if (!result.isMatch) {
        break;
      }
      j += result.chars;
      rule31Count++;
    }
    if (j === input[i].length && rule31Count > 0 && rule42Count > rule31Count) {
      count++;
    }
    i++;
  }

  return count;
}

runPuzzles(puzzleA, puzzleB, 2020, 19);
