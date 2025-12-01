export async function convertHEIC(file) {
    const heic2any = (await import("heic2any")).default;
    return heic2any({ blob: file, toType: "image/jpeg" });
}
