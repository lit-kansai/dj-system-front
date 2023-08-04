<div align="center">
<img alt="DJ-Gassi_logo2" height="300" src="https://user-images.githubusercontent.com/57238213/229261614-2f85aa48-650d-48c8-808d-ee8990cfcb0b.png"><br />
</div>

# DJ System Front

DJシステムのフロントエンドです。

## Quick Start

### パッケージのインストール
```
$ yarn install
```

### アプリの起動
```
$ yarn member dev // メンバー側の起動
$ yarn admin dev // 管理者側の起動
```

### アプリのビルド

```
$ yarn member build // メンバー側のビルド
$ yarn admin build // 管理者側のビルド
```
### 環境変数

メンバー側

```
NUXT_PUBLIC_BASE_API_URL=
HOST_URL=
```

## APIの型定義ファイルのアップデート

```bash
npx openapi2aspida -i https://raw.githubusercontent.com/lit-kansai/dj_system-api/main/public/docs/dj-system-api.yaml
```
