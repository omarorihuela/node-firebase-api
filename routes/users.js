const { Router } = require('express');
const router = Router();
const { nanoid } = require('nanoid');
const md5 = require('md5');

const admin = require('firebase-admin');
const db = admin.firestore();

let usersCollection = db.collection('users');

// :: Create new User ::
router.post('/createUser', async (req, res) => {

    try {
        console.log(req.body);
        // Generate random ID
        let id = await nanoid(10);  

        let { name, email, password } = req.body;

        await usersCollection.doc(id).set({
            id : id,
            name : name,
            email : email,
            password : md5(password)
        })
                
        return res.status(200).json();
    
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
})


// :: Get all Users ::
router.get('/allUsers', async (req, res) => {

    try {

        let userQuery = await usersCollection.get();
        let userDocuments = userQuery.docs;

        // Add each user to users array
        let users = userDocuments.map( user => {
            user = user.data();
            return {
                id : user.id,
                name : user.name,
                email : user.email,
                password : user.password
            }
        })

        // Check if there is a Point Subcollection in each user document
        for (let i = 0; i < users.length ; i++ ){

            let pointQuery = usersCollection.doc(users[i].id).collection('points');
            let pointsDocuments = await pointQuery.get();

            pointsDocuments = pointsDocuments.docs;

            if (pointsDocuments.length > 0) {

                users[i].points = [];

                pointsDocuments.forEach( ( point, pointNumber ) => {

                    users[i].points[pointNumber] = point.data();

                });
                console.log(users[i]);
            }
        }

        // console.log(users);

        return res.status(200).json(users);
        

    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
})


// :: Find User By ID ::
router.get('/findUser/:id', async (req, res) => {

    try {

        let { id } = req.params;

        let user = await usersCollection.doc(id).get();

        if (user.exists) {
            return res.status(200).json(user.data())
        }else {
            return res.status(500).json();
        }

    } catch (error) {
        return res.status(500).send(error)
    }
})


// :: Delete User By ID ::
router.delete('/deleteUser/:id', async (req, res) => {

    try {

        let { id } = req.params;

        let pointsCollection = usersCollection.doc(id).collection('points');
        let documents = await pointsCollection.get();
        
        documents = documents.docs;

        if (documents.length > 0 ) {
        
            documents.forEach( async document => {
                console.log(document.data().id);
                await pointsCollection.doc(document.data().id).delete();
            });
        }

        await usersCollection.doc(id).delete();

        return res.status(200).json();

    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
})


// :: Update User By ID ::
router.put('/updateUser/:id', async (req, res) => {
    
    try {

        let { id } = req.params
        let { name, email, password } = req.body;

        await usersCollection.doc(id)
            .update({
                id : id,
                name : name,
                email : email,
                password : md5(password)
        })
                
        return res.status(200).json();
    
    } catch (error) {
        return res.status(500).send(error)
    }
})

module.exports = router;