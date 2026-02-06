import imageCompression from 'browser-image-compression';
import { convertHEIC } from './convertHeic';
import { logger } from './logger';

/**
 * Image processing utilities
 */

/**
 * Compression options for images
 */
const COMPRESSION_OPTIONS = {
    maxSizeMB: 2,           // Max file size in MB
    maxWidthOrHeight: 2000, // Max dimension
    useWebWorker: true,     // Use web worker for better performance
    fileType: 'image/webp', // Output as WebP for smaller size
};

/**
 * Check if file is HEIC/HEIF format
 */
const isHeicFile = (file) => {
    return (
        file.type === 'image/heic' ||
        file.name.toLowerCase().endsWith('.heic') ||
        file.name.toLowerCase().endsWith('.heif')
    );
};

/**
 * Compress an image file
 * @param {File} file - Image file to compress
 * @returns {Promise<File>} Compressed file
 */
const compressImage = async (file) => {
    try {
        const originalSizeMB = (file.size / 1024 / 1024).toFixed(2);
        logger.log(`Compressing: ${file.name} (${originalSizeMB}MB)`);

        const compressedFile = await imageCompression(file, COMPRESSION_OPTIONS);

        const compressedSizeMB = (compressedFile.size / 1024 / 1024).toFixed(2);
        logger.log(`Compressed: ${file.name} ${originalSizeMB}MB → ${compressedSizeMB}MB`);

        return compressedFile;
    } catch (error) {
        logger.warn('Compression failed, using original file:', error);
        return file;
    }
};

/**
 * Process a single image file (convert HEIC if needed, then compress)
 * @param {File} file - Image file to process
 * @returns {Promise<{file: File, url: string}>}
 */
export const processImage = async (file) => {
    let processedFile = file;

    // Convert HEIC first if needed
    if (isHeicFile(file)) {
        try {
            const blob = await convertHEIC(file);
            processedFile = new File([blob], file.name.replace(/\.heic$/i, '.jpg'), { type: 'image/jpeg' });
        } catch (err) {
            logger.warn('HEIC conversion failed, using original file', err);
        }
    }

    // Compress the image
    const compressedFile = await compressImage(processedFile);

    return { file: compressedFile, url: URL.createObjectURL(compressedFile) };
};

/**
 * Create unique key for image file based on metadata
 * @param {File} file - Image file
 * @returns {string} Unique key
 */
export const createImageKey = (file) => {
    return `${file.name}-${file.size}-${file.lastModified}`;
};

/**
 * Check if image already exists in array
 * @param {File} file - File to check
 * @param {Array} existingImages - Array of existing image objects
 * @returns {boolean}
 */
export const isDuplicateImage = (file, existingImages) => {
    const newKey = createImageKey(file);
    return existingImages.some(img =>
        img.file && createImageKey(img.file) === newKey
    );
};

/**
 * Process multiple image files
 * @param {FileList|Array} files - Files to process
 * @returns {Promise<Array>} Processed images
 */
export const processImages = async (files) => {
    const fileArray = Array.from(files);
    logger.log(`Processing ${fileArray.length} images`);

    const processed = await Promise.all(fileArray.map(processImage));

    logger.log(`Successfully processed ${processed.length} images`);
    return processed;
};

/**
 * Filter out duplicate images
 * @param {Array} newImages - New images to add
 * @param {Array} existingImages - Existing images
 * @returns {Array} Unique new images
 */
export const filterDuplicates = (newImages, existingImages) => {
    const unique = newImages.filter(
        newImg => !isDuplicateImage(newImg.file, existingImages)
    );

    if (unique.length < newImages.length) {
        logger.log(`Filtered out ${newImages.length - unique.length} duplicate images`);
    }

    return unique;
};
