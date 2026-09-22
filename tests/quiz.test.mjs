import assert from "node:assert/strict";
import test from "node:test";
import { scoreQuiz } from "../app/content.ts";

test("four distinct needs produce the four intended characters", () => {
  for (let choice = 0; choice < 4; choice++) {
    const result = scoreQuiz([choice, choice, choice, choice, 0]);
    assert.equal(result.winner, choice);
    assert.equal(result.tied, false);
    assert.equal(result.secondary, undefined);
  }
});

test("ties start with the earlier learning need and disclose the tie", () => {
  assert.deepEqual(scoreQuiz([0, 0, 1, 1, 3]), {
    winner: 0,
    tied: true,
    goal: 3,
    secondary: 1,
  });
  assert.equal(scoreQuiz([2, 2, 3, 3, 0]).winner, 2);
  assert.equal(scoreQuiz([0, 1, 2, 3, 0]).tied, true);
});

test("a changed learning goal never changes the character", () => {
  for (let pattern = 0; pattern < 256; pattern++) {
    const answers = Array.from(
      { length: 4 },
      (_, i) => Math.floor(pattern / 4 ** i) % 4,
    );
    const baseline = scoreQuiz([...answers, 0]);
    for (let goal = 0; goal < 4; goal++) {
      const result = scoreQuiz([...answers, goal]);
      assert.equal(result.winner, baseline.winner);
      assert.equal(result.tied, baseline.tied);
      assert.equal(result.goal, goal);
    }
  }
});

test("incomplete or invalid answers cannot produce a result", () => {
  for (const answers of [
    [],
    [0, 0, 0, 0],
    [-1, 0, 0, 0, 0],
    [4, 0, 0, 0, 0],
    [0, 0, 0, 0, 1.5],
  ]) {
    assert.equal(scoreQuiz(answers), null);
  }
});
