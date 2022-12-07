import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

export default [
        {
            url: "/api/getList",
            method: "get",
            response: () => {
                // return Mock.mock({
                // "data|1-10": [
                //     {
                //     "title|1-10": "標題",
                //     "content|1-10": "內容",
                //     "topic|+1": [
                //         "美食", "電影", "運動"
                //     ],
                //     "createdAt": Mock.mock('@date'),
                //     "author": Mock.mock({
                    
                //         "displayName|1-10": "標題",
                //         "photoURL": Mock.mock('@image',),
                //         "uid": Mock.mock('@guid'),
                //         "email": Mock.mock('@email')
                    
                //     }),
                //     "imageURL": Mock.mock('@image'),
                //     "id": Mock.mock('@id'),
                //     }
                // ]
                // })
            },
        },
        {
            url: "/api/getTopicList",
            method: "get",
            response: () => {
                return [{name: '電影'},{name: '美食'},{name: '運動'}]
            },
        },
        {
            url: "/api/getPostList",
            method: "get",
            response: () => {
              return Mock.mock({
                "data|1-10": [
                    {
                    "title|1-10": "標題",
                    "content|1-10": "內容",
                    "topic|+1": [
                        "美食", "電影", "運動"
                    ],
                    "createdAt": Mock.mock('@date'),
                    "author": Mock.mock({
                    
                        "displayName|1-10": "使用者",
                        "photoUrl": Mock.mock('@image(50x50)',),
                        "uid": Mock.mock('@guid'),
                        "email": Mock.mock('@email')
                    
                    }),
                    "imageUrl": Mock.mock('@image(200x200)'),
                    "id": Mock.mock('@id'),
                    }
                ]
                })
              
            },      
        },
        {
            url: `/api/getPostById`,
            method: "get",
            response: () => {
              return Mock.mock({
                    "title|1-10": "標題",
                    "content|1-10": "內容",
                    "topic|+1": [
                        "美食", "電影", "運動"
                    ],
                    "createdAt": Mock.mock('@date'),
                    "author": Mock.mock({
                    
                        "displayName|1-10": "使用者",
                        "photoUrl": Mock.mock('@image(50x50)',),
                        "uid": Mock.mock('@guid'),
                        "email": Mock.mock('@email')
                    
                    }),
                    "imageUrl": Mock.mock('@image(200x200)'),
                    "id": Mock.mock('@id'),    
                })
              
            },      
        }
] as MockMethod[]
