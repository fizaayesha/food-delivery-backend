import dns from "dns";
// function validateEmailDomain(email) {
//   const domain = email.substring(email.lastIndexOf("@") + 1);
//   let isVerified = false;
//   dns.resolveMx(domain, (err, addresses) => {
//     if (err) {
//       console.error("DNS lookup error:", err);
//       return;
//     }

//     if (addresses && addresses.length > 0) {
//       const allowedDomains = [".edu", "st.jmi.ac"];
//       const isValidDomain = allowedDomains.some((allowedDomain) =>
//         domain.endsWith(allowedDomain)
//       );

//       // Check if the domain is not Gmail
//       const isNotGmail = !domain.includes("gmail.com");

//       if (isValidDomain && isNotGmail) {
//         console.log(`Email domain (${domain}) is validated.`);
//         isVerified = true;
//       } else {
//         console.log(`Email domain (${domain}) is not allowed.`);
//         isVerified = false;
//       }
//     } else {
//       console.log("No MX records found for the domain.");
//       isVerified = true;
//     }
//   });
//   return isVerified;
// }
// // Example usage
// // validateEmailDomain('example@example.edu');
// // validateEmailDomain('example@st.jmi.ac');
// // validateEmailDomain('example@gmail.com');

function validateEmailDomain(email) {
    return new Promise((resolve, reject) => {
        // Extract domain from email
        const domain = email.substring(email.lastIndexOf("@") + 1);
        
        // Perform DNS lookup for MX records
        dns.resolveMx(domain, (err, addresses) => {
            if (err) {
                reject("DNS lookup error");
                return;
            }
            
            // Check if any MX record is found
            if (addresses && addresses.length > 0) {
                // Define allowed domains
                const allowedDomains = [".edu", "st.jmi.ac"]; // Add more domains as needed
                
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