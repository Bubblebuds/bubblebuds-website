import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import * as fs from 'fs';

const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function run() {
  const snapshot = await getDocs(collection(db, 'settings'));
  console.log("ALL SETTINGS IN FIRESTORE:");
  for (const x of snapshot.docs) {
    console.log(`ID: ${x.id}, Key: "${x.data().key}", Value: "${x.data().value}"`);
  }
}
run().then(() => { process.exit(0); });
