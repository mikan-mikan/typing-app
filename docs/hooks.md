# フック一覧

**最終更新日: 2026年01月30日**

## 概要

このアプリケーションでは、ロジックをコンポーネントから分離するためにカスタムフックを使用しています。
各フックは特定の責務を持ち、再利用可能な形で実装されています。

---

## カスタムフック一覧

### 1. useGameLogic

**ファイル**: `src/hooks/useGameLogic.tsx`

**役割**: タイピングゲームのメインロジック

**戻り値**:

```typescript
{
  displayTextKanji: string;         // 表示する問題文（漢字）
  displayTextRomaji: string;        // 表示するローマ字
  userInput: string;                // ユーザーの現在の入力
  isOk: boolean;                    // 入力が正しいかどうか
  prevUserInput: string;            // 直前の入力（表示用）
  isGameFinished: boolean;          // ゲーム終了フラグ
  setIsGameFinished: (value: boolean) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
```

**主な機能**:

- 問題文の管理と表示
- ユーザー入力の処理
- ローマ字→ひらがな変換（wanakana使用）
- 入力の正誤判定
- 次の問題への自動遷移
- ゲーム終了の判定
- ミス回数のカウント

**ロジックフロー**:

1. ユーザーが文字を入力
2. 入力をひらがなに変換
3. 正解のひらがなと照合
4. 正しい場合:
   - 残りの文字列を更新
   - 最後の文字なら次の問題へ
   - 最後の問題なら終了
5. 間違っている場合:
   - ミスとしてカウント
   - 日本語入力や長い不一致入力は自動クリア

**使用コンテキスト**:

- `QuestionListContext`: 問題リスト
- `ScoreContext`: ミス回数の更新

**使用箇所**:

- `TypingGame`: ゲーム画面

**TODO**:

- useMemoによる最適化の検討
- ミスの条件変更の検討

---

### 2. useGameTimer

**ファイル**: `src/hooks/useGameTimer.tsx`

**役割**: ゲームの経過時間を計測

**戻り値**:

```typescript
{
  elapsedTime: number;              // 経過時間（秒）
  startGameTimer: () => void;       // 計測開始
  stopGameTimer: () => void;        // 計測停止
}
```

**主な機能**:

- ゲーム開始からの経過時間を計測
- 秒単位での時間更新
- タイマーの開始・停止制御

**実装詳細**:

- `setInterval`で1秒ごとに更新
- `useEffect`でクリーンアップ処理
- 複数回の開始呼び出しを防止

**使用箇所**:

- `TypingGame`: 経過時間の計測

---

### 3. useGoToPage

**ファイル**: `src/hooks/useGoToPage.tsx`

**役割**: 画面遷移を簡単に行うためのヘルパー

**戻り値**:

```typescript
{
  goToPage: (page: CurrentType) => void;
}
```

**主な機能**:

- `CurrentScreenContext`の`setCurrentNameCo`をラップ
- より直感的な画面遷移API

**使用例**:

```typescript
const { goToPage } = useGoToPage();
goToPage('セレクト'); // セレクト画面へ遷移
```

**使用コンテキスト**:

- `CurrentScreenContext`: 画面状態の更新

**使用箇所**:

- `GameTop`: トップ画面
- `SelectCourse`: セレクト画面
- `TypingGame`: ゲーム画面
- `Result`: リザルト画面
- `Settings`: 設定画面

---

### 4. useHandleKeyDown

**ファイル**: `src/hooks/useHandleKeyDown.tsx`

**役割**: キーボード入力イベントの処理

**戻り値**:

```typescript
{
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}
```

**主な機能**:

- キーダウンイベントのハンドリング
- 特定キーの処理（Enter、Escapeなど）

**使用箇所**:

- 入力処理が必要なコンポーネント

> **注**: 現在の実装状況や詳細な使用箇所は要確認

---

### 5. useUpdateQuestionList

**ファイル**: `src/hooks/useUpdateQuestionList.tsx`

**役割**: 選択されたコース・難易度に応じて問題リストを生成

**戻り値**:

```typescript
{
  updateQuestionList: (course: SelectCourseType, level: SelectLevelType) => void;
}
```

**主な機能**:

- コースと難易度に基づいて問題を選択
- `QUESTIONS`から指定数の問題をランダムに抽出
- 問題リストをコンテキストに保存

**実装詳細**:

- `QUESTION_NUMBER`で問題数を制御（現在は3問）
- ランダムシャッフルで問題を選択
- 重複を防ぐ仕組み

**使用コンテキスト**:

- `QuestionListContext`: 問題リストの更新

**使用箇所**:

- `SelectCourse`: ゲーム開始時

**使用関数**:

- `selectQuestLists`: 問題選択ロジック（`src/functions/selectQuestLists.ts`）

---

### 6. useUpdateSelect

**ファイル**: `src/hooks/useUpdateSelect.tsx`

**役割**: コース・難易度の選択状態を更新

**戻り値**:

```typescript
{
  updateSelectCourse: (course: SelectCourseType) => void;
  updateSelectLevel: (level: SelectLevelType) => void;
}
```

**主な機能**:

- コース選択の更新
- 難易度選択の更新
- コンテキストへの保存

**使用コンテキスト**:

- `CourseLevelContext`: コース・難易度の更新

**使用箇所**:

- `SelectCourse`: ラジオボタンの選択時

---

## フック設計のベストプラクティス

### 1. 単一責任の原則

各フックは1つの明確な責務を持つように設計されています。

### 2. 再利用性

複数のコンポーネントで使える汎用的な実装を心がけています。

### 3. Context との分離

フックはContextを使用しますが、Context自体の定義は別ファイルに配置しています。

### 4. 型安全性

全ての戻り値と引数に適切な型定義を行っています。

---

## 今後の改善点

1. **パフォーマンス最適化**
   - `useMemo`、`useCallback`の活用
   - 不要な再レンダリングの防止

2. **エラーハンドリング**
   - 異常系の処理強化
   - エラー状態の管理

3. **テストの追加**
   - カスタムフックのユニットテスト
   - `@testing-library/react-hooks`の活用

4. **ドキュメント改善**
   - JSDocコメントの追加
   - 使用例の充実

5. **機能拡張**
   - より柔軟な問題選択ロジック
   - リプレイ機能のサポート
   - データ永続化のサポート
