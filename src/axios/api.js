import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./firebase";

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

const getItems = async () => {
    // 변경사항 storys infos
    const q = query(collection(db, "info"))
    const querySnapshot = await getDocs(q)

    const Items = []

    querySnapshot.forEach((doc) => {
        const data = {
            id: doc.id,
            ...doc.data(),
        }
        Items.push(data)
    })
    return Items
}


export { getItems, getHealth }

