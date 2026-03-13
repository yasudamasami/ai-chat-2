# AI Chat App - Project Specification

## プロジェクト概要

友人・グループ向けの雑談・面白トークを楽しむエンターテインメント系AIチャットアプリ。
特定のキャラクター設定はなく、シンプルに暇つぶしとして使えることを目的とする。

---

## 技術スタック

### フロントエンド
- **Next.js** (App Router)
- モバイル対応（レスポンシブデザイン）

### バックエンド
- **Hono** - APIサーバー

### AIフレームワーク
- **Mastra** - AIエージェントフレームワーク
- **Claude (Anthropic)** - 使用モデル

### インフラ
- **GCP Cloud Run** - デプロイ先

---

## 機能要件

### チャット機能
- ユーザーがメッセージを送信し、Claudeが返答する
- 会話履歴はセッション中のみ保持（ページリロードでリセット）
- DBへの永続化は不要

### UI
- シンプルなチャット画面（LINE・Slack風）
- モバイルファースト・レスポンシブ対応

### 認証
- 認証なし（誰でも使える）

---

## 非機能要件

- レート制限: 不要
- 多言語対応: 不要
- 認証・ユーザー管理: 不要

---

## アーキテクチャ方針

- Next.js App Router でフロントエンドとAPIルートを管理
- Hono をバックエンドAPIサーバーとして使用
- Mastra でClaudeとのAIエージェント処理を実装
---

## ディレクトリ構成（想定）

```
ai_chat_2/
├── app/                  # Next.js App Router
│   ├── page.tsx          # チャット画面
│   └── layout.tsx
├── components/           # UIコンポーネント
│   └── Chat/
├── server/               # Honoバックエンド
│   └── index.ts
├── mastra/               # Mastraエージェント設定
│   └── agent.ts
├── public/
├── CLAUDE.md
├── package.json
└── README.md
```

---

## 開発ガイドライン

- コードは TypeScript で統一する
- コンポーネントはシンプルに保ち、過度な抽象化を避ける
- モバイル対応を常に意識してスタイリングする
- Mastra の設定は `mastra/` ディレクトリに集約する
- 環境変数（APIキー等）は `.env.local` で管理し、コミットしない
