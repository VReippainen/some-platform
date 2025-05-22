import { BlobServiceClient, BlobSASPermissions } from '@azure/storage-blob';
import config from '../config/config';

const AZURE_STORAGE_CONNECTION_STRING = config.azureStorage.connectionString;
const AZURE_STORAGE_CONTAINER_NAME = config.azureStorage.containerName;
const IMAGE_URL_EXPIRATION_TIME_IN_SECONDS = 300;

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_CONTAINER_NAME);

class BlobService {
  /**
   * Upload a blob to Azure Blob Storage and return its URL
   * @param blobName The name of the blob
   * @param buffer The file buffer to upload
   * @param contentType The MIME type of the file
   * @returns The URL of the uploaded blob
   */
  static async createBlob(blobName: string, buffer: Buffer, contentType: string): Promise<string> {
    // TODO: Implement file upload logic
    // Example:
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadData(buffer, { blobHTTPHeaders: { blobContentType: contentType } });
    return blockBlobClient.url;
  }

  /**
   * Delete a blob from Azure Blob Storage
   * @param blobName The name of the blob
   */
  static async deleteBlob(blobName: string): Promise<void> {
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.deleteIfExists();
  }

  /**
   * Generate a signed URL (SAS) for a blob
   * @param blobName The name of the blob
   * @param options Optional: expiresIn (seconds)
   * @returns The signed URL
   */
  static async generateSignedUrl(blobName: string, options?: { expiresIn?: number }): Promise<string> {
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const expiresOn = new Date(Date.now() + (options?.expiresIn ?? IMAGE_URL_EXPIRATION_TIME_IN_SECONDS) * 1000);
    const sasToken = await blockBlobClient.generateSasUrl({
      expiresOn,
      permissions: BlobSASPermissions.from({ read: true }),
    });
    return sasToken;
  }
}

export default BlobService; 