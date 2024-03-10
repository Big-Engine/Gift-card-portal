function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput[0];

    if (file) {
        // Use FormData to send the file to the server
        const formData = new FormData();
        formData.append('file', file);

        // Use fetch to send the file to the server
        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server
            console.log('Server response:', data);
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Please select a file before uploading.');
    }
}
