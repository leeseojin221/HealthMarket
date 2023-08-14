import { collection, deleteDoc, doc, getDocs, query, updateDoc, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import { needAllContent, addAllContent, failAllContent } from '../components/Alert';

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

const options = [
  { value: '0', name: '선택해주세요' },
  { value: '1', name: '유산소' },
  { value: '2', name: '근력' },
  { value: '3', name: '스포츠잡화' },
  { value: '4', name: '건강식품' }
];

const addHealth = async (addData) => {
  const { title, price, body, user, category, img } = addData;

  if (!title || !price || !body || !user || !img || category === options[0]) {
    needAllContent();
    return;
  }
  try {
    await addDoc(collection(db, 'info'), addData);
    addAllContent();
  } catch (error) {
    failAllContent();
  }
};

export { getItems, getHealth, deleteHealth, editHealth, addHealth };
