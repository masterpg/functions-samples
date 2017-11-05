/**
 * Copyright 2017 livedeveloper.net. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// Cloud Functions for Firebase SDKはCloud Functionsとトリガーをセットアップする
const functions = require('firebase-functions');

// Firebase Admin SDKはFirestoreのアクセスに使用する
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


// このHTTPエンドポイントに渡されたテキストパラメータは、
// Firestoreに /messages/:documentId/original というパスで挿入される。
exports.addMessage = functions.https.onRequest((req, res) => {
  // テキストパラメータの取得
  const original = req.query.text;
  // Firebase Admin SDKを使用してFirestoreに新しいメッセージを追加する
  admin.firestore().collection('messages').add({original: original}).then(writeResult => {
    // メッセージの書き込みが成功したことをレスポンスする
    res.json({result: `Message with ID: ${writeResult.id} added.`});
  });
});


// 新しいメッセージが /messages/:documentId/original に追加されるのをリッスンし、
// そのメッセージを大文字化して /messages/:documentId/uppercase に設定します。
exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
  .onCreate(event => {
    // Firestoreに書き込まれた値を取得
    const original = event.data.data().original;
    console.log('Uppercasing', event.params.documentId, original);
    const uppercase = original.toUpperCase();
    // Firestoreの書き込みのような非同期処理を関数内で実行する場合はPromiseを返すべきで、
    // ここでは大文字化されたメッセージをFirestoreに設定するというPromiseを返している。
    return event.data.ref.set({uppercase}, {merge: true});
  });
