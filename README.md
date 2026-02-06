# dev-to

## user structure

```
const mockUsers = [
   { id: 1, name: 'deadpool', followers: [], following: [],}
];
```

drafts: [], stories: []

## story structure should be :

```
drafts = [{
  title : abc title,
  storyContent : abcd content
  authorId : 1
}]

published = [
  {
  title : abc title,
  storyContent : abcd content
  authorId : 1,
  claps : [],
  comments: []
}

  ]
```

## comments structure should be:

```
comments : [{
  id:
  content:
  storyId:
  userId://id to know who commented
}
]
```

## claps structure should be

claps : [{ clapId : clappedBy: storyId }]
