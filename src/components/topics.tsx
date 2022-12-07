import React, {useEffect, useState }  from 'react';
import firebase from '../utils/firebase'
import 'firebase/firestore';
import { List } from 'semantic-ui-react'

const Topics = () =>{
 const [ topics, setTopics] = useState<any>()
  useEffect(()=> {
    firebase.firestore().collection('topics').get().then((collectionSnapshot) =>{
      const data = collectionSnapshot.docs.map(doc => {
        return doc.data();
      })
      setTopics(data)
    } 
    )
  })
  return <List animated selection>
    {
        topics?.map((topic: any) => {
            return <List.Item key={topic.name}>{topic.name}</List.Item>
        })
    }
  </List>
}

export default Topics