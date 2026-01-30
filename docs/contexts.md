# コンテキスト・状態管理

**最終更新日: 2026年01月30日**

## 概要

このアプリケーションでは、React Contextを使用してグローバルな状態管理を実現しています。
各Contextは特定の責務を持ち、コンポーネント間でデータを共有します。

---

## Context一覧

### 1. CurrentScreenContext

**ファイル**: `src/contexts/CurrentScreenContext.tsx`

**役割**: 現在表示中の画面を管理

**状態**:

```typescript
{
  currentNameCo: CurrentType;           // 現在の画面名
  setCurrentNameCo: (value: CurrentType) => void;  // 画面変更関数
}
```

**型定義**:

```typescript
type CurrentType = 'トップ' | 'セレクト' | 'ゲーム' | 'リザルト' | 'セッティング';
```

**初期値**: `'トップ'`

**使用箇所**:

- `GameScreen`: 画面の切り替え
- `useGoToPage`: 画面遷移フック

---

### 2. CourseLevelContext

**ファイル**: `src/contexts/CourseLevelContext.tsx`

**役割**: 選択されたコースと難易度を管理

**状態**:

```typescript
{
  courseCo: SelectCourseType;           // 選択されたコース
  setCourseCo: (value: SelectCourseType) => void;
  levelCo: SelectLevelType;             // 選択された難易度
  setLevelCo: (value: SelectLevelType) => void;
}
```

**型定義**:

```typescript
type SelectCourseType = '単語' | '文章';
type SelectLevelType = '易しい' | '普通' | '難しい';
```

**初期値**:

- `courseCo`: `'単語'`
- `levelCo`: `'易しい'`

**使用箇所**:

- `SelectCourse`: コース・難易度の選択
- `TypingGame`: 選択内容の表示
- `useUpdateSelect`: 選択状態の更新

---

### 3. QuestionListContext

**ファイル**: `src/contexts/QuestionListContext.tsx`

**役割**: ゲームで使用する問題リストを管理

**状態**:

```typescript
{
  questionListCo: QuestionType[];       // 問題リスト
  setQuestionListCo: (value: QuestionType[]) => void;
}
```

**型定義**:

```typescript
type QuestionType = {
  kanji: string; // 漢字表記
  kana: string; // かな表記
};
```

**初期値**: `[]`（空配列）

**使用箇所**:

- `useUpdateQuestionList`: 問題リストの生成・更新
- `useGameLogic`: ゲームロジックでの問題取得

---

### 4. ScoreContext

**ファイル**: `src/contexts/ScoreContext.tsx`

**役割**: スコア関連のデータを一元管理

**状態**:

```typescript
{
  elapsedTimeCo: number;                // 経過時間（秒）
  setElapsedTimeCo: (value: number) => void;

  missCo: number;                       // ミス回数
  setMissCo: (value: number) => void;

  totalTimeCo: number;                  // 合計時間（秒）
  setTotalTimeCo: (value: number) => void;

  scoreObjectCo: ScoreMessageProps;     // スコアオブジェクト
  setScoreObjectCo: (value: ScoreMessageProps) => void;

  updateScoreCo: (elapsedTime: number) => void;  // スコア更新関数
  resetScoreContext: () => void;        // スコアリセット関数
}
```

**型定義**:

```typescript
type ScoreMessageProps = {
  score: ScoreProps | ''; // スコアランク
  message: string; // メッセージ
};

type ScoreProps = 'VeryFast' | 'Fast' | 'Normal' | 'Slow' | 'VerySlow';
```

**初期値**:

- `elapsedTimeCo`: `0`
- `missCo`: `0`
- `totalTimeCo`: `0`
- `scoreObjectCo`: `{ score: '', message: '' }`

**主要機能**:

#### updateScoreCo(elapsedTime)

経過時間を受け取り、スコアを計算して更新:

1. 経過時間を保存
2. ミス数からペナルティを計算
3. 合計時間を算出
4. スコアランクとメッセージを決定

#### resetScoreContext()

全てのスコア関連データを初期値にリセット

**使用箇所**:

- `SelectCourse`: スコアのリセット
- `TypingGame`: スコアの更新
- `Result`: スコアの表示
- `useGameLogic`: ミス回数のカウント

---

### 5. UserSettingContext

**ファイル**: `src/contexts/UserSettingContext.tsx`

**役割**: ユーザー設定（音声関連）を管理

**状態**:

```typescript
{
  seCo: boolean;                        // SE ON/OFF
  setSeCo: (value: boolean) => void;

  bgmCo: boolean;                       // BGM ON/OFF
  setBgmCo: (value: boolean) => void;

  seVolumeCo: number;                   // SE音量 (0-100)
  setSeVolumeCo: (value: number) => void;

  bgmVolumeCo: number;                  // BGM音量 (0-100)
  setBgmVolumeCo: (value: number) => void;
}
```

**初期値**:

- `seCo`: `true`
- `bgmCo`: `true`
- `seVolumeCo`: `50`
- `bgmVolumeCo`: `50`

**使用箇所**:

- `Settings`: 設定の変更・表示

> **注**: 現在、実際の音声再生機能は未実装です。設定値のみが保存されています。

---

## Context Provider の構成

全てのContextは `src/app/provider.tsx` でラップされています:

```tsx
<CurrentScreenProvider>
  <CourseLevelProvider>
    <QuestionListProvider>
      <ScoreProvider>
        <UserSettingProvider>{children}</UserSettingProvider>
      </ScoreProvider>
    </QuestionListProvider>
  </CourseLevelProvider>
</CurrentScreenProvider>
```

これにより、アプリケーション全体で各Contextにアクセス可能になります。

---

## 使用方法

### Context の使用例

```tsx
import { useContext } from 'react';
import { CurrentScreenContext } from '@/contexts/CurrentScreenContext';

function MyComponent() {
  const { currentNameCo, setCurrentNameCo } = useContext(CurrentScreenContext);

  return <button onClick={() => setCurrentNameCo('ゲーム')}>ゲーム開始</button>;
}
```

---

## データフロー

### ゲーム開始時のフロー

1. **SelectCourse**で選択
   - `CourseLevelContext` にコース・難易度を保存
   - `QuestionListContext` に問題リストを生成
   - `ScoreContext` をリセット

2. **TypingGame**でプレイ
   - `QuestionListContext` から問題を取得
   - `ScoreContext` のミス回数を更新

3. **Result**で結果表示
   - `ScoreContext` から全てのスコアデータを取得

---

## 今後の改善点

1. **永続化**: LocalStorage / SessionStorage への保存
2. **状態管理ライブラリの検討**: Redux, Zustand などの導入
3. **Context の分割**: 責務の細分化
4. **パフォーマンス最適化**: useMemo, useCallback の活用
5. **型安全性の向上**: より厳密な型定義
