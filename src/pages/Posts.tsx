import React, {useEffect, useState } from 'react';
import { Grid, Item, Image, Icon } from 'semantic-ui-react';
import Topics from '../components/topics';
import firebase from '../utils/firebase'
import 'firebase/firestore';

const Post =(props: any) =>{
  const [posts, setPosts] = useState<any>()
   useEffect(()=> {
    firebase.firestore().collection('posts').get().then((collectionSnapshot) =>{
      const data = collectionSnapshot.docs.map(doc => {
        const id = doc.id
        return { ...doc.data(), id }
      })
      setPosts(data)
    } 
    )
  })
  return (
    <Grid>
      <Grid.Row type="flex">
        <Grid.Column width={3}><Topics></Topics></Grid.Column>
        <Grid.Column width={10}><Item.Group>{ posts?.map((post: any) => {
          return <Item key={post.id}>
            <Item.Image src={post?.imageUrl}></Item.Image>
            <Item.Content>
              <Item.Meta>
                {
                  post.author.photoURL ? <Image src={post.author.photoURL}></Image> : <Icon name="user circle"></Icon>
                }
                {post.topic}:{post.author.displayName || "使用者"}
              </Item.Meta>
              <Item.Header></Item.Header>
              <Item.Description></Item.Description>
              <Item.Extra>
                留言 0 讚 0
              </Item.Extra>
            </Item.Content>
          </Item>
        })}</Item.Group></Grid.Column>
        <Grid.Column width={3}>空白</Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default Post