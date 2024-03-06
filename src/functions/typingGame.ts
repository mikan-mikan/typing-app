// 入力された文字列とパターンを比較し、一致する部分を削除した文字列を返す
export function removeMatchingPrefix(input: string, pattern: string): string {
  let index = 0;
  while (index < input.length && index < pattern.length && input[index] === pattern[index]) {
    index++;
  }
  return input.substring(index);
}
