# コンポーネント構成

**最終更新日: 2026年01月30日**

## ディレクトリ構造

```
src/components/
├── organisms/     # 大きな機能単位のコンポーネント（画面単位）
│   ├── Footer/
│   ├── GameScreen/
│   ├── GameTop/
│   ├── Result/
│   ├── SelectCourse/
│   ├── Settings/
│   └── TypingGame/
└── parts/         # 小さな再利用可能なコンポーネント
    ├── Button/
    ├── CountDown/
    └── GameContainer/
```

---

## Organisms（大規模コンポーネント）

### GameScreen

**ファイル**: `src/components/organisms/GameScreen/GameScreen.tsx`

**役割**: メインのゲーム画面コンテナ

**機能**:

- `CurrentScreenContext` から現在の画面状態を取得
- 画面状態に応じて適切な子コンポーネントを表示
- 全ての画面の切り替えを管理

**表示するコンポーネント**:

- `GameTop` (トップ)
- `SelectCourse` (セレクト)
- `TypingGame` (ゲーム)
- `Result` (リザルト)
- `Settings` (セッティング)

---

### GameTop

**ファイル**: `src/components/organisms/GameTop/GameTop.tsx`

**役割**: トップ画面

**機能**:

- 「スタートする」ボタン → セレクト画面へ遷移
- 「設定画面」ボタン → 設定画面へ遷移

**使用フック**:

- `useGoToPage`: 画面遷移

---

### SelectCourse

**ファイル**: `src/components/organisms/SelectCourse/SelectCourse.tsx`

**役割**: コース・難易度選択画面

**機能**:

- コース選択（単語/文章）
- 難易度選択（易しい/普通/難しい）
- ゲーム開始時の問題リスト生成
- スコアのリセット

**使用コンテキスト**:

- `CourseLevelContext`: コース・難易度の管理
- `ScoreContext`: スコアのリセット

**使用フック**:

- `useGoToPage`: 画面遷移
- `useUpdateQuestionList`: 問題リスト更新
- `useUpdateSelect`: 選択状態の更新

---

### TypingGame

**ファイル**: `src/components/organisms/TypingGame/TypingGame.tsx`

**役割**: タイピングゲーム本体

**機能**:

- カウントダウン表示（3秒）
- タイピング入力処理
- リアルタイム正誤判定
- 経過時間の計測
- ミス回数のカウント
- ゲーム終了時の自動遷移

**表示内容**:

- 選択したコース・難易度
- 問題文（漢字）
- ローマ字表記（入力済み部分は色分け）
- 非表示の入力欄
- ミス表示
- 「やめる」ボタン

**使用コンテキスト**:

- `CourseLevelContext`: コース・難易度の取得
- `ScoreContext`: スコアの更新

**使用フック**:

- `useGoToPage`: 画面遷移
- `useGameLogic`: ゲームロジック
- `useGameTimer`: 時間計測

**使用パーツ**:

- `CountDown`: カウントダウン表示

**特殊な実装**:

- 入力欄のフォーカス管理
- グローバルクリックイベントでのフォーカス維持
- 透明な入力欄（`opacity: 0`）

---

### Result

**ファイル**: `src/components/organisms/Result/Result.tsx`

**役割**: リザルト画面

**機能**:

- ゲーム結果の表示
- 次の行動への誘導

**表示内容**:

- 経過時間
- ミス回数
- 合計秒数
- スコアランク
- メッセージ

**使用コンテキスト**:

- `ScoreContext`: スコア情報の取得

**使用フック**:

- `useGoToPage`: 画面遷移

---

### Settings

**ファイル**: `src/components/organisms/Settings/Settings.tsx`

**役割**: 設定画面

**機能**:

- BGM ON/OFF切り替え
- BGM音量調整
- SE ON/OFF切り替え
- SE音量調整

**表示内容**:

- ラジオボタン（ON/OFF）
- レンジスライダー（音量調整）

**使用コンテキスト**:

- `UserSettingContext`: 設定の保存・取得

**使用フック**:

- `useGoToPage`: 画面遷移

---

### Footer

**ファイル**: `src/components/organisms/Footer/Footer.tsx`

**役割**: フッターコンポーネント

> **注**: 現在は使用されていない可能性があります

---

## Parts（小規模コンポーネント）

### Button

**ファイル**: `src/components/parts/Button/Button.tsx`

**役割**: 再利用可能なボタンコンポーネント

**Props**:

```typescript
{
  label: string;      // ボタンのラベル
  onClick: () => void; // クリック時の処理
}
```

**特徴**:

- 統一されたデザイン
- ホバーエフェクト
- Tailwind CSSによるスタイリング

---

### CountDown

**ファイル**: `src/components/parts/CountDown/CountDown.tsx`

**役割**: カウントダウン表示コンポーネント

**機能**:

- 3秒のカウントダウン（3 → 2 → 1 → START）
- カウント完了時のコールバック実行

**Props**:

```typescript
{
  onComplete: () => void; // カウント完了時の処理
}
```

**使用箇所**:

- `TypingGame` コンポーネント

---

### GameContainer

**ファイル**: `src/components/parts/GameContainer/GameContainer.tsx`

**役割**: ゲーム画面の共通コンテナ

**機能**:

- 全ての画面の共通レイアウトを提供
- 統一されたスタイリング

**Props**:

```typescript
{
  children: ReactNode; // 子要素
}
```

---

## Storybook対応

全てのコンポーネントに対応する `.stories.ts` / `.stories.tsx` ファイルが存在します。

### Storybookの起動

```bash
npm run sb
```

### ビルド

```bash
npm run build-sb
```

### 対応コンポーネント

- `Button`
- `CountDown`
- `GameContainer`
- `Footer`
- `GameScreen`
- `GameTop`
- `Result`
- `SelectCourse`
- `Settings`
- `TypingGame`

---

## コンポーネント設計のベストプラクティス

### 1. Atomic Design の影響

- **Parts**: 小さな再利用可能なコンポーネント（Atoms/Molecules相当）
- **Organisms**: 大きな機能単位のコンポーネント（Organisms相当）

### 2. 関心の分離

- ロジックは**カスタムフック**に分離
- 状態管理は**Context**に集約
- コンポーネントは表示とイベント処理に専念

### 3. 型安全性

- 全てのPropsに型定義
- TypeScriptによる静的型チェック

### 4. 再利用性

- `Button`, `CountDown`, `GameContainer` などの共通コンポーネント
- コンポーネントの独立性を保つ設計

---

## 今後の改善点

1. **コンポーネントの細分化**: 大きなコンポーネントをさらに小さく分割
2. **テストの追加**: ユニットテスト・統合テストの実装
3. **アクセシビリティ**: ARIA属性の追加、キーボード操作対応
4. **パフォーマンス最適化**: React.memo, useMemoの活用
