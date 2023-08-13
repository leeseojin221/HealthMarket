import { collection, deleteDoc, doc, getDocs, query, updateDoc, addDoc } from 'firebase/firestore';
import { db } from './firebase';

const getHealth = async () => {
  const q = query(collection(db, 'info'));
  const querySnapshot = await getDocs(q);

  const initialInfos = [];

  querySnapshot.forEach((doc) => {
    // console.log('doc=>', doc)
    const data = {
      id: doc.id,
      ...doc.data()
    };
    // console.log('data=>', data);
    initialInfos.push(data);
    // console.log('initialInfos=>', initialInfos)
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

// const addHealth = async (title, price, category, body, img, nickname, id) => {
//   try {
//     const healthCollection = collection(db, 'info');
//     const newHealthRef = await addDoc(healthCollection, {
//       title: title,
//       price: price,
//       category: category,
//       body: body,
//       img: img,
//       nickname: nickname,
//       id: id
//     });
//     console.log('Document written with ID: ', newHealthRef.id);
//   } catch (error) {
//     throw new Error('Error adding document: ' + error.message);
//   }
// };

export { getItems, getHealth, deleteHealth, editHealth };
