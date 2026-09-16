import { describe, expect, it, vi, beforeEach } from "vitest";
import type { FileRejection } from "react-dropzone";
import {
    defaultSanitizeFilename,
    generateUniqueFileName,
    createRenamedFile,
    formatRejectionErrors,
    revokeFilePreview,
    formatFileSize,
} from "./useFileUploader";
import { calculateTargetDimensions } from "./imageOptimizer";
import type { UploaderFile } from "./fileUploader.types";

describe("useFileUploader utilities", () => {
    describe("1. Duplicate Filtering & Unique Filename Generation", () => {
        it("returns original filename when no duplicate exists", () => {
            const existing = new Set(["report.pdf", "avatar.png"]);
            expect(generateUniqueFileName("document.docx", existing)).toBe("document.docx");
        });

        it("appends incremental numeric suffix when filename already exists", () => {
            const existing = new Set(["photo.png"]);
            expect(generateUniqueFileName("photo.png", existing)).toBe("photo (1).png");
        });

        it("increments numeric suffix sequentially when multiple collisions exist", () => {
            const existing = new Set(["photo.png", "photo (1).png", "photo (2).png"]);
            expect(generateUniqueFileName("photo.png", existing)).toBe("photo (3).png");
        });

        it("handles files without extension properly", () => {
            const existing = new Set(["LICENSE", "LICENSE (1)"]);
            expect(generateUniqueFileName("LICENSE", existing)).toBe("LICENSE (2)");
        });

        it("handles files with multiple dots correctly", () => {
            const existing = new Set(["archive.tar.gz"]);
            expect(generateUniqueFileName("archive.tar.gz", existing)).toBe("archive.tar (1).gz");
        });
    });

    describe("2. Dropzone Rejection Formatting", () => {
        const createMockRejection = (
            name: string,
            type: string,
            errors: FileRejection["errors"]
        ): FileRejection => ({
            file: Object.assign(new File(["dummy"], name, { type }), {
                path: name,
                relativePath: name,
            }),
            errors,
        });

        it("formats a single rejection error with file name and message", () => {
            const rejections: FileRejection[] = [
                createMockRejection("large-video.mp4", "video/mp4", [
                    {
                        code: "file-too-large",
                        message: "File is larger than 10MB",
                    },
                ]),
            ];

            const formatted = formatRejectionErrors(rejections);
            expect(formatted).toEqual(["large-video.mp4: File is larger than 10MB"]);
        });

        it("formats multiple errors for a single file into comma-separated message", () => {
            const rejections: FileRejection[] = [
                createMockRejection("bad-file.exe", "application/x-msdownload", [
                    { code: "file-invalid-type", message: "File type must be image/*" },
                    { code: "file-too-large", message: "File is larger than 5MB" },
                ]),
            ];

            const formatted = formatRejectionErrors(rejections);
            expect(formatted).toEqual([
                "bad-file.exe: File type must be image/*, File is larger than 5MB",
            ]);
        });

        it("formats multiple rejected files correctly", () => {
            const rejections: FileRejection[] = [
                createMockRejection("file1.png", "image/png", [
                    { code: "file-too-large", message: "Size exceeded" },
                ]),
                createMockRejection("file2.exe", "application/x-msdownload", [
                    { code: "file-invalid-type", message: "Type not supported" },
                ]),
            ];

            const formatted = formatRejectionErrors(rejections);
            expect(formatted).toHaveLength(2);
            expect(formatted[0]).toBe("file1.png: Size exceeded");
            expect(formatted[1]).toBe("file2.exe: Type not supported");
        });
    });

    describe("3. Object URL Memory Management & Revocation", () => {
        beforeEach(() => {
            if (typeof URL.revokeObjectURL !== "function") {
                URL.revokeObjectURL = vi.fn();
            } else {
                vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {});
            }
        });

        it("calls URL.revokeObjectURL when preview is a blob URL", () => {
            const spy = vi.spyOn(URL, "revokeObjectURL");
            const file: UploaderFile = {
                id: "1",
                file: new File(["dummy"], "test.png", { type: "image/png" }),
                sizeLabel: "100 Bytes",
                preview: "blob:http://localhost:3000/123-abc",
            };

            revokeFilePreview(file);
            expect(spy).toHaveBeenCalledWith("blob:http://localhost:3000/123-abc");
        });

        it("does not call URL.revokeObjectURL when preview is not a blob URL", () => {
            const spy = vi.spyOn(URL, "revokeObjectURL");
            const file: UploaderFile = {
                id: "2",
                file: new File(["dummy"], "doc.pdf", { type: "application/pdf" }),
                sizeLabel: "100 Bytes",
                preview: "data:image/png;base64,iVBORw0KGgo=",
            };

            revokeFilePreview(file);
            expect(spy).not.toHaveBeenCalled();
        });

        it("safely handles undefined or empty preview gracefully", () => {
            const spy = vi.spyOn(URL, "revokeObjectURL");
            revokeFilePreview(undefined);
            revokeFilePreview({
                id: "3",
                file: new File(["dummy"], "test.txt", { type: "text/plain" }),
                sizeLabel: "10 Bytes",
                preview: undefined,
            });
            expect(spy).not.toHaveBeenCalled();
        });
    });

    describe("4. Filename Sanitization", () => {
        it("strips path traversal sequences (../ and ..\\)", () => {
            expect(defaultSanitizeFilename("../../etc/passwd.txt")).toBe("etc_passwd.txt");
            expect(defaultSanitizeFilename("..\\..\\windows\\system32\\cmd.exe")).toBe("windows_system32_cmd.exe");
        });

        it("replaces illegal filesystem characters (< > : \" / \\ | ? *) with underscores", () => {
            expect(defaultSanitizeFilename('bad<name>:test"file|cool?.png')).toBe("bad_name_test_file_cool.png");
        });

        it("normalizes excessive spaces and multiple underscores", () => {
            expect(defaultSanitizeFilename("   my    cool     photo   .jpg")).toBe("my cool photo.jpg");
            expect(defaultSanitizeFilename("___file___name___.png")).toBe("_file_name.png");
        });

        it("provides fallback name when all characters are stripped", () => {
            expect(defaultSanitizeFilename(".....")).toBe("unnamed_file");
        });
    });

    describe("5. File Renaming Utility", () => {
        it("returns original File object if newName is identical", () => {
            const original = new File(["test"], "sample.jpg", { type: "image/jpeg" });
            const result = createRenamedFile(original, "sample.jpg");
            expect(result).toBe(original);
        });

        it("creates a new File object with updated name when renamed", () => {
            const original = new File(["test"], "sample.jpg", { type: "image/jpeg" });
            const renamed = createRenamedFile(original, "sample (1).jpg");
            expect(renamed).not.toBe(original);
            expect(renamed.name).toBe("sample (1).jpg");
            expect(renamed.type).toBe("image/jpeg");
        });
    });

    describe("6. File Size Formatting", () => {
        it("formats 0 bytes", () => {
            expect(formatFileSize(0)).toBe("0 Bytes");
        });

        it("formats KB, MB, and GB accurately", () => {
            expect(formatFileSize(1024)).toBe("1 KB");
            expect(formatFileSize(1024 * 1024 * 2.5)).toBe("2.5 MB");
            expect(formatFileSize(1024 * 1024 * 1024 * 1.2)).toBe("1.2 GB");
        });
    });

    describe("7. Canvas Image Optimization Dimensions", () => {
        it("leaves dimensions unchanged if already within max bounds", () => {
            const dims = calculateTargetDimensions(1200, 800, 2048, 2048);
            expect(dims).toEqual({ width: 1200, height: 800 });
        });

        it("scales landscape image preserving aspect ratio", () => {
            const dims = calculateTargetDimensions(4000, 2000, 2048, 2048);
            expect(dims).toEqual({ width: 2048, height: 1024 });
        });

        it("scales portrait image preserving aspect ratio", () => {
            const dims = calculateTargetDimensions(3000, 6000, 2048, 2048);
            expect(dims).toEqual({ width: 1024, height: 2048 });
        });
    });
});

