# dev-to

## user structure
const mockUsers = [
	{
		id: 1,
		name: 'deadpool',
		followers: [],
		following: [],
		stories: {
			drafts: [],
			published: [],
		},
	},
	
];

## story structure should be :
stories : {
  drafts : [{
    title : abc title, 
    storyContent : abcd content
    storyId : 1,
    authorId : 1,
    claps : 10,
    comments: []
  }]
} 

## comments structure should be:
comments : [{
  id:
  content:
  storyId:
  userId://id to know who commented
}
]