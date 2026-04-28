import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import * as fs from 'fs';

const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function run() {
  const snapshot = await getDocs(collection(db, 'settings'));
  for (const x of snapshot.docs) {
    if (x.data().key === 'alamat_klinik' || x.data().key === 'jam_senin_jumat' || x.data().key === 'jam_sabtu_minggu' || x.data().key === 'telepon' || x.data().key === 'email' || x.data().key === 'jam_operasional') {
        console.log('Deleting setting:', x.data().key);
        await deleteDoc(doc(db, 'settings', x.id));
    }
    console.log(x.id, '=>', x.data());
  }
}

run().then(() => {
  console.log('Done');
  process.exit(0);
});
