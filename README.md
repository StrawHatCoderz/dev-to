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
  draftId
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

database implementation

# tables

- user
- story
- draft
- follower
- following
- claps
- comments

# user

- id: integer pk serial
- name: string not null unique
- created on: timestamp

# story

- story id: integer pk serial
- title: string unique
- content: string not null
- author id: fk to user
- created on: timestamp

# draft

- draft id: integer
- title: string unique
- content: string
- author id: integer
- created on: timestamp
- updated on: timestamp

# follower

- follower id (pk) : integer
- userId: integer
- follower (integer): integer
- created on: timestamp

# following

- following id (pk): integer
- user id: integer
- following user id: integer
- created on:timestamp

# claps

- clap id: integer
- story id: integer fk to story
- user id (who clapped): integer
- clapped on:timestamp

# comments

- comment id: integer
- story id: integer fk to story
- content: string
- user id (who commented): integer
- commented on: timestamp

<<<<<<< HEAD
# session
- user id : 
=======
# Handlers

- [ ] user
  - [ ] createUser
  - [ ] getUser
  - [ ] deleteUser

- [ ] story
  - [ ] createStory
  - [ ] getStory
  - [x] deleteStory
  - [ ] getStories

- [ ] drafts
  - [ ] createDraft
  - [ ] getDraft
  - [x] deleteDraft
  - [ ] updateDraft
  - [ ] getDrafts

- [x] comments
  - [x] addComment
  - [x] getComments
>>>>>>> b0445b74a95b386d9b282de19b1df28476411b65
