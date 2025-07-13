export const removeTrailingHashtags = (str: string): string => {
    const tokens = str?.split(/\s+/);
    
    // Start from the end and work backwards
    for (let i = tokens?.length - 1; i >= 0; i--) {
        const token = tokens[i];
        // Check if token is a valid hashtag (starts with # and has content)
        if (token.startsWith('#') && token.length > 1) {
            tokens?.splice(i, 1);  // Remove this hashtag token
        } else {
            // Stop at first non-hashtag
            break;
        }
    }
    
    return tokens?.join(' ');
};