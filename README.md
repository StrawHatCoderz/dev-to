# dev-to

## user structure

````
const mockUsers = [ { id: 1, name: 'deadpool', followers: [], following: [],
stories: { drafts: [], published: [], }, },

];
````

## story structure should be :

````
stories : {
  drafts : [{
    id : 1,
    title : abc title, 
    storyContent : abcd content
    authorId : 1,
    claps : [],
    comments: []
  }], 
  published : [
    {
    id : 1,
    title : abc title, 
    storyContent : abcd content
    authorId : 1,
    claps : [],
    comments: []
  }
    
  ]
}
````

## comments structure should be:

````
comments : [{
  id:
  content:
  storyId:
  userId://id to know who commented
}
]

````
## claps structure should be 

claps : [{
  clapId :
  clappedBy:
  storyId
}]
