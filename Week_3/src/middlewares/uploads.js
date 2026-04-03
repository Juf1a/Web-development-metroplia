import sharp from 'sharp';

const createThumbnail = async (req, res, next) => {
    if(!req.file){
        next();
        return;
    }
    console.log(req.file.path);
    
    const outputPath = `uploads/${req.file.filename}_thumb.png`;

    await sharp(req.file.path).resize(160, 160).png().toFile(outputPath);

    next();
};

export { createThumbnail };