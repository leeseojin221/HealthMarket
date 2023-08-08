import { collection, getDocs, query } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "./firebase";

const getHealth = async () => {
    const q = query(collection(db, 'info'));
    const querySnapshot = await getDocs(q);

    const initialInfos = [];

    querySnapshot.forEach((doc) => {
        const data = {
            id: doc.id,
            ...doc.data()
        };
        console.log('data=>', data);
        initialInfos.push(data);
        console.log('initialInfos=>', initialInfos)
    });
    return initialInfos;

};



export { getHealth }
