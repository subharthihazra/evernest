"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImg = void 0;
const imagekit_1 = __importDefault(require("imagekit"));
const uuid_1 = require("uuid");
const imagekit = new imagekit_1.default({
    publicKey: String(process.env.IMGKIT_PUB_KEY),
    privateKey: String(process.env.IMGKIT_PVT_KEY),
    urlEndpoint: `https://ik.imagekit.io/${String(process.env.IMGKIT_URLENDPOINT)}/`,
});
function uploadImg(file, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        const mimeType = file === null || file === void 0 ? void 0 : file.mimetype;
        if ((mimeType === null || mimeType === void 0 ? void 0 : mimeType.indexOf("image")) !== 0) {
            // res.
            return;
        }
        const buf = file === null || file === void 0 ? void 0 : file.buffer;
        imagekit.upload({
            file: buf,
            fileName: (0, uuid_1.v4)(),
            tags: [mimeType],
        }, (err, result) => __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log(result);
                // console.log(result.url);
                // console.log(
                //   imagekit.url({
                //     src: result.url,
                //     transformation: [
                //       {
                //         height: 300,
                //         width: 400,
                //       },
                //     ],
                //   })
                // );
                cb(result === null || result === void 0 ? void 0 : result.url, result === null || result === void 0 ? void 0 : result.fileId);
            }
            catch (err) { }
        }));
    });
}
exports.uploadImg = uploadImg;
