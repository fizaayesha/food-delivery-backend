import dns from "dns";

function validateEmailDomain(email) {
    return new Promise((resolve, reject) => {
        // Extract domain from email
        const domain = email.substring(email.lastIndexOf("@") + 1);
        
        // Perform DNS lookup for MX records
        dns.resolveMx(domain, (err, addresses) => {
            if (err) {
                resolve(false);
                return;
            }
            
            // Check if any MX record is found
            if (addresses && addresses.length > 0) {
                // Define allowed domains
                const allowedDomains = [".edu", "st.jmi.ac.in"]; // Add more domains as needed
                
                // Check if the domain matches any of the allowed domains
                const isValidDomain = allowedDomains.some((allowedDomain) =>
                domain.endsWith(allowedDomain)
            );
            
            // Check if the domain is not Gmail
            const isNotGmail = !domain.includes("gmail.com");
            
            if (isValidDomain && isNotGmail) {
                resolve(true);
            } else {
                resolve(false);
            }
        } else {
            reject("No MX records found for the domain");
        }
    });
});
}


export default validateEmailDomain;