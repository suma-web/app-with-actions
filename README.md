# app-with-actions

Next.js で作成したカウンターアプリです。GitHub Actions を使って、Pull Request 作成時と `main` ブランチへのマージ時に CI を実行します。

## アプリ概要

- `Prev` ボタンでカウントを減らします。
- `Next` ボタンでカウントを増やします。
- カウントが負の値の場合は青色、0以上の場合は黒色で表示します。
- 画面中央にカウントと操作ボタンを配置します。

## 要件

このリポジトリでは、以下の要件を満たすことを目的としています。

- `main` ブランチを default ブランチとすること
- `main` ブランチに Pull Request を出すと GitHub Actions が実行されること
- `main` ブランチにマージされたら GitHub Actions が実行されること
- `build` が通ることをテストすること
- `eslint` を実行すること
- `build` または `eslint` が失敗した場合、GitHub Actions も失敗すること
- Danger JS を使用して、以下に違反している場合は警告を出すこと
  - 追加行と削除行の合計が200行を超えた場合
  - 編集ファイル数が10ファイルを超えた場合

## GitHub Actions

Workflow は `.github/workflows/firstwork.yml` に定義しています。

実行タイミング:

- `main` ブランチ向けの Pull Request 作成時
- `main` ブランチへの push 時

実行内容:

1. リポジトリを checkout
2. Node.js 22 をセットアップ
3. `npm ci` で依存関係をインストール
4. `npm run lint` で ESLint を実行
5. `npm run build` で Next.js の build を実行
6. Pull Request の場合のみ `npm run danger` で Danger JS を実行

`lint` または `build` が失敗すると、その step の終了コードにより workflow も失敗します。

## Danger JS

Danger JS の設定は `dangerfile.js` に記述しています。

チェック内容:

- 追加行と削除行の合計が200行を超えた場合に警告
- 編集ファイル数が10ファイルを超えた場合に警告

Danger が Pull Request に警告コメントを書き込むには、GitHub Actions の `GITHUB_TOKEN` に書き込み権限が必要です。必要に応じて workflow に以下の権限を明示します。

```yaml
permissions:
  contents: read
  pull-requests: write
  issues: write
```

## ローカルでの実行

依存関係をインストールします。

```bash
npm ci
```

開発サーバーを起動します。

```bash
npm run dev
```

ESLint を実行します。

```bash
npm run lint
```

build を実行します。

```bash
npm run build
```

## 主なファイル構成

```text
.
├── .github/workflows/firstwork.yml  # GitHub Actions workflow
├── app/
│   ├── global.css                   # グローバルCSS
│   ├── layout.tsx                   # Next.js layout
│   └── page.tsx                     # カウンターアプリ本体
├── dangerfile.js                    # Danger JS のチェック定義
├── package.json                     # npm scripts と依存関係
└── README.md
```
