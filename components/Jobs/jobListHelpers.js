export const listOrderingConfig = {
    // ... existing config as defined in JobList
};

// Function to help generate unique identifiers for job cards
export const generateUid = (src, extId) => {

    return `_${Math.random().toString(36).substr(2, 9)}`;
};

// Function to determine where to insert ad cards based on index and job list length
export const insertAdCardAtIndexes = (index, jobListLength) => {
    // Logic for determining where ad cards should be inserted based on index
    const config = listOrderingConfig[`${jobListLength}`] || {};
    return config.displayAds && config.displayAds.includes(index);
};

// Function to determine decoration for the job card
export const getCardDecoration = ({index, jobListLength, jobTitle, jobSrc, decorationType, company}) => {
    const decorations = ['noExperience', 'immediateStart', 'highSalary'];
    let cardDecoration = 'plain';


    if (decorationType) {
        switch (decorationType) {
            case 'randomTags':
            case 'randomTagsWithWhatsappFlow':
            case 'randomTagsWithCPACards':
            case 'randomTagsSortedByLocation':
                // Logic to apply specific decorations based on index, jobTitle, or jobSrc

                if (company === 'Lyft') {

                } else if (jobSrc === 'serp') {
                    cardDecoration = 'serp';
                } else if (jobListLength < 4 && index === 1 || jobListLength >= 4 && (index === 1 || index % 2 === 0)) {
                    cardDecoration = decorations[parseInt(jobTitle.replace(/\s/g, ''), 36) % decorations.length];
                }
                break;
            // The original switch case did not have a default case, but it could be added if needed:
            default:
                cardDecoration = 'plain';
        }
    }
    return cardDecoration;
};