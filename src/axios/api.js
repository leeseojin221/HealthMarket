import { collection, deleteDoc, doc, getDocs, query, updateDoc, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';

const getHealth = async () => {
  const q = query(collection(db, 'info'));
  const querySnapshot = await getDocs(q);

  const initialInfos = [];

  querySnapshot.forEach((doc) => {
    const data = {
      id: doc.id,
      ...doc.data()
    };
    initialInfos.push(data);
  });
  return initialInfos;
};

const deleteHealth = async (itemId) => {
  try {
    const healthRef = doc(db, 'info', itemId);
    await deleteDoc(healthRef);
  } catch (error) {
    throw new Error('Error :' + error.message);
  }
};

const editHealth = async (itemId, updateData) => {
  try {
    const healthRef = doc(db, 'info', itemId);
    await updateDoc(healthRef, updateData);
  } catch (error) {
    throw new Error('Error :' + error.message);
  }
};

const getItems = async () => {
  // 변경사항 storys infos
  const q = query(collection(db, 'info'));
  const querySnapshot = await getDocs(q);

  const Items = [];

  querySnapshot.forEach((doc) => {
    const data = {
      id: doc.id,
      ...doc.data()
    };
    Items.push(data);
  });
  return Items;
};

const addHealth = async (addData) => {
  await addDoc(collection(db, 'info'), addData);
};

export { getItems, getHealth, deleteHealth, editHealth, addHealth };
