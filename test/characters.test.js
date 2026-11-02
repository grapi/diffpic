import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CHARACTERS, characterSvg, findCharacter } from '../public/lib/characters.js';

test('캐릭터 id 가 겹치지 않고 표정마다 그림이 다르다', () => {
  assert.equal(new Set(CHARACTERS.map((c) => c.id)).size, CHARACTERS.length);
  for (const { id } of CHARACTERS) {
    const moods = ['idle', 'happy', 'sad'].map((m) => characterSvg(id, m));
    assert.equal(new Set(moods).size, 3, id);
  }
});

test('모르는 id 면 첫 캐릭터로 그린다', () => {
  assert.equal(findCharacter('없는 id'), CHARACTERS[0]);
});
