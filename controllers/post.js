const Post = require('../models/post');
const Comment = require('../models/comment');

exports.getPosts = (req, res, next) => {

    /* Pagination logic here if required */
    Post.find()
    .then(posts => {
        /* return posts  */
        //render posts 
        
    })
    .catch(err => {
        console.log(err);
    })
};
exports.postSinglePost = (req, res, next) => {

   const content = req.body.content;
   const userId = req.session.user._id;
   const post = new Post({
       content: content,
       userId: userId
   })

   post.save()
   .then(result => {
       //redirect to the home page;
       //res.redirect('/home');
   })
   .catch(err => {
       console.log(err);
   })

};
exports.getSinglePost = (req, res, next) => {
     const postId = req.params.postId;
     Post.findById(postId)
     .then(post => {
         if(!post){
            //redirect to homepage;
         }
         Comment.find({postId: postId})
         .populate('userId', 'username')
         .execPopulate()
         .then(comments => {
             /* render page and send post and coments as payload */
             //populating the userId with username;
         })
     })
     .catch(err => {
         console.log(err);
     })
};

exports.addComment = (req, res, next) => {
    const comment = req.body.comment;
    const postId = req.body.postId;
    const userId = req.body.userId;
    const cmt = new Comment({
        comment:comment,
        userId:userId,
        postId: postId
    });
    cmt.save()
    .then(result => {
        //redirect to the single post page
    })
    .catch(err => {
        console.log(err);
    })
};