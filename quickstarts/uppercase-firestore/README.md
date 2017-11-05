# Firebase SDK for Cloud Functions Quickstart - Cloud Firestore

このクイックスタートでは、**Firebase SDK for Cloud Functions**を使用するのとともに**Firestore**も利用しています。


## 導入

このサンプルでは2つのシンプルな動作がおこなわれます。

 - Firebase FunctionによってハンドルされるシンプルなHTTPリクエストを使用して、Firestoreにメッセージを追加します。Firestoreへの書き込みにはFirebase Admin SDKを使用します。
 - Firestoreにメッセージが追加されると、Firebase Functionがトリガーされ、メッセージは自動的に大文字化されてFirestoreに格納されます。

## デプロイとテスト

デプロイとテストを行うために次の作業をおこないます。

 - Firebaseのプロジェクトを作成します（[Firebase Console](https://console.firebase.google.com)）。
 - `functions`ディレクトに移動して`npm install`を行い、依存ライブラリをインストールします。
 - `firebase deploy`コマンドで作成したプロジェクトコードをデプロイします。
 - ブラウザに次のURLを入力することでメッセージを作成します: https://us-central1-MY_PROJECT.cloudfunctions.net/addMessage?text=uppercaseme (`MY_PROJECT`の部分を自身のプロジェクトIDに置換えたURLにアクセスしてください。"uppercaseme"の部分が大文字化されたテキストがFirestoreに格納されます。)


[Firebase Console](https://console.firebase.google.com)の`Database`にアクセスし、URLに指定したテキストが大文字化されて格納されていることを確認してください。


> デプロイの詳細については[Firebase CLI リファレンス - デプロイ](https://firebase.google.com/docs/cli/?hl=ja#deployment)を参照ください。

## License

© livedeveloper.net, 2016. Licensed under an [Apache-2](../../LICENSE) license.
