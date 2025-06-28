export const formatImageUrl = (imagePath, req) => {
    if (!imagePath) return null;

    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }

    const host = `${req.protocol}://${req.get('host')}`;
    return `${host}${imagePath}`;
}