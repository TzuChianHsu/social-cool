import React, {useEffect, useState }  from 'react';
import firebase from '../utils/firebase'
import 'firebase/firestore';
import { List } from 'semantic-ui-react'
import { getTopicList } from '../api/posts'

const Topics = () =>{
 const [ topics, setTopics] = useState<any>()
  useEffect(()=> {
    const fetchData = async () => {
    const data = await getTopicList({})
     setTopics(data)
    return data
    }
   fetchData()
    // firebase.firestore().collection('topics').get().then((collectionSnapshot) =>{
    //   const data = collectionSnapshot.docs.map(doc => {
    //     return doc.data();
    //   })
    //   setTopics(data)
    // } 
    // )
  }, [])
  return <List animated selection>
    {
        topics?.map((topic: any) => {
            return <List.Item key={topic.name}>{topic.name}</List.Item>
        })
    }
  </List>
}

export default Topics