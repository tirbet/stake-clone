import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const r2 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
        secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY!,
    },
});

export async function uploadKycFile(
    userId: string,
    field: string,
    file: File | undefined | null
) {
    if (!file) return undefined;

    const ext = file.type === "image/png" ? "png" : "jpg";
    const key = `kyc/${userId}/${field}-${Date.now()}.${ext}`;

    // 🔑 convert File -> ArrayBuffer -> Uint8Array (or Buffer in Node)
    const arrayBuffer = await file.arrayBuffer();
    const body = new Uint8Array(arrayBuffer); // works in Node & edge

    await r2.send(
        new PutObjectCommand({
            Bucket: process.env.CLOUDFLARE_R2_BUCKET!,
            Key: key,
            Body: body,
            ContentType: file.type,
        })
    );

    return `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${key}`;
}
