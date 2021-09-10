importScripts('https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.1/firebase-messaging.js');


firebase.initializeApp({
    apiKey: 'AIzaSyCRhLdV127RtvxAU2Q7_VVulu5zl9V-lMo',
    authDomain: 'algotech-vision-push.firebaseapp.com',
    projectId: 'algotech-vision-push',
    storageBucket: 'algotech-vision-push.appspot.com',
    messagingSenderId: '393862442384',
    appId: '1:393862442384:web:40f1fe57377e8cb6325715',
    measurementId: 'G-0X2QGCGLHF'
});

const messaging = firebase.messaging();
