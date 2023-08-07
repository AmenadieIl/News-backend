const { connectToDb, getDB } = require('../db.js');
let db;
connectToDb((error) => {
    if (!error) {
        db = getDB();
    }
});
const news = [];

class User {

    getNews(req, res) {


        db.collection('posts')
            .find()
            .forEach(el => {
                if (!news.includes(el)) {
                    news.push(el);
                }
            })
            .then(() => {
                res.status(200).json(news);
            })
            .catch(err => {
                res.status(500).json({ err: 'Could not find a news' });
            });
    }

    getNewsByTitle(req, res) {
        const gettedPosts = [];
        db.collection('posts')
            .find()
            .forEach((el) => {
                if (el.title.toLowerCase().includes(req.params.title.toLowerCase()) && !gettedPosts.includes(el)) {
                    gettedPosts.push(el);
                }
            })
            .then(() => {
                res.status(200).json(gettedPosts);
            })
            .catch(() => {
                res.status(500).json({ err: 'Could not find post by title' })
            })
    }

}
module.exports = User;