const { connectToDb, getDB } = require('../db.js');
const { ObjectId } = require('mongodb');
let db;
connectToDb((error) => {
    if (!error) {
        db = getDB();
    }
});

class Admin {

    getPosts(req, res) {
        // get all posts
        let posts = [];
        db.collection('posts')
            .find()
            .forEach(el => {
                posts.push(el);
            })
            .then(() => {
                res.status(200).json(posts);
            })
            .catch(() => {
                res.status(500).json({ error: 'Could not fetch the documents' });
            });
    }

    newPost(req, res) {
        // create a new post
        const post = req.body;
        db.collection('posts')
            .insertOne(post)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(() => {
                res.status(500).json({ error: 'Could not create a new document' });
            });
    }

    getPostsById(req, res) {
        // search news by title
        if (ObjectId.isValid(req.params.id)) {
            db.collection('posts')
                .findOne({ _id: new ObjectId(req.params.id) })
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(err => {
                    res.status(500).json({ err: 'could not find post by id' });
                });
        } else {
            res.status(500).json({ error: 'invalid type of id' });
        }
    }

    updatePostById(req, res) {
        // update post by id
        const update = req.body
        if (ObjectId.isValid(req.params.id)) {
            db.collection('posts')
                .updateOne({ _id: new ObjectId(req.params.id) }, { $set: update })
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(err => {
                    res.status(500).json({ err: 'Could not update a post' });
                });
        } else {
            res.status(500).json({ error: 'invalid type of id' });
        }
    }

    deletePostById(req, res) {
        if (ObjectId.isValid(req.params.id)) {
            db.collection('posts')
                .deleteOne({ _id: new ObjectId(req.params.id) })
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(err => {
                    res.status(500).json({ err: 'Could not delete a post' })
                });
        } else {
            console.log({ error: 'invalid type of id' });
        }
    }
}



module.exports = Admin;