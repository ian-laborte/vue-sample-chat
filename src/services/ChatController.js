import { db, storage } from "./firebase";


export const getChatFromDb = async () => {
    let chats = await new Promise((resolve, reject) => {
        try {
            db.ref("chats").on("value", snapshot => {
                let chats = [];
                snapshot.forEach((snap) => {
                    chats.push(snap.val());
                });
                resolve(chats);
            });
        } catch (error) {
            reject({
                error: true,
                message: 'Error Retrieving Chats'
            });
        }
    });
    return chats;
}

export const insertChatToDb = async (data, myEmail, blobImage = null ) => {
    try {

        const datestring = Date.now();


        const uploadFile = async () => {
            await storage
                .ref(`chatify/${ myEmail }/${ datestring }`)
                .put(blobImage);


            const url = await storage
                .ref(`chatify/${ myEmail }/${ datestring }`)
                .getDownloadURL();
 
            return url; // <-- Url that returns your uploaded image
        }

        await db.ref("chats").push({
            content: data.Chatbox,
            timestamp: Date.now(),
            uid: myEmail, 
            imageAttachment: blobImage !== null ? await uploadFile() : null
        });
    } catch (error) {
        console.log(error);
    }
}