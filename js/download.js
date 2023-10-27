export default function download(filename, data) {
    const blob = new Blob([data], {type: 'text/csv'});
    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else{
        const el = window.document.createElement('a');
        el.href = window.URL.createObjectURL(blob);
        el.download = filename;
        document.body.appendChild(el);
        el.click();
        URL.revokeObjectURL(el.href)
        document.body.removeChild(el);
    }
}