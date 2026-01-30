# ロジック・関数

**最終更新日: 2026年01月30日**

## 概要

`src/functions/` ディレクトリには、ビジネスロジックやユーティリティ関数が配置されています。
これらの関数はコンポーネントやフックから呼び出され、特定の処理を実行します。

---

## 関数ファイル一覧

### 1. common.ts

**ファイル**: `src/functions/common.ts`

**役割**: 共通ユーティリティ関数

#### checkJa (正規表現)

```typescript
export const checkJa: RegExp;
```

**機能**: 日本語入力を検出する正規表現

**用途**:

- ユーザー入力が日本語（ひらがな、カタカナ、漢字）かどうかを判定
- IME入力中の不正な入力を検出

**使用箇所**:

- `useGameLogic`: 日本語入力時の自動クリア処理

---

### 2. scores.ts

**ファイル**: `src/functions/scores.ts`

**役割**: スコア計算関連のロジック

#### calculateTotalTime

```typescript
function calculateTotalTime(elapsedTime: number, missCount: number): number;
```

**機能**: 合計時間を計算

**引数**:

- `elapsedTime`: 経過時間（秒）
- `missCount`: ミス回数

**戻り値**: 合計時間（秒）

**計算式**:

```
合計時間 = 経過時間 + (ミス回数 × ミスペナルティ)
```

**使用箇所**:

- `ScoreContext`: スコア更新時

---

#### getScoreRank

```typescript
function getScoreRank(totalTime: number): ScoreProps;
```

**機能**: 合計時間からスコアランクを判定

**引数**:

- `totalTime`: 合計時間（秒）

**戻り値**: スコアランク（`'VeryFast'` | `'Fast'` | `'Normal'` | `'Slow'` | `'VerySlow'`）

**判定基準**:
| ランク | 条件 |
|--------|------|
| VeryFast | totalTime ≤ 基準値1 |
| Fast | totalTime ≤ 基準値2 |
| Normal | totalTime ≤ 基準値3 |
| Slow | totalTime ≤ 基準値4 |
| VerySlow | それ以外 |

> **注**: 具体的な基準値は`src/static/scores.ts`で定義されています。

**使用箇所**:

- `ScoreContext`: スコアランク判定時

---

#### getScoreMessage

```typescript
function getScoreMessage(rank: ScoreProps): string;
```

**機能**: スコアランクに応じたメッセージを取得

**引数**:

- `rank`: スコアランク

**戻り値**: メッセージ文字列

**メッセージ対応表**:
| ランク | メッセージ |
|--------|-----------|
| VeryFast | 素晴らしいです！ |
| Fast | 速いです！ |
| Normal | 普通です |
| Slow | 遅いです |
| VerySlow | とても遅いです |

**使用箇所**:

- `ScoreContext`: スコアオブジェクト生成時

---

### 3. selectQuestLists.ts

**ファイル**: `src/functions/selectQuestLists.ts`

**役割**: 問題リストの選択・生成

#### selectQuestLists

```typescript
function selectQuestLists(course: SelectCourseType, level: SelectLevelType, questionNumber: number): QuestionType[];
```

**機能**: 選択されたコース・難易度に応じて問題リストを生成

**引数**:

- `course`: コース種別（'単語' | '文章'）
- `level`: 難易度（'易しい' | '普通' | '難しい'）
- `questionNumber`: 問題数

**戻り値**: 問題の配列

**処理フロー**:

1. `QUESTIONS`から全問題を取得
2. コース・難易度に応じたフィルタリング（将来実装予定）
3. 配列をシャッフル
4. 指定された数の問題を抽出

**現在の実装**:

- コース・難易度による実際のフィルタリングは未実装
- 全問題からランダムに選択

**使用箇所**:

- `useUpdateQuestionList`: 問題リストの生成時

**今後の改善**:

- コースによる問題の分類
- 難易度による問題のフィルタリング
- より高度な問題選択アルゴリズム

---

### 4. typingGame.ts

**ファイル**: `src/functions/typingGame.ts`

**役割**: タイピングゲームの補助ロジック

#### removeMatchingPrefix

```typescript
function removeMatchingPrefix(original: string, input: string): string;
```

**機能**: 文字列の先頭から一致する部分を削除し、残りの文字列を返す

**引数**:

- `original`: 元の文字列（正解の文字列）
- `input`: 入力された文字列

**戻り値**: 一致部分を削除した残りの文字列

**例**:

```typescript
removeMatchingPrefix('watashi', 'wa'); // → "tashi"
removeMatchingPrefix('konnichiha', 'ko'); // → "nnichiha"
```

**処理ロジック**:

1. 入力文字列の長さ分だけ元の文字列を比較
2. 一致する場合は一致部分を削除
3. 残りの文字列を返す

**使用箇所**:

- `useGameLogic`: 入力成功時の残り文字列計算

---

## 静的データ（static/）

### src/static/index.ts

**定数定義**:

```typescript
export const QUESTION_NUMBER = 3; // 問題数

export const COURSES_LIST: SelectCourseType[] = ['単語', '文章'];

export const LEVELS_LIST: SelectLevelType[] = ['易しい', '普通', '難しい'];
```

---

### src/static/questions.ts

**問題データ**:

```typescript
export const QUESTIONS: QuestionType[];
```

**内容**: 10問の問題データ（漢字とかなの対応）

**例**:

```typescript
{
  kanji: '私は日本人です',
  kana: 'わたしはにほんじんです',
}
```

---

### src/static/scores.ts

**スコア判定基準**:

基準値の定義やミスペナルティなどが含まれていると推測されます。

> **注**: 詳細な内容は実際のファイルを確認してください。

---

### src/static/settings.ts

**設定関連の定数**:

```typescript
export const SETTING_NAME: string[];
export const SETTING_RADIO_TYPE: string[];
export const SETTING_VOLUME: { min: number; max: number };
```

**内容**:

- 設定項目名
- ラジオボタンの種類（'on' / 'off'）
- 音量の範囲（最小値・最大値）

---

## 関数設計のベストプラクティス

### 1. 純粋関数

可能な限り副作用のない純粋関数として実装しています。

### 2. 単一責任

各関数は1つの明確な処理のみを行います。

### 3. 型安全性

全ての関数に適切な型定義を行っています。

### 4. テスタビリティ

コンポーネントから独立しているため、ユニットテストが容易です。

---

## 今後の改善点

1. **問題選択ロジックの強化**
   - コース別の問題分類
   - 難易度による自動調整
   - より高度なアルゴリズム

2. **スコア計算の改善**
   - より詳細な評価基準
   - 正確性スコアの追加
   - WPM（Words Per Minute）計算

3. **バリデーション関数の追加**
   - 入力値の検証
   - エラーハンドリング

4. **ユニットテストの追加**
   - Jestによるテストカバレッジ向上
   - エッジケースのテスト

5. **ドキュメント改善**
   - JSDocコメントの追加
   - 使用例の充実
