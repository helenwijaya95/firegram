import { useState, useEffect } from "react";
import { projectStorage } from "../firebase/config";

const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    // will be fired everytime the file changed
    useEffect(() => {
        // references
        const storageRef = projectStorage.ref(file.name);

        // whenever the state changed, it's gonna fire a function
        storageRef.put(file).on('state_changed', (snap) => {
            // figure out the progress of the upload 

            // upload percentage
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, (err) => {
            setError(err);
        }, async() => {
            // when the upload fully complete
            // async because using await
            const url = await storageRef.getDownloadURL();
            setUrl(url);
        })
    }, [file]);

    return { progress, url, error }
}

export default useStorage;