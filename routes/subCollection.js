const { Router } = require('express');
const router = Router();
const { nanoid } = require('nanoid');

const admin = require('firebase-admin');
const db = admin.firestore();

let usersCollection = db.collection('users');

// :: Create new Point Subcollection ::
router.post('/:user/createNew', async (req, res) => {

    try {
        let id = await nanoid(10);

        let { user } = req.params;
        let { quantity, reason } = req.body;
        
        let document = usersCollection.doc(user).collection('points');

        await document.doc(id).set({
            id : id,
            quantity : quantity,
            reason : reason
        })
                
        return res.status(200).json();
    
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
})


// :: Update a Point Subcollection ::
router.put('/update/:user/:idPoint', async (req, res) => {
    
    try {
        let { user, idPoint } = req.params;
        let { quantity, reason } = req.body;
        
        let pointDocument = usersCollection.doc(user).collection('points').doc(idPoint);
        await pointDocument.update({
            quantity : quantity,
            reason : reason
        })
                
        return res.status(200).json();
    
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
})

// :: Delete a Point Document ::
router.delete('/delete/:user/:idPoint', async (req, res) => {

    try {

        let { user, idPoint } = req.params;
        let pointDocument = usersCollection.doc(user).collection('points').doc(idPoint);

        await pointDocument.delete();

        return res.status(200).json();

    } catch (error) {
        return res.status(500).send(error)
    }
})

module.exports = router;