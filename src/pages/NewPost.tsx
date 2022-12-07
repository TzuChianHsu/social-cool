import React, {useEffect, useState, useMemo } from 'react';
import { Container, Header, Form, Image, Button } from 'semantic-ui-react';
import firebase from '../utils/firebase'
import 'firebase/firestore';
import 'firebase/storage';
import  { useNavigate } from 'react-router-dom'


const NewPost =(props: any) =>{
  let navigate = useNavigate();
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [topics, setTopics] = useState<any>()
  const [topicName, setTopicName] = useState<any>()
  const [file, setFile] = useState<any>()
  const [loading, setLoading] = useState(false)
  useEffect(()=> {
    firebase.firestore().collection('topics').get().then((collectionSnapshot) =>{
      const data = collectionSnapshot.docs.map(doc => {
        return doc.data();
      })
      setTopics(data)
    } 
    )
  })

  const topicOptions = topics?.map((topic: any)=> {
    return {
        text: topic.name,
        value: topic.name
    }
  })
  const previewUrl = useMemo(()=> {
    return file ? URL.createObjectURL(file) :"https://react.semantic-ui.com/images/wireframe/image.png"
  }, [file])

  const onSubmit = ()=> {
    setLoading(true)
   const documentRef = firebase.firestore().collection('posts').doc()
   const fileRef = firebase.storage().ref('post-images/' + documentRef.id)
   const metadata = {
    contentType: file.type
   }
   fileRef.put(file, metadata).then(()=> {
    fileRef.getDownloadURL().then((imageUrl)=> {
        documentRef.set({
            title,
            content,
            topic: topicName,
            createdAt: Date.now(),
            author: {
                displayName: firebase.auth().currentUser?.displayName || "",
                photoURL: firebase.auth().currentUser?.photoURL || "",
                uid: firebase.auth().currentUser?.uid || "",
                email:  firebase.auth().currentUser?.email || "",
            },
            imageUrl
        }).then(()=> {
            navigate('/')
        }).finally(()=>{
            setLoading(false)
        })
    })
   })
 
  }
  return (
   <Container>
    <Header>發表文章</Header>
    <Form onSubmit={onSubmit}>
        <Image src={previewUrl} size="small" floated="left"></Image>
        <Button basic as="label" htmlFor="post-image">上傳文章圖片</Button>
        <Form.Input type="file" id="post-image" style={{ display: 'none'}} onChange={(e: any)=> {
            setFile(e.target.files[0])
        }}></Form.Input>
        <Form.Input placeholder="輸入文章標題" value={title} onChange={(e)=> setTitle(e.target.value)}></Form.Input>
        <Form.TextArea placeholder="輸入文章內容" value={content} onChange={(e)=> setContent(e.target.value)}></Form.TextArea>
        <Form.Dropdown placeholder="選擇文章主題" options={topicOptions} selection value={topicName} onChange={(e, {value})=> {
            setTopicName(value)
        }}></Form.Dropdown>
        <Form.Button loading={loading}>送出</Form.Button>
    </Form>
   </Container>
  )
}

export default NewPost