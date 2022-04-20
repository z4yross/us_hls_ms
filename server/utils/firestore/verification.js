import app from './initializeApp';
import { getFirestore } from "firebase-admin/firestore";
import errorStrings from '../errors';
import { registerStream, unregisterStream } from '../../hls';

const db = getFirestore(app);

export async function changeStreamState(uid, state) {
    try {
        const streamRef = db.collection("streams").doc(uid);

        await streamRef.set({ 'state': state }, { merge: true });

        // if (state === true)
        //     registerStream(uid);
        // if (state === false)
        //     unregisterStream(uid);

        return state;
    } catch (error) {
        throw error;
    }
}

export async function getStreamState(uid) {
    try {
        const streamRef = db.collection("streams").doc(uid);
        const streamSnap = await streamRef.get()

        if (!streamSnap.exists) return false;

        return streamSnap.state;
    } catch (error) {
        throw error;
    }
}

export async function getAllStreamsStates() {
    try {
        let docsState = {}

        const streamsRef = db.collection("streams");
        const streamsCollection = await streamsRef.get()

        streamsCollection.forEach((doc) => {
            docsState[doc.id] = doc.data()
        })

        return docsState;
    } catch (error) {
        throw error;
    }
}

export async function registerAllStreamsStates() {
    try {
        const streamsRef = db.collection("streams");
        const streamsCollection = await streamsRef.get()

        streamsCollection.forEach((doc) => {
            if (doc.data().state === true)
                registerStream(doc.id);
            else if (doc.data().state === false)
                unregisterStream(doc.id);
        })
    } catch (error) {
        throw error;
    }
}


