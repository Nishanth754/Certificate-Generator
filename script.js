// Wait for the entire page to load before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- Get all the necessary elements from the DOM ---
    
    // Form Inputs
    const recipientNameInput = document.getElementById('recipient-name');
    const courseNameInput = document.getElementById('course-name');
    const completionDateInput = document.getElementById('completion-date');
    const issuerNameInput = document.getElementById('issuer-name');
    
    // Style Inputs
    const fontFamilySelect = document.getElementById('font-family');
    const fontColorInput = document.getElementById('font-color');
    const borderColorInput = document.getElementById('border-color');

    // Certificate Preview Elements
    const certificatePreview = document.getElementById('certificate-preview');
    const certRecipientName = document.getElementById('cert-recipient-name');
    const certCourseName = document.getElementById('cert-course-name');
    const certDate = document.getElementById('cert-date');
    const certIssuerName = document.getElementById('cert-issuer-name');

    // Download Button
    const downloadBtn = document.getElementById('download-btn');


    // --- Add Event Listeners for real-time updates ---

    // Function to update the certificate text content
    const updateCertificateText = () => {
        certRecipientName.textContent = recipientNameInput.value || 'Your Name';
        certCourseName.textContent = courseNameInput.value || 'Course Name';
        certIssuerName.textContent = issuerNameInput.value || 'Issuer Name';
        
        // Format the date to be more readable
        if (completionDateInput.value) {
            const date = new Date(completionDateInput.value);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            certDate.textContent = `on ${date.toLocaleDateString('en-US', options)}`;
        } else {
            certDate.textContent = 'on Date';
        }
    };

    // Function to update the certificate style
    const updateCertificateStyle = () => {
        certificatePreview.style.fontFamily = fontFamilySelect.value;
        certificatePreview.style.color = fontColorInput.value;
        certificatePreview.style.borderColor = borderColorInput.value;
    };

    // Attach the update functions to the 'input' event for each form element
    recipientNameInput.addEventListener('input', updateCertificateText);
    courseNameInput.addEventListener('input', updateCertificateText);
    completionDateInput.addEventListener('input', updateCertificateText);
    issuerNameInput.addEventListener('input', updateCertificateText);

    fontFamilySelect.addEventListener('change', updateCertificateStyle);
    fontColorInput.addEventListener('input', updateCertificateStyle);
    borderColorInput.addEventListener('input', updateCertificateStyle);
    
    // --- Download Functionality ---

    downloadBtn.addEventListener('click', () => {
        // Use the html2canvas library to create an image from the certificate div
        html2canvas(certificatePreview, {
            scale: 2, // Increase scale for higher resolution image
            backgroundColor: '#ffffff' // Ensure background is white
        }).then(canvas => {
            // Create a link element to trigger the download
            const link = document.createElement('a');
            link.download = 'certificate.png'; // Set the filename for the download
            link.href = canvas.toDataURL('image/png'); // Set the link's href to the image data
            link.click(); // Programmatically click the link to start the download
        });
    });

    // Initial call to populate the certificate with default values
    updateCertificateText();
    updateCertificateStyle();

});
