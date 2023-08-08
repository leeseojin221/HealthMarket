import axios from 'axios'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from './firebase'

const getItems = async () => {
    // 변경사항 storys infos
    const q = query(collection(db, "상품들"))
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


export { getItems }