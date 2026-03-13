# 実装計画 TODO

## Phase 1: プロジェクトセットアップ

- [x] Next.js プロジェクトを作成する（`npx create-next-app@latest`、TypeScript・App Router・Tailwind CSS を選択）
- [x] Hono をインストールする
- [x] Mastra をインストールする
- [x] Anthropic SDK をインストールする
- [x] `.env.local` を作成し、`ANTHROPIC_API_KEY` を設定する
- [x] `.gitignore` に `.env.local` が含まれていることを確認する

---

## Phase 2: バックエンド実装（Hono + Mastra）

- [x] `server/index.ts` に Hono サーバーを作成する
- [x] `mastra/agent.ts` に Mastra エージェントを定義する（Claude モデルを指定）
- [x] チャットエンドポイントを実装する（`POST /api/chat`）
  - [x] リクエストボディでメッセージ・会話履歴を受け取る
  - [x] Mastra エージェントで Claude に問い合わせる
  - [x] レスポンスを返す（ストリーミング対応も検討）
- [x] Next.js の API Route から Hono サーバーを呼び出せるよう設定する

---

## Phase 3: フロントエンド実装（Next.js）

- [x] `app/layout.tsx` にグローバルレイアウトを設定する
- [x] `app/page.tsx` にチャット画面のエントリーポイントを作成する
- [x] `components/Chat/ChatWindow.tsx` を作成する（メッセージ一覧表示）
- [x] `components/Chat/MessageBubble.tsx` を作成する（ユーザー・AI のメッセージ表示）
- [x] `components/Chat/ChatInput.tsx` を作成する（入力欄・送信ボタン）
- [x] セッション中の会話履歴を `useState` で管理する
- [x] `/api/chat` エンドポイントへの送信処理を実装する
- [x] 送信中のローディング表示を実装する

---

## Phase 4: UI・スタイリング

- [x] モバイルファーストのレスポンシブレイアウトを適用する
- [x] LINE・Slack 風のチャットバブルスタイルを実装する（自分：右寄り、AI：左寄り）
- [x] メッセージが増えたとき自動スクロールする処理を実装する
- [x] 送信ボタンの活性・非活性（空入力時）を制御する

---

## Phase 5: デプロイ（GCP Cloud Run）

- [ ] `Dockerfile` を作成する
- [ ] Cloud Run 用のビルドコマンドを確認・調整する
- [ ] GCP プロジェクトを作成・設定する
- [ ] Cloud Run に環境変数（`ANTHROPIC_API_KEY`）を設定する
- [ ] イメージをビルドして Container Registry / Artifact Registry にプッシュする
- [ ] Cloud Run にデプロイし、動作確認する

---

## Phase 6: 動作確認・仕上げ

- [ ] PC・スマートフォンで表示・操作を確認する
- [ ] 会話が自然に続くか（コンテキストが引き継がれるか）確認する
- [ ] ページリロードで会話履歴がリセットされることを確認する
- [ ] エラー時（API失敗等）の表示を確認する
