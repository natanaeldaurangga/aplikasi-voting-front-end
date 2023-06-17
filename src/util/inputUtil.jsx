export const getInputFilePath = ref => {
    if(ref){
        const [file] = ref.files;
        if(file){
            return URL.createObjectURL(file);
        }
    }
    return null;
}