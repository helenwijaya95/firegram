import { useState, useEffect } from "react";
import { projectStorage, projectFireStore, timestamp } from "../firebase/config";

const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    // will be fired everytime the file changed
    useEffect(() => {
        console.log(file)
        // references
        const storageRef = projectStorage.ref(file.name);
        const collectionRef = projectFireStore.collection('images');

        // whenever the state changed, it's gonna fire a function
        storageRef.put(file).on('state_changed', (snap) => {
            // figure out the progress of the upload 

            // upload percentage
            console.log('snap')
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, (err) => {
            setError(err);
        }, async() => {
            // when the upload fully complete
            // async because using await
            const url = await storageRef.getDownloadURL();
            const createdAt = timestamp();
            collectionRef.add({url, createdAt})
            setUrl(url);
        })
    }, [file]);

    return { progress, url, error }
}

export default useStorage;